# Generated by Django 2.0.5 on 2018-05-15 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0002_remove_core_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='core',
            name='depth',
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
    ]
