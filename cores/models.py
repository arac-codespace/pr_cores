from django.db import models


class Survey(models.Model):
    # SJ008, RC08...
    survey_no = models.CharField(max_length=25, verbose_name="Survey No.")
    field_activity = models.CharField(max_length=25, verbose_name="Field Activity", blank=True)
    ship = models.CharField(max_length=25, verbose_name="Ship/Platform", blank=True)

    def __str__(self):
        return self.survey_no

    class Meta:
        verbose_name = "Survey"
        verbose_name_plural = "Surveys"

    def core_quant(self):
        return self.core_set.count()

    def bag_quant(self):
        return self.bag_set.count()

    def total_samples(self):
        total_samples = self.core_quant() + self.bag_quant()

        return total_samples

    # To get survey boundary...
    def get_boundary(self):
        if self.core_set.all():
            survey_cores = self.core_set.all()
            cores_lat = []
            cores_lng = []
            for core in survey_cores:
                cores_lat.append(core.lat)
                cores_lng.append(core.lng)
            # Get max values...
            max_lat = max(cores_lat)
            min_lat = min(cores_lat)
            max_lng = max(cores_lng)
            min_lng = min(cores_lng)

            # Get NW and SE points...
            nw_point = {'lat': max_lat, 'lng': min_lng}
            ne_point = {'lat': max_lat, 'lng': max_lng}
            se_point = {'lat': min_lat, 'lng': max_lng}
            sw_point = {'lat': min_lat, 'lng': min_lng}

            boundaries = {'nw': nw_point, 'ne': ne_point, 'se': se_point, 'sw': sw_point}
            return boundaries
        else:
            return


class Sample(models.Model):
    sample_no = models.CharField(max_length=25, verbose_name="Sample No.")
    lat = models.DecimalField(max_digits=10, decimal_places=8, verbose_name="Latitude", blank=True, null=True)
    lng = models.DecimalField(max_digits=11, decimal_places=8, verbose_name="Longitude", blank=True, null=True)
    survey = models.ForeignKey(Survey, null=True, on_delete=models.SET_NULL, verbose_name="Survey No.")
    date_coll = models.DateField(verbose_name="Date Collected", blank=True, null=True)
    collected_by = models.CharField(max_length=25, verbose_name="Collected By", blank=True)

    class Meta:
        abstract = True


class Core(Sample):
    core_type = models.CharField(max_length=25, verbose_name="Core Type", blank=True)
    total_length = models.DecimalField(max_digits=8, decimal_places=3, verbose_name="Total Length", blank=True, null=True)
    depth = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True)
    core_condition = models.CharField(max_length=25, verbose_name="Core Condition", blank=True)
    described_by = models.CharField(max_length=25, verbose_name="Described By", blank=True)
    physiographic_location = models.CharField(max_length=25, verbose_name="Location", blank=True)
    date_described = models.DateField(verbose_name="Date Described", blank=True, null=True)
    # description = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.sample_no

    class Meta:
        verbose_name = "Core"
        verbose_name_plural = "Cores"


class Lithology(models.Model):
    name = models.CharField(max_length=25, verbose_name="Lithology Name")
    alt_name = models.CharField(max_length=25, blank=True, verbose_name="Alternate Name")

    class Meta:
        verbose_name = "Lithology"
        verbose_name_plural = "Lithologies"

    def __str__(self):
        return self.name


class Strata(models.Model):
    # lithology = models.CharField(max_length=25)
    core = models.ForeignKey(Core, blank=True, on_delete=models.CASCADE, verbose_name="Core No.")
    thickness = models.DecimalField(max_digits=8, decimal_places=3)
    description = models.TextField(blank=True)
    lithology = models.ForeignKey(Lithology, blank=True, null=True, on_delete=models.SET_NULL)
    # fossils
    # lithology
    # unconformities

    class Meta:
        verbose_name = "Stratum"
        verbose_name_plural = "Strata"
    
    def __str__(self):
        return self.lithology.name        

class Fossils(models.Model):
    name = models.CharField(max_length=25)
    alt_name = models.CharField(max_length=25, blank=True)
    abundance = models.CharField(max_length=25, blank=True)
    # comments = models.TextField()
    strata = models.ForeignKey(Strata, blank=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Fossil"
        verbose_name_plural = "Fossils"

    def __str__(self):
        return self.name


class Boundaries(models.Model):
    ANGULAR = 'ANG'
    DIFFUSE = 'DIF'
    DISTINCT = 'DIS'
    IRREGULAR = 'IRR'
    BOUNDARY_CHOICES = (
        (ANGULAR, 'Angular'),
        (DIFFUSE, 'Diffuse'),
        (DISTINCT, 'Distinct'),
        (IRREGULAR, 'Irregular'),
    )
    boundary_type = models.CharField(
        max_length=3,
        choices=BOUNDARY_CHOICES,
        default=DISTINCT,
        verbose_name="Boundary Type"
    )
    position = models.DecimalField(max_digits=8, decimal_places=3, blank=True)
    strata = models.ForeignKey(Strata, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.get_boundary_type_display()


class Bag(Sample):
    description = models.TextField(blank=True)

    def __str__(self):
        return self.sample_no
