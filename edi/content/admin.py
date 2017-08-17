from django.contrib import admin
from django.contrib.contenttypes import admin as generic
from markdownx.admin import MarkdownxModelAdmin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from solo.admin import SingletonModelAdmin
from .models import HomePage, HomePageContent, HomePageFiles, \
    EDIImages, City, CityAction, CityContent, CityFiles, JSONData


# Set up for ensuring that Singleton Pages exists
try:
    home_page = HomePage.objects.get()
except Exception:
    home_page = HomePage().save()


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

class CityAdmin(MarkdownxModelAdmin):
    inlines = [CityContentAdmin, CityActionAdmin, CityDataAdmin]

admin.site.register(HomePage, HomePageAdmin)
admin.site.register(City, CityAdmin)
