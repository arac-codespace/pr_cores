from rest_framework import serializers
from . import models


class SimpleBagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bag
        fields = (
            'id',
            'sample_no',
            'lat',
            'lng',
            # 'total_length',
        )
        depth = 1


class SimpleCoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Core
        fields = (
            'id',
            'sample_no',
            'lat',
            'lng',
            # 'survey',
            # 'core_type',
            'total_length',
            # 'depth',
            # 'core_condition',
            # 'described_by',
            # 'physiographic_location',
            # 'date_described',
            # 'date_coll',
            # 'collected_by',
            # 'strata_set',
            # 'mscl_set'
        )
        depth = 1


# /api/surveys
class SurveysSerializer(serializers.ModelSerializer):
    core_set = SimpleCoreSerializer(many=True)
    bag_set = SimpleBagSerializer(many=True)

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


class StrataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Strata
        fields = (
            'id',
            'lithology',
            'lower_bound',
            'upper_bound',
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
            'lat',
            'lng',
            'survey',
            'core_type',
            'total_length',
            'depth',
            'core_condition',
            'described_by',
            'physiographic_location',
            'date_described',
            'date_coll',
            'collected_by',
            'strata_set',
            'mscl_set',
            'grainsize_set'
        )
        depth = 1


# /api/surveys/:id
class SurveySerializer(serializers.ModelSerializer):
    core_set = CoreSerializer(many=True)

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
