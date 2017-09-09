# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-08 19:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0008_auto_20170908_1944'),
    ]

    operations = [
        migrations.AddField(
            model_name='settings',
            name='about_page_link_title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='settings',
            name='analysis_page_link_title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='settings',
            name='data_age_link_title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='settings',
            name='about_page_explainer',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='settings',
            name='analysis_page_explainer',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='settings',
            name='data_page_explainer',
            field=models.CharField(default='', max_length=255),
        ),
    ]