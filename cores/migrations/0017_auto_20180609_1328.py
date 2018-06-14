# Generated by Django 2.0.5 on 2018-06-09 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0016_mscl'),
    ]

    operations = [
        migrations.AddField(
            model_name='mscl',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=2, default=11, max_digits=5, verbose_name='Corrected Depth'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='mscl',
            name='Den1',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=8, verbose_name='Wet Bulk Density (g/cm3'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='MS1',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=8, verbose_name='Magnetic Susceptibility (SI)'),
        ),
    ]
