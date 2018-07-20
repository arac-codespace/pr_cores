# Generated by Django 2.0.5 on 2018-06-21 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0021_auto_20180620_2001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bag',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='bag',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=10, null=True, verbose_name='Latitude'),
        ),
        migrations.AlterField(
            model_name='bag',
            name='lng',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=11, null=True, verbose_name='Longitude'),
        ),
        migrations.AlterField(
            model_name='boundaries',
            name='position',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='core',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='core',
            name='lat',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=10, null=True, verbose_name='Latitude'),
        ),
        migrations.AlterField(
            model_name='core',
            name='lng',
            field=models.DecimalField(blank=True, decimal_places=8, max_digits=11, null=True, verbose_name='Longitude'),
        ),
        migrations.AlterField(
            model_name='core',
            name='total_length',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True, verbose_name='Total Length'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='den1',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=8, null=True, verbose_name='Wet Bulk Density (g/cm3'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='Corrected Depth'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='ms1',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=8, null=True, verbose_name='Magnetic Susceptibility (SI)'),
        ),
    ]