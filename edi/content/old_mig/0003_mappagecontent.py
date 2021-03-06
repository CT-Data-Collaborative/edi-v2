# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-08 15:54
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_mapspage_mapspagedata'),
    ]

    operations = [
        migrations.CreateModel(
            name='MapPageContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('sort_order', models.PositiveIntegerField(default=0)),
                ('content', markdownx.models.MarkdownxField()),
                ('page', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='content.MapsPage')),
            ],
            options={
                'ordering': ('sort_order',),
                'abstract': False,
            },
        ),
    ]
