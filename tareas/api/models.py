from django.db import models

# Create your models here.

class Task(models.Model):
    name_task        = models.CharField(blank=False, max_length=50)
    responsible_task = models.CharField(blank=False, max_length=50)
    date_task        = models.CharField(blank=False, max_length=10)
    realized         = models.BooleanField(default=False)

    def __str__(self):
        return self.name_task