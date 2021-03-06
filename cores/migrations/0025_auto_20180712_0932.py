# Generated by Django 2.0.5 on 2018-07-12 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0024_auto_20180629_0115'),
    ]

    operations = [
        migrations.AddField(
            model_name='grainsize',
            name='b_depth',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='Bottom Depth'),
        ),
        migrations.AlterField(
            model_name='grainsize',
            name='depth',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='Top Depth'),
        ),
    ]
