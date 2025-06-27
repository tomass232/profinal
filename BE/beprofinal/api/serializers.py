from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Usuario, Campanas, Participaciones, Recomendaciones, MensajeContacto, Comunidades

class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = '__all__'


class CampanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campanas
        fields = "__all__"

class ParticipacionesSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="usuario.username", read_only=True)
    email = serializers.EmailField(source="usuario.email", read_only=True)
    date_joined = serializers.DateTimeField(source="usuario.date_joined", read_only=True)
    user_id = serializers.IntegerField(source="usuario.id", read_only=True)
    nombre_campana = serializers.CharField(source="campana.titulo_campana",read_only=True)
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


class ComunidadSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Comunidades
        fields = "__all__"


comunidad = serializers.PrimaryKeyRelatedField(
    queryset=Comunidades.objects.all(), required=False
)



class CampanaSerializer(serializers.ModelSerializer):
    comunidad = serializers.PrimaryKeyRelatedField(
        queryset=Comunidades.objects.all(), allow_null=True
    )

    class Meta:
        model  = Campanas
        fields = "__all__"


