from django.db import models


class Core(models.Model):
    field_activity = models.CharField(max_length=200)
    ship = models.CharField(max_length=200)
    core_no = models.CharField(max_length=200)
    core_type = models.CharField(max_length=200)
    total_length = models.DecimalField(max_digits=8, decimal_places=3)
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lng = models.DecimalField(max_digits=11, decimal_places=8)
    depth = models.DecimalField(max_digits=8, decimal_places=3)
    core_condition = models.CharField(max_length=200)
    date_described = models.DateField()
    described_by = models.CharField(max_length=200)
    physiographic_location = models.CharField(max_length=200)
    # description = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.core_no
