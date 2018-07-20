# Generated by Django 2.0.5 on 2018-06-20 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0019_bag_depth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mscl',
            name='den1',
            field=models.DecimalField(decimal_places=4, max_digits=8, null=True, verbose_name='Wet Bulk Density (g/cm3'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='depth',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True, verbose_name='Corrected Depth'),
        ),
        migrations.AlterField(
            model_name='mscl',
            name='ms1',
            field=models.DecimalField(decimal_places=4, max_digits=8, null=True, verbose_name='Magnetic Susceptibility (SI)'),
        ),
    ]