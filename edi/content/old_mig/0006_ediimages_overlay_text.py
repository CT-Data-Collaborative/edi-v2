# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-09 00:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_auto_20170808_1832'),
    ]

    operations = [
        migrations.AddField(
            model_name='ediimages',
            name='overlay_text',
            field=models.CharField(default='Measuring Kindergarten Readiness', max_length=255),
            preserve_default=False,
        ),
    ]
