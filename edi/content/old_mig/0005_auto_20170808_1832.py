# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-08 18:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_ediimages'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ediimages',
            options={'ordering': ('sort_order',)},
        ),
        migrations.AddField(
            model_name='ediimages',
            name='sort_order',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
