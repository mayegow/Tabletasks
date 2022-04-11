from django.views import View
from .models import Task
from django.http import JsonResponse

class TasksApi(View):
    def get(self, request):
        tList = Task.objects.all()
        return JsonResponse(list(tList.values()), safe=False)

    def post(self, request):
        task = request.POST['tarea']
        responsible = request.POST['responsable']
        date = request.POST['fecha']
        new_task = Task.objects.create(name_task=task, responsible_task=responsible, date_task=date, realized=False)
        new_task.save()
        
        tList = Task.objects.all()
        return JsonResponse(list(tList.values()), safe=False)

    def delete(self, request, pk):
        dead = Task.objects.get(id=pk)
        dead.delete()

        tList = Task.objects.all()
        return JsonResponse(list(tList.values()), safe=False)

