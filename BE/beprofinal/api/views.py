from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response

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
            token_access = str(AccessToken.for_user(usuario))
            return Response({
                'message': 'Usuario logueado con éxito',
                'token': token_access,
                'idUsuario': usuario.id 
            }, status=200)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)


class PerfilUsuarioView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "id": request.user.id
        })


class CampanaCrearView(ListCreateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class ParticipacionesCrearView(ListCreateAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class RecomendacionesCrearView(ListCreateAPIView):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer
