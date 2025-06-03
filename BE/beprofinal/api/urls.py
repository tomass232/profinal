from django.urls import path
from .views import CrearUsuarioView,CampanaCrearView,ParticipacionesCrearView,RecomendacionesCrearView

urlpatterns = [
    path("crear_usuario/",CrearUsuarioView.as_view()),
    path("crear_campana/",CampanaCrearView.as_view()),
    path("crear_participaciones/",ParticipacionesCrearView.as_view()),
     path("crear_recomendaciones/",RecomendacionesCrearView.as_view()),
]
