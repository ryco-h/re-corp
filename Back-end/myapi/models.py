from django.db import models

# Create your models here.
class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)    
    
    def __str__(self):
        return self.name

class Nasabah(models.Model):

    no_regis = models.CharField(max_length=120)
    tanggal = models.DateField()
    nama_nasabah = models.CharField(max_length=120)
    pinjaman_ke = models.IntegerField(max_length=10)
    kasbon = models.CharField(max_length=120)
    storting = models.CharField(max_length=120)
    adm = models.CharField(max_length=120)
    drop_an = models.CharField(max_length=120)
    tabungan_in_out = models.CharField(max_length=120)
    bbm = models.CharField(max_length=120)
    service = models.CharField(max_length=120)
    tunai = models.CharField(max_length=120)