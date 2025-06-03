from django.shortcuts import render
from django.contrib.auth.models import User # para el usuario
from .serializers import CampanaSerializer # para crear la conexion con la estructura de datos
from .models import Campanas # para crear la conexion con campanas
from .serializers import ParticipacionesSerializer 
from .models import Participaciones 
from .serializers import RecomendacionesSerializer 
from .models import Recomendaciones
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
class CrearUsuarioView(APIView):
    def post(self,request):
        username = request.data.get("username")
        correo = request.data.get("email")
        clave = request.data.get("password")

        User.objects.create_user(
            username=username,
            email=correo,
            password=clave
        )

        return Response({"exito":"Usuario creado"},status=201)


class CampanaCrearView(ListCreateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class ParticipacionesCrearView(ListCreateAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class RecomendacionesCrearView(ListCreateAPIView):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer    
