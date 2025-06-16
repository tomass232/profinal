from django.urls import path
from .views import (
    CrearUsuarioView,
    CampanaCrearView,
    ParticipacionesCrearView,
    RecomendacionesCrearView,
    IniciarSesionView,
)

urlpatterns = [
    path("crear_usuario/", CrearUsuarioView.as_view(), name="crear_usuario"),
    path("crear_campana/", CampanaCrearView.as_view(), name="crear_campana"),
    path("crear_participaciones/", ParticipacionesCrearView.as_view(), name="crear_participaciones"),
    path("crear_recomendaciones/", RecomendacionesCrearView.as_view(), name="crear_recomendaciones"),
    path('login/', IniciarSesionView.as_view(), name="iniciar_sesion"),
]

