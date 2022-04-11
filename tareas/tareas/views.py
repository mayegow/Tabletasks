from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import View

class Tasks(View):
    def get(self, request, *args, **kargs):
        return render(request, "tareas.html")


