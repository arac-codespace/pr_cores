from rest_framework import serializers
from . import models


class StrataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Strata
        fields = (
            'id',
            'lithology',
            'thickness',
            'description',
            'fossils_set',
            'boundaries_set',
        )
        depth = 1


class CoreSerializer(serializers.ModelSerializer):
    strata_set = StrataSerializer(many=True)

    class Meta:
        model = models.Core
        fields = (
            'id',
            'sample_no',
            'survey',
            'core_type',
            'total_length',
            'depth',
            'core_condition',
            'described_by',
            'physiographic_location',
            'date_described',
            'strata_set'
        )
        depth = 1


class SurveySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Survey
        fields = (
            'id',
            'survey_no',
            'field_activity',
            'ship',
            'core_quant',
            'core_set',
            'bag_quant',
            'bag_set',
            'total_samples',
            'get_boundary'
        )
        depth = 1