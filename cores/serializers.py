from rest_framework import serializers
from . import models


class CoreSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'sample_no',
            'survey',
            # 'field_activity',
            # 'ship',
            # 'core_no',
            # 'core_type',
            # 'total_length',
            # 'lat',
            # 'lng',
            # 'depth',
            # 'core_condition',
            # 'date_described',
            # 'described_by',
            # 'physiographic_location',

        )
        model = models.Core
