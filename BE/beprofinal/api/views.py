from rest_framework import generics, permissions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Comunidades
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, UpdateAPIView, ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission, SAFE_METHODS
<<<<<<< HEAD
from .models import Comunidades, Campanas
from rest_framework.decorators import api_view, permission_classes
from .models import Campanas, Participaciones, Recomendaciones, Usuario, MensajeContacto, Comunidades
=======
from .models import Campanas, Participaciones, Recomendaciones, Usuario, MensajeContacto
>>>>>>> e65c948e4b51e29eaec5f49cde3627bda42a16cc
from .serializers import (
    CampanaSerializer,
    ParticipacionesSerializer,
    RecomendacionesSerializer,
    UsuarioSerializer,
    MensajeContactoSerializer,
    ComunidadSerializer
)

<<<<<<< HEAD

class ComunidadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comunidades.objects.all().order_by("nombre") 
    serializer_class = ComunidadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ComunidadRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comunidades.objects.all() 
    serializer_class = ComunidadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]




=======
#  Permisos personalizados
>>>>>>> e65c948e4b51e29eaec5f49cde3627bda42a16cc
class PermisoAcceso(BasePermission):
    def has_permission(self, request, view):
        usuario = request.user
        if not usuario.is_authenticated:
            return False

        grupos_permisos = usuario.groups.values_list('name', flat=True)
        metodo = request.method

        if 'staff' in grupos_permisos:
            return metodo in SAFE_METHODS or metodo in ["POST", "PUT", "PATCH", "DELETE"]
        if 'usuarios' in grupos_permisos:
            return metodo in SAFE_METHODS
        if 'admin' in grupos_permisos:
            return True
        return False

#  Registro de usuario
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


class CrearParticipacionView(APIView):
    def post(self, request):
        try:
            usuario_id = request.data.get("usuario")
            campana_id = request.data.get("campana")
            fecha = request.data.get("fecha_inscripcion")
            calificacion = request.data.get("calificacion")

            # evita duplicados
            if Participaciones.objects.filter(usuario_id=usuario_id, campana_id=campana_id).exists():
                return Response({"mensaje": "Ya estás inscrito en esta campaña"}, status=200)

            # crea la participación
            Participaciones.objects.create(
                usuario_id=usuario_id,
                campana_id=campana_id,
                fecha_inscripcion=fecha,
                calificacion=calificacion
            )

            return Response({"mensaje": "Inscripción guardada con éxito"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

#  Perfil del usuario (ver y actualizar)
class PerfilUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        datos_perfil = {
            "correo": user.email,
            "nombre": user.username,
            "campañas": [
                {
                    "nombre": p.campana.titulo_campana,
                    "fecha": p.campana.fecha_campana
                }
                for p in Participaciones.objects.filter(usuario=user)
            ]
        }
        return Response(datos_perfil)

    def put(self, request):
        user = request.user
        nuevo_nombre = request.data.get("nombre")
        if nuevo_nombre:
            user.username = nuevo_nombre
            user.save()
            return Response({
                "nombre": user.username,
                "correo": user.email
            })
        return Response({"error": "Nombre no proporcionado"}, status=400)


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
    # permission_classes = [PermisoAcceso]
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer

class CampanaDeleteView(DestroyAPIView):
    # permission_classes = [PermisoAcceso]
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer
    lookup_field = 'id'

class CampanaUpdateView(UpdateAPIView):
    # permission_classes = [PermisoAcceso]
    queryset = Campanas.objects.all()
    serializer_class = CampanaSerializer
    lookup_field = 'id'

#  Participaciones
class ParticipacionesCrearView(ListCreateAPIView):
    # permission_classes = [PermisoAcceso]
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class MostrarParticipacionesView(ListAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer

class ParticipacionesDeleteView(DestroyAPIView):
    queryset = Participaciones.objects.all()
    serializer_class = ParticipacionesSerializer
    lookup_field = 'id'

<<<<<<< HEAD
class ComunidadListCreateAPIView(generics.ListCreateAPIView):
    queryset           = Comunidades.objects.all().order_by("nombre")
    serializer_class   = ComunidadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ComunidadRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset           = Comunidades.objects.all()
    serializer_class   = ComunidadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
=======
# ⭐ Recomendaciones
class RecomendacionesCrearView(ListCreateAPIView):
    # permission_classes = [PermisoAcceso]          
    queryset = Recomendaciones.objects.all()
    serializer_class = RecomendacionesSerializer

# 👥 Usuarios
class MostrarUsuariosView(ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDeleteView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    lookup_field = 'id'
>>>>>>> e65c948e4b51e29eaec5f49cde3627bda42a16cc
