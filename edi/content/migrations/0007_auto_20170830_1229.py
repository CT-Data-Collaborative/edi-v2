# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-30 12:29
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0006_auto_20170829_2006'),
    ]

    operations = [
        migrations.AddField(
            model_name='settings',
            name='at_risk_and_somewhat_ready_color',
            field=models.CharField(default='', help_text='Enter the hex color for representing At Risk/Somewhat Ready on the charts', max_length=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='settings',
            name='on_track_and_ready_color',
            field=models.CharField(default='', help_text='Enter the hex color for representing On Track/Ready on the charts', max_length=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='settings',
            name='vulnerable_and_not_ready_color',
            field=models.CharField(default='', help_text='Enter the hex color for representing Vulnerable/Not Ready on the charts', max_length=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='settings',
            name='vulnerable_map_colors',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=7), default=['','','','',''], help_text='Enter five hex colors with leading #', size=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='settings',
            name='map_colors',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=7), help_text='Enter five hex colors with leading #', size=5),
        ),
    ]