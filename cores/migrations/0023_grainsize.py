# Generated by Django 2.0.5 on 2018-06-29 04:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0022_auto_20180620_2006'),
    ]

    operations = [
        migrations.CreateModel(
            name='GrainSize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field_no', models.CharField(max_length=25)),
                ('depth', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='True Depth')),
                ('grave_pct', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Gravel Percent')),
                ('clay_pct', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Clay Percent')),
                ('silt_pct', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Silt Percent')),
                ('sand_pct', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Sand Percent')),
                ('mean_grain_size', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True, verbose_name='Mean Grain Size')),
                ('core', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='cores.Core', verbose_name='Core No.')),
            ],
        ),
    ]