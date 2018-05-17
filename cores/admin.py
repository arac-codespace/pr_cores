from django.contrib import admin

from .models import Core, Strata, Survey


class StrataInline(admin.StackedInline):
    model = Strata
    extra = 0
    # fields = ["thickness"]

class CoreAdmin(admin.ModelAdmin):
    inlines = [
        StrataInline,
    ]

admin.site.register(Core, CoreAdmin)
admin.site.register(Strata)
admin.site.register(Survey)