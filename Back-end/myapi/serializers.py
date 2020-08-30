from rest_framework import serializers

from .models import Hero, Nasabah

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('id', 'name', 'alias')

class NasabahSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Nasabah
        fields = ('id', 'no_regis', 'tanggal', 'nama_nasabah', 'pinjaman_ke', 'kasbon', 'storting', 'adm', 'drop_an', 'tabungan_in_out', 'bbm', 'service', 'tunai')