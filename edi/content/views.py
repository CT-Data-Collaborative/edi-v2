import json
import base64

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.core.urlresolvers import reverse
from .models import HomePage, City, Settings #AboutPage, AnalysisPage, MapsPage,


URL_PLACEHOLDER = {'town_slug': '__placeholder__'}

def content_to_json(content_set):
    return json.dumps([{'order': c.sort_order, 'content': c.content} for c in content_set])

def home_page(request):
    home_page_content = HomePage.objects.get()
    data = City.objects.all()
    try:
        image = home_page_content.images.get()
    except ObjectDoesNotExist:
        image = None
    context = {
        'content': content_to_json(home_page_content.homepagecontent_set.all()),
        'links': [
            {'link': reverse('about', kwargs=URL_PLACEHOLDER), 'text': 'About EDI'},
            {'link': reverse('map', kwargs=URL_PLACEHOLDER), 'text': 'EDI Maps & Charts'},
            {'link': reverse('analysis', kwargs=URL_PLACEHOLDER), 'text': 'EDI Data Analysis'}
        ],
        'image': image,
        'choices': json.dumps([{'name': d.name, 'slug': d.slugged_name} for d in data])
    }
    return render(request, 'content/home.html', context)

def city_context_helper(town_slug, page_name):
    try:
        city = City.objects.get(slugged_name=town_slug)
    except City.DoesNotExist:
        raise Http404('City does not exist')
    try:
        image = city.images.get()
    except ObjectDoesNotExist:
        image = None
    context = {
        'links': [],
        'image': image,
        'breakpoints': city.breakpoints,
        'page_name': page_name,
        'city_name': city.name
    }
    return (city, context)

def about_page(request, town_slug):
    try:
        city, context = city_context_helper(town_slug, 'About EDI')
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.citycontent_set.all())
    context['links'] = [
            {'link': reverse('map', kwargs={'town_slug': town_slug}), 'text': 'EDI Maps & Charts'},
            {'link': reverse('analysis', kwargs={'town_slug': town_slug}), 'text': 'EDI Data Analysis'}
        ]
    return render(request, 'content/about.html', context)

def encode_pdf(pdf_obj):
    lines = "".join([base64.b64encode(l).decode('utf-8', "ignore") for l in pdf_obj.readlines()])
    return lines

def analysis_page(request, town_slug):
    try:
        city, context = city_context_helper(town_slug, 'EDI Data Analysis')
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.cityaction_set.all())
    context['pdf'] = encode_pdf(city.cityfiles_set.get().upload.file)
    context['pdf_file_path'] = city.cityfiles_set.get().upload.url
    context['links'] = [
            {'link': reverse('about', kwargs={'town_slug': town_slug}), 'text': 'About EDI'},
            {'link': reverse('map', kwargs={'town_slug': town_slug}), 'text': 'EDI Maps & Charts'},
        ]
    return render(request, 'content/analysis.html', context)


def map_page(request, town_slug):
    """View for viewing town specific EDI Data

    Will need to modify to execute a query for pulling out the correct JSON data object from the MapPage
    """
    try:
        city, context = city_context_helper(town_slug, 'EDI Data & Maps')
    except Http404 as e:
        raise e

    # This is a lousy antipattern. Would be better to break model form into two inlines.
    json_data = city.jsondata_set.get(description='EDI').data
    map_geojson = city.jsondata_set.get(description='Census').data
    settings = Settings.objects.get()
    context['data'] = json.dumps(json_data)
    context['geojson'] = json.dumps(map_geojson)
    context['content'] = json.dumps(None)
    context['breakpoints'] = settings.breakpoints
    context['domain_color_scale'] = settings.map_colors
    context['vulnerable_color_scale'] = settings.vulnerable_map_colors
    context['vul_color'] = settings.vulnerable_and_not_ready_color
    context['atrisk_color'] = settings.at_risk_and_somewhat_ready_color
    context['ontrack_color'] = settings.on_track_and_ready_color
    context['links'] = [
            {'link': reverse('about', kwargs={'town_slug': town_slug}), 'text': 'About EDI'},
            {'link': reverse('analysis', kwargs={'town_slug': town_slug}), 'text': 'EDI Data Analysis'}
        ]
    return render(request, 'content/map.html', context)

