from django.db import models


class Survey(models.Model):
    # SJ008, RC08...
    survey_no = models.CharField(max_length=25)
    field_activity = models.CharField(max_length=25)
    ship = models.CharField(max_length=25)


class Sample(models.Model):
    sample_no = models.CharField(max_length=25)
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lng = models.DecimalField(max_digits=11, decimal_places=8)
    survey = models.ForeignKey(Survey, null=True, on_delete=models.SET_NULL)
    date_coll = models.DateField()
    collected_by = models.CharField(max_length=25, null=True)

    class Meta:
        abstract = True


class Core(Sample):
    core_type = models.CharField(max_length=25)
    total_length = models.DecimalField(max_digits=8, decimal_places=3)
    depth = models.DecimalField(max_digits=8, decimal_places=3)
    core_condition = models.CharField(max_length=25)
    described_by = models.CharField(max_length=25)
    physiographic_location = models.CharField(max_length=25)
    date_described = models.DateField()
    # description = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.sample_no


class Strata(models.Model):
    core = models.ForeignKey(Core, blank=True, on_delete=models.CASCADE)
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
