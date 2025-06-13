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
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


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

class IniciarSesionView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        usuario = authenticate(username=username, password=password)

        if usuario is not None:
            token_refresh = RefreshToken.for_user(usuario)
            token_access = str(token_refresh.access_token)
            return Response({
                'message': 'Usuario logueado con éxito',
                'token': token_access
            }, status=200)
        else:
            return Response({'error': 'Usuario inválido'}, status=400)


class CampanaCrearView(ListCreateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class ParticipacionesCrearView(ListCreateAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class RecomendacionesCrearView(ListCreateAPIView):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer    
