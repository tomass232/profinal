from django.contrib import admin
from django.urls import path,include
from api.views import ContactoAPIView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/",include("api.urls")),
    path('contacto/', ContactoAPIView.as_view(), name='contacto'),
]
