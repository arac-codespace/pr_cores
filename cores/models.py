from django.db import models


class Survey(models.Model):
    # SJ008, RC08...
    survey_no = models.CharField(max_length=25, verbose_name="Survey No.")
    field_activity = models.CharField(max_length=25, verbose_name="Field Activity")
    ship = models.CharField(max_length=25, verbose_name="Ship/Platform")

    def __str__(self):
        return self.survey_no


class Sample(models.Model):
    sample_no = models.CharField(max_length=25, verbose_name="Sample No.")
    lat = models.DecimalField(max_digits=10, decimal_places=8, verbose_name="Latitude")
    lng = models.DecimalField(max_digits=11, decimal_places=8, verbose_name="Longitude")
    survey = models.ForeignKey(Survey, null=True, on_delete=models.SET_NULL, verbose_name="Survey No.")
    date_coll = models.DateField(verbose_name="Date Collected")
    collected_by = models.CharField(max_length=25, null=True, verbose_name="Collected By")

    class Meta:
        abstract = True


class Core(Sample):
    core_type = models.CharField(max_length=25, verbose_name="Core Type")
    total_length = models.DecimalField(max_digits=8, decimal_places=3, verbose_name="Total Length")
    depth = models.DecimalField(max_digits=8, decimal_places=3)
    core_condition = models.CharField(max_length=25, verbose_name="Core Condition")
    described_by = models.CharField(max_length=25, verbose_name="Described By")
    physiographic_location = models.CharField(max_length=25, verbose_name="Location")
    date_described = models.DateField(verbose_name="Date Described")
    # description = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.sample_no


class Strata(models.Model):
    core = models.ForeignKey(Core, blank=True, on_delete=models.CASCADE, verbose_name="Core No.")
    thickness = models.DecimalField(max_digits=8, decimal_places=3)
    description = models.TextField()
    # fossils
    # lithology
    # unconformities

class Fossils(models.Model):
    name = models.CharField(max_length=25)
    alt_name = models.CharField(max_length=25)
    abundance = models.CharField(max_length=25)
    comments = models.TextField()
    strata = models.ForeignKey(Strata, blank=True, on_delete=models.CASCADE)


class Bag(Sample):
    description = models.TextField()
