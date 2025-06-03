from django.db import models
from django.contrib.auth.models import User


class Usuario(models.Model):
    usuario = models.OneToOneField(User,on_delete=models.CASCADE)

class Campanas(models.Model):
    titulo_campana = models.CharField(max_length=100)
    descripcion_campana = models.TextField() # la diferencia entre este y el CharField es la limitación de carácteres
    fecha_campana = models.DateTimeField()
    ubicacion_campana = models.TextField()

class Participaciones(models.Model):
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField()
    campana = models.ForeignKey(Campanas,on_delete=models.CASCADE)
    calificacion = models.IntegerField()


class Recomendaciones(models.Model):    
    usuario = models.ForeignKey(User,on_delete=models.CASCADE)
    campana = models.ForeignKey(Campanas,on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateTimeField()
    