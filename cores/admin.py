from django.contrib import admin
from nested_admin import NestedModelAdmin, NestedStackedInline, NestedTabularInline

from .models import Core, Strata, Survey, Fossils, Bag, Lithology, Boundaries, MSCL


class FossilInline(NestedTabularInline):
    model = Fossils
    extra = 0

class BoundariesInline(NestedTabularInline):
    model = Boundaries
    extra = 0

class StrataInline(NestedStackedInline):
    model = Strata
    extra = 0
    inlines = [FossilInline, BoundariesInline]
    # fields = ["thickness"]


class CoreAdmin(NestedModelAdmin):
    inlines = [
        StrataInline
    ]


admin.site.register(Core, CoreAdmin)
admin.site.register(Survey)
admin.site.register(Bag)
admin.site.register(Strata)
admin.site.register(MSCL)
admin.site.register(Lithology)
admin.site.register(Boundaries)