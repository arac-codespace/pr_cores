# Generated by Django 2.0.5 on 2018-06-21 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0020_auto_20180620_1956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bag',
            name='depth',
            field=models.DecimalField(decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='bag',
            name='lat',
            field=models.DecimalField(decimal_places=8, max_digits=10, null=True, verbose_name='Latitude'),
        ),
        migrations.AlterField(
            model_name='bag',
            name='lng',
            field=models.DecimalField(decimal_places=8, max_digits=11, null=True, verbose_name='Longitude'),
        ),
        migrations.AlterField(
            model_name='boundaries',
            name='position',
            field=models.DecimalField(decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='core',
            name='depth',
            field=models.DecimalField(decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='core',
            name='lat',
            field=models.DecimalField(decimal_places=8, max_digits=10, null=True, verbose_name='Latitude'),
        ),
        migrations.AlterField(
            model_name='core',
            name='lng',
            field=models.DecimalField(decimal_places=8, max_digits=11, null=True, verbose_name='Longitude'),
        ),
        migrations.AlterField(
            model_name='core',
            name='total_length',
            field=models.DecimalField(decimal_places=3, max_digits=8, null=True, verbose_name='Total Length'),
        ),
    ]
