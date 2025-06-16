from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Campanas, Participaciones, Recomendaciones, Usuario
from .serializers import CampanaSerializer, ParticipacionesSerializer, RecomendacionesSerializer, UsuarioSerializer

class CrearUsuarioView(APIView):
    def post(self, request):
        username = request.data.get("username")
        correo = request.data.get("email")
        clave = request.data.get("password")

        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({"error": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)

        usuario_creado = User.objects.create_user(username=username, email=correo, password=clave)
        # Crear el perfil extendido en el modelo Usuario
        perfil = Usuario.objects.create(usuario=usuario_creado)
        return Response({
            "exito": "Usuario creado",
            "usuario": UsuarioSerializer(perfil).data
        }, status=status.HTTP_201_CREATED)

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
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)

class CampanaCrearView(ListCreateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class ParticipacionesCrearView(ListCreateAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class RecomendacionesCrearView(ListCreateAPIView):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer
