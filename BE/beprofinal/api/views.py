from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, UpdateAPIView,ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Campanas, Participaciones, Recomendaciones, Usuario, MensajeContacto
from .serializers import CampanaSerializer, ParticipacionesSerializer, RecomendacionesSerializer, UsuarioSerializer, MensajeContactoSerializer


class CrearUsuarioView(APIView):
    def post(self, request):
        username = request.data.get("username")
        correo = request.data.get("email")
        clave = request.data.get("password")

        # verifica si el usuario ya existe
        if User.objects.filter(username=username).exists():
            return Response({"error": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)

        usuario_creado = User.objects.create_user(username=username, email=correo, password=clave)
        # crea el perfil extendido en el modelo Usuario
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

class ContactoAPIView(APIView):
    def get(self, request):
        mensajes = MensajeContacto.objects.all().order_by('-fecha')
        serializer = MensajeContactoSerializer(mensajes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MensajeContactoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Mensaje enviado con éxito"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CampanaCrearView(ListCreateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class CampanaDeleteView(DestroyAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer
    lookup_field = 'id'

class CampanaUpdateView(UpdateAPIView):
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer
    lookup_field = 'id'

class ParticipacionesCrearView(ListCreateAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class RecomendacionesCrearView(ListCreateAPIView):
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer

class MostrarUsuariosView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class MostrarParticipacionesView(ListAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer
    

