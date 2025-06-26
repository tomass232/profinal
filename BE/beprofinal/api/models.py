from django.db import models
from django.contrib.auth.models import User


class MensajeContacto(models.Model):
    nombre   = models.CharField(max_length=100)
    correo   = models.EmailField()
    mensaje  = models.TextField()
    fecha    = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.correo}"


class Usuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)


class Comunidades(models.Model):
    nombre      = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()
    ubicacion   = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.nombre


class Campanas(models.Model):
    titulo_campana      = models.CharField(max_length=100)
    descripcion_campana = models.TextField()
    fecha_campana       = models.DateTimeField()
    ubicacion_campana   = models.TextField()

    comunidad = models.ForeignKey(
        Comunidades,
        null=True, blank=True,      
        on_delete=models.CASCADE,
        related_name="campanas"
    )

    def __str__(self):
        return self.titulo_campana


class Participaciones(models.Model):
    usuario           = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField()
    campana           = models.ForeignKey(Campanas, on_delete=models.CASCADE)
    calificacion      = models.IntegerField()

    def __str__(self):
        return f"{self.usuario.username} en {self.campana.titulo_campana}"


class Recomendaciones(models.Model):
    usuario    = models.ForeignKey(User, on_delete=models.CASCADE)
    campana    = models.ForeignKey(Campanas, on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha      = models.DateTimeField()

    def __str__(self):
        return f"Recomendación de {self.usuario.username} para {self.campana.titulo_campana}"
