from django.urls import path
from .views import (
    CrearUsuarioView,
    CampanaCrearView,
    ParticipacionesCrearView,
    RecomendacionesCrearView,
    IniciarSesionView,
    CampanaDeleteView,
    CampanaUpdateView,
    MostrarUsuariosView,
   MostrarParticipacionesView,
    UsuarioDeleteView,
    ComunidadListCreateAPIView,
    ComunidadRetrieveUpdateDestroyAPIView,
    ParticipacionesDeleteView,
    PerfilUsuarioView,
    CrearParticipacionView
)

urlpatterns  = [
    path("crear_usuario/", CrearUsuarioView.as_view(), name="crear_usuario"),
    path("crear_campana/", CampanaCrearView.as_view(), name="crear_campana"),
    path("crear_participaciones/", ParticipacionesCrearView.as_view(), name="crear_participaciones"),
    path("crear_recomendaciones/", RecomendacionesCrearView.as_view(), name="crear_recomendaciones"),
    path('login/', IniciarSesionView.as_view(), name="iniciar_sesion"),
    path('eliminar_campana/<int:id>/', CampanaDeleteView.as_view(), name='eliminar_campana'),
    path('actualizar_campana/<int:id>/', CampanaUpdateView.as_view(), name='actualizar_campana'),
    path('mostrar_usuarios/',MostrarUsuariosView.as_view()),
    path('mostrar_participaciones/',MostrarParticipacionesView.as_view()),
    path('mostrar_participaciones/',MostrarParticipacionesView.as_view()),
    path('eliminar_usuario/<int:id>/', UsuarioDeleteView.as_view (), name='eliminar_usuario'),
    path('eliminar_participaciones/<int:id>/', ParticipacionesDeleteView.as_view(), name='eliminar_participaciones'),
    path("comunidades/", ComunidadListCreateAPIView.as_view(),
         name="comunidad-list-create"),
    path("comunidades/<int:pk>/", ComunidadRetrieveUpdateDestroyAPIView.as_view(),
         name="comunidad-detail"),
    # path('perfil/', PerfilUsuarioView.as_view(), name="perfil"),
    path("crear_participaciones/", CrearParticipacionView.as_view(), name="crear_participaciones"),
    path("perfil/", PerfilUsuarioView.as_view(), name="perfil"),

]



