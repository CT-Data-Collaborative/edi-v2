import json
import base64

from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.core.urlresolvers import reverse
from .models import HomePage, City, Settings

URL_PLACEHOLDER = {'town_slug': '__placeholder__'}


def content_to_json(content_set):
    return json.dumps([{'order': c.sort_order, 'content': c.content} for c in content_set])

def build_links(about=False, map=False, analysis=False, town_slug=None):
    s = Settings.objects.get()
    links = []
    if town_slug:
        reverse_arg = {'town_slug': town_slug}
    else:
        reverse_arg = {'town_slug': '__placeholder__'}
    if about:
        links.append({'link': reverse('about', kwargs=reverse_arg),
                      'text': s.about_page_link_title,
                      'explainer': s.about_page_explainer})
    if map:
        links.append({'link': reverse('map', kwargs=reverse_arg),
                      'text': s.data_age_link_title,
                      'explainer': s.data_page_explainer})
    if analysis:
        links.append({'link': reverse('analysis', kwargs=reverse_arg),
                      'text': s.analysis_page_link_title,
                      'explainer': s.analysis_page_explainer})
    return links

def home_page(request):
    home_page_content = HomePage.objects.get()
    s = Settings.objects.get()
    data = City.objects.all()
    try:
        image = home_page_content.images.get()
    except ObjectDoesNotExist:
        image = None
    context = {
        'content': content_to_json(home_page_content.homepagecontent_set.all()),
        'links': build_links(about=True, map=True, analysis=True),
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
        'image': image,
        'breakpoints': city.breakpoints,
        'page_name': page_name,
        'city_name': city.name
    }
    return (city, context)


def about_page(request, town_slug):
    s = Settings.objects.get()
    try:
        city, context = city_context_helper(town_slug, 'About EDI')
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.citycontent_set.all())
    context['links'] = build_links(map=True, analysis=True, town_slug=town_slug)
    return render(request, 'content/about.html', context)


def encode_pdf(pdf_obj):
    lines = "".join([base64.b64encode(l).decode('utf-8', "ignore") for l in pdf_obj.readlines()])
    return lines


def analysis_page(request, town_slug):
    s = Settings.objects.get()
    try:
        city, context = city_context_helper(town_slug, 'EDI Data Analysis')
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.cityaction_set.all())
    context['pdf'] = encode_pdf(city.cityfiles_set.get().upload.file)
    context['pdf_file_path'] = city.cityfiles_set.get().upload.url
    context['links'] = build_links(about=True, map=True, town_slug=town_slug),
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
    s = Settings.objects.get()
    context['data'] = json.dumps(json_data)
    context['geojson'] = json.dumps(map_geojson)
    context['content'] = json.dumps(None)
    context['breakpoints'] = s.breakpoints
    context['domain_color_scale'] = s.map_colors
    context['vulnerable_color_scale'] = s.vulnerable_map_colors
    context['vul_color'] = s.vulnerable_and_not_ready_color
    context['atrisk_color'] = s.at_risk_and_somewhat_ready_color
    context['ontrack_color'] = s.on_track_and_ready_color
    context['links'] = build_links(about=True, analysis=True, town_slug=town_slug)
    return render(request, 'content/map.html', context)
