from rest_framework.serializers import ModelSerializer
from .models import Campanas
from .models import Participaciones
from .models import Recomendaciones
class CampanaSerializer(ModelSerializer):
    class Meta:
        model = Campanas
        fields = "__all__"

class ParticipacionesSerializer(ModelSerializer):
    class Meta:
        model = Participaciones   
        fields = "__all__"     


class RecomendacionesSerializer(ModelSerializer):
    class Meta:
        model =  Recomendaciones
        fields = "__all__"             