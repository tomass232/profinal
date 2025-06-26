from django.contrib import admin
from .models import Usuario, Campanas, Participaciones, Recomendaciones, Comunidades

admin.site.register(Usuario)
admin.site.register(Campanas)
admin.site.register(Participaciones)
admin.site.register(Recomendaciones)
@admin.register(Comunidades)
class ComunidadAdmin(admin.ModelAdmin):
    list_display  = ("nombre", "ubicacion", "fecha_creacion")
    search_fields = ("nombre", "ubicacion")
