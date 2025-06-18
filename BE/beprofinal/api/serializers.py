from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario, Campanas, Participaciones, Recomendaciones

class CampanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campanas
        fields = "__all__"

class ParticipacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participaciones
        fields = "__all__"

class RecomendacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recomendaciones
        fields = "__all__"

class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="usuario.username", read_only=True)
    email = serializers.EmailField(source="usuario.email", read_only=True)
    date_joined = serializers.DateTimeField(source="usuario.date_joined", read_only=True)
    user_id = serializers.IntegerField(source="usuario.id", read_only=True)
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'date_joined', 'user_id',"usuario"]
