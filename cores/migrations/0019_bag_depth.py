# Generated by Django 2.0.5 on 2018-06-20 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0018_auto_20180609_1334'),
    ]

    operations = [
        migrations.AddField(
            model_name='bag',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True),
        ),
    ]
