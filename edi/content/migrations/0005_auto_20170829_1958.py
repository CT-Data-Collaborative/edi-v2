# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-29 19:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_settingspage'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SettingsPage',
            new_name='Settings',
        ),
    ]
