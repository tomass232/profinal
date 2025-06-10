from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Usuario
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

class UsuarioSerializers(ModelSerializer):
  username= serializers.CharField(source=".user.username", read_only=True)  
  email= serializers.EmailField(source=".user.email", read_only=True) 
  date_joined= serializers.DateTimeField(source=".user.date_joined", read_only=True) 
  user_id= serializers.IntegerField(source=".user.id", read_only=True) 

  class Meta: 
      model = Usuario
      field = ['id','username','email','date_joined', 'user_id']