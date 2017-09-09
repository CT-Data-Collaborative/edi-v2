from django.utils.text import slugify
from django.db import models
from django.contrib.postgres.fields import JSONField, ArrayField
from django.contrib.contenttypes.fields import GenericRelation, GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from markdownx.models import MarkdownxField
from solo.models import SingletonModel


class EDIImages(models.Model):
    image_name = models.CharField(max_length=255)
    overlay_text = models.CharField(max_length=255)
    image = models.ImageField()
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return self.image_name

    class Meta:
        ordering = ('sort_order',)

########################################################################################################
########
######## Abstract Models for Holding Markdown Content and Files
########
########################################################################################################

class SingletonPageContent(models.Model):
    description = models.CharField(max_length=255)
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)
    content = MarkdownxField()

    class Meta:
        ordering = ('sort_order',)
        abstract = True


class SingletonFiles(models.Model):
    description = models.CharField(max_length=255)
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)
    upload = models.FileField()

    class Meta:
        ordering = ('sort_order',)
        abstract = True


class SingletonJSONData(models.Model):
    description = models.CharField(max_length=255)
    sort_order = models.PositiveIntegerField(default=0, blank=False, null=False)
    data = JSONField()

    class Meta:
        ordering = ('sort_order',)
        abstract = True

########################################################################################################
########
######## Home Page and Subcontent Models
########
########################################################################################################

class Settings(SingletonModel):
    breakpoints = ArrayField(models.IntegerField(), size=5)
    map_colors = ArrayField(models.CharField(max_length=7), size=5, help_text='Enter five hex colors with leading #')
    vulnerable_map_colors = ArrayField(models.CharField(max_length=7), size=5, help_text='Enter five hex colors with leading #')
    vulnerable_and_not_ready_color = models.CharField(max_length=7, help_text='Enter the hex color for representing Vulnerable/Not Ready on the charts')
    at_risk_and_somewhat_ready_color = models.CharField(max_length=7, help_text='Enter the hex color for representing At Risk/Somewhat Ready on the charts')
    on_track_and_ready_color = models.CharField(max_length=7, help_text='Enter the hex color for representing On Track/Ready on the charts')
    data_age_link_title = models.CharField(max_length=255, default='')
    data_page_explainer = models.CharField(max_length=255, default='')
    about_page_link_title = models.CharField(max_length=255, default='')
    about_page_explainer = models.CharField(max_length=255, default='')
    analysis_page_link_title = models.CharField(max_length=255, default='')
    analysis_page_explainer = models.CharField(max_length=255, default='')

    def __str__(self):
        return 'Application Settings'

    class Meta:
        verbose_name = 'Settings'
        verbose_name_plural = 'Settings'

########################################################################################################
########
######## Home Page and Subcontent Models
########
########################################################################################################


class HomePageFiles(SingletonFiles):
    page = models.ForeignKey('HomePage', on_delete=models.CASCADE, null=True, blank=True)


class HomePageContent(SingletonPageContent):
    page = models.ForeignKey('HomePage', on_delete=models.CASCADE, null=True, blank=True)


class HomePage(SingletonModel):
    images = GenericRelation(EDIImages)

    def __str__(self):
        return "Home Page"



########################################################################################################
########
######## City Models and Subcontent Models
########
########################################################################################################

class CityContent(SingletonPageContent):
    page = models.ForeignKey('City', on_delete=models.CASCADE, null=True, blank=True)


class CityAction(SingletonPageContent):
    page = models.ForeignKey('City', on_delete=models.CASCADE, null=True, blank=True)


class CityFiles(SingletonFiles):
    page = models.ForeignKey('City', on_delete=models.CASCADE, null=True, blank=True)


class JSONData(SingletonJSONData):
    page = models.ForeignKey('City', on_delete=models.CASCADE, null=True, blank=True)


class City(models.Model):
    name = models.CharField(max_length=255)
    slugged_name = models.SlugField(blank=True)
    images = GenericRelation(EDIImages)
    breakpoints = ArrayField(models.IntegerField(), size=5)

    def save(self, *args, **kwargs):
        self.slugged_name = slugify(self.name)
        super(City, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'
