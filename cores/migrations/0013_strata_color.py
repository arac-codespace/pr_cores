# Generated by Django 2.0.5 on 2018-06-05 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0012_auto_20180519_1244'),
    ]

    operations = [
        migrations.AddField(
            model_name='strata',
            name='color',
            field=models.CharField(blank=True, max_length=25),
        ),
    ]
