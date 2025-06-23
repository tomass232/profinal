from django.db import models
from django.contrib.auth.models import User
    

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField()
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.correo}"


class Usuario(models.Model):
    usuario = models.OneToOneField(User,on_delete=models.CASCADE)


class Campanas(models.Model):
    titulo_campana = models.CharField(max_length=100)
    descripcion_campana = models.TextField() # la diferencia entre este y el CharField es la limitación de carácteres
    fecha_campana = models.DateTimeField()
    ubicacion_campana = models.TextField() #dtos campa
    
    def __str__(self):
        return self.titulo_campana

class Participaciones(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField()
    campana = models.ForeignKey(Campanas, on_delete=models.CASCADE)
    calificacion = models.IntegerField()

    def __str__(self):
        return f"{self.usuario.username} en {self.campana.titulo_campana}"

class Recomendaciones(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    campana = models.ForeignKey(Campanas, on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateTimeField()

    def __str__(self):
        return f"Recomendación de {self.usuario.username} para {self.campana.titulo_campana}"
