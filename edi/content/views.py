from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.core.urlresolvers import reverse
from .models import HomePage, City #AboutPage, AnalysisPage, MapsPage,
import json

URL_PLACEHOLDER = {'town_slug': '__placeholder__'}

def content_to_json(content_set):
    return json.dumps([{'order': c.sort_order, 'content': c.content} for c in content_set])

# TODO Fix the reverse, which now needs an argument to be generated
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
            {'link': reverse('map', kwargs=URL_PLACEHOLDER), 'text': 'EDI Data & Maps'},
            {'link': reverse('analysis', kwargs=URL_PLACEHOLDER), 'text': 'EDI Data Analysis'}
        ],
        'image': image,
        'choices': json.dumps([{'name': d.name, 'slug': d.slugged_name} for d in data])
    }
    return render(request, 'content/home.html', context)

def city_context_helper(town_slug):
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
        'image': image
    }
    return (city, context)

def about_page(request, town_slug):
    try:
        city, context = city_context_helper(town_slug)
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.citycontent_set.all())
    return render(request, 'content/about.html', context)


def analysis_page(request, town_slug):
    try:
        city, context = city_context_helper(town_slug)
    except Http404 as e:
        raise e
    context['content'] = content_to_json(city.cityaction_set.all())
    return render(request, 'content/analysis.html', context)


def map_page(request, town_slug):
    """View for viewing town specific EDI Data

    Will need to modify to execute a query for pulling out the correct JSON data object from the MapPage
    """
    try:
        city, context = city_context_helper(town_slug)
    except Http404 as e:
        raise e
    json_data = city.jsondata_set.get().data
    context['data'] = json.dumps(json_data)
    return render(request, 'content/map.html', context)
