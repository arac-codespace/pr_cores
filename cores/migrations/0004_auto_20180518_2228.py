# Generated by Django 2.0.5 on 2018-05-19 02:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cores', '0003_auto_20180518_2205'),
    ]

    operations = [
        migrations.CreateModel(
            name='Boundaries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
            ],
        ),
        migrations.AlterModelOptions(
            name='fossils',
            options={'verbose_name': 'Fossil', 'verbose_name_plural': 'Fossils'},
        ),
        migrations.AlterModelOptions(
            name='lithology',
            options={'verbose_name': 'Lithology', 'verbose_name_plural': 'Lithologies'},
        ),
        migrations.AlterField(
            model_name='lithology',
            name='alt_name',
            field=models.CharField(blank=True, max_length=25, verbose_name='Alternate Name'),
        ),
        migrations.AlterField(
            model_name='lithology',
            name='name',
            field=models.CharField(max_length=25, verbose_name='Lithology Name'),
        ),
        migrations.AddField(
            model_name='strata',
            name='boundaries',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='cores.Boundaries'),
        ),
    ]
