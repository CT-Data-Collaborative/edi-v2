from django.contrib import admin
from django.contrib.contenttypes import admin as generic
from markdownx.admin import MarkdownxModelAdmin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from solo.admin import SingletonModelAdmin
from .models import HomePage, HomePageContent, HomePageFiles, \
        EDIImages, City, CityAction, CityContent, CityFiles, JSONData, Settings


# Set up for ensuring that Singleton Pages exists
try:
    home_page = HomePage.objects.get()
except Exception:
    home_page = HomePage().save()
try:
    settings = Settings.objects.get()
except Exception:
    settings = Settings()
    settings.breakpoints = [35,25,15,10,5]
    settings.map_colors = ['#045a8d','#2b8cbe','#74a9cf','#bdc9e1','#f1eef6']
    settings.vulnerable_map_colors = ['#B30000','#E34A33','#FC8D59','#FDCC8A','#FEF0D9']
    settings.vulnerable_and_not_ready_color = '#D7191C'
    settings.at_risk_and_somewhat_ready_color = '#FFFFBF'
    settings.on_track_and_ready_color = '#1A9641'
    settings.save()

class ImagesAdmin(generic.GenericTabularInline):
    model = EDIImages
    extra = 0

class HomePageFileAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = HomePageFiles
    extra = 0

class HomePageContentAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = HomePageContent
    extra = 0

class HomePageAdmin(MarkdownxModelAdmin, SingletonModelAdmin):
    inlines = [HomePageContentAdmin, HomePageFileAdmin, ImagesAdmin]


class CityDataAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = JSONData
    extra = 0

class CityGeoJSONAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = JSONData
    extra = 0

class CityContentAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = CityContent
    extra = 0

class CityActionAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = CityAction
    extra = 0

class CityFilesAdmin(SortableInlineAdminMixin, admin.StackedInline):
    model = CityFiles
    extra = 0

class CityAdmin(MarkdownxModelAdmin):
    inlines = [CityContentAdmin, CityActionAdmin, CityFilesAdmin, CityDataAdmin]

admin.site.register(HomePage, HomePageAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Settings)
