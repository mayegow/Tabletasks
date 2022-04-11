(function(){
$.ajax({
    url: "/api/get_tasks",
    type: "get",
    dataType: "json",
    success: function(response){
        console.log(response)
        console.log(response.name_task)
        console.log(response.responsible_task)
        console.log(response.date_task)
    },
    error: function(response){
        console.log(response)
    }

})

var loadTasks = function(){
    var newTask    = document.createElement("li"),
        thread     = document.createElement("a"),
        span       = document.createElement("span"),
        div        = document.createElement("div"),
        dateSpan   = document.createElement("span"),
        content    = document.createTextNode(task),
        dateCreate = document.createTextNode(fecha)

    
    // Embebiendo un tag <a> dentro de un <li>
    thread.appendChild(content, span)
    span.appendChild(respon)
    // seteando atributo href con #
    thread.setAttribute("href", "#")
    newTask.appendChild(thread)
    newTask.appendChild(span)
    dateSpan.appendChild(dateCreate)
    div.appendChild(dateSpan)
    div.className = "d-flex justify-content-end"
    newTask.appendChild(div)
    newTask.className="animate__animated animate__bounceInLeft"
    

    //lista con nueva tarea agregada
    list.append(newTask)

    // borrando lal input
    responsible.val("")
    $("li").each(function(){
        $(this).on("click", function(){
            $(this).remove()
        })
    })
};

})