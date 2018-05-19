# Generated by Django 2.0.5 on 2018-05-17 19:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sample_no', models.CharField(max_length=25)),
                ('lat', models.DecimalField(decimal_places=8, max_digits=10)),
                ('lng', models.DecimalField(decimal_places=8, max_digits=11)),
                ('date_coll', models.DateField()),
                ('collected_by', models.CharField(max_length=25)),
                ('description', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Core',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sample_no', models.CharField(max_length=25)),
                ('lat', models.DecimalField(decimal_places=8, max_digits=10)),
                ('lng', models.DecimalField(decimal_places=8, max_digits=11)),
                ('date_coll', models.DateField()),
                ('collected_by', models.CharField(max_length=25)),
                ('core_type', models.CharField(max_length=25)),
                ('total_length', models.DecimalField(decimal_places=3, max_digits=8)),
                ('depth', models.DecimalField(decimal_places=3, max_digits=8)),
                ('core_condition', models.CharField(max_length=25)),
                ('described_by', models.CharField(max_length=25)),
                ('physiographic_location', models.CharField(max_length=25)),
                ('date_described', models.DateField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Fossils',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('alt_name', models.CharField(max_length=25)),
                ('abundance', models.CharField(max_length=25)),
                ('comments', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Strata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('thickness', models.DecimalField(decimal_places=3, max_digits=8)),
                ('description', models.TextField()),
                ('core', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='cores.Core')),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('survey_no', models.CharField(max_length=25)),
                ('field_activity', models.CharField(max_length=25)),
                ('ship', models.CharField(max_length=25)),
            ],
        ),
        migrations.AddField(
            model_name='fossils',
            name='strata',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='cores.Strata'),
        ),
        migrations.AddField(
            model_name='core',
            name='survey',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='cores.Survey'),
        ),
        migrations.AddField(
            model_name='bag',
            name='survey',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='cores.Survey'),
        ),
    ]