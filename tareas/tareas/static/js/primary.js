(function(){
    // Variables
    var dates = new Date()
    var fecha = dates.getDate()+'-'+(dates.getMonth()+1)+'-'+dates.getFullYear()
    var list        = $("#lista"),
        tasks       = $("#tareaInput"),
        responsible = $("#nameInput"),
        newTasks    = $("#btn-agregar"),
        addNew      = false

    $.ajax({
        url: "/api/get_tasks",
        type: "get",
        dataType: "json",
        success: function(response){
            console.log(response)
            loadTasks(response)
        },
        error: function(response){
            console.log(response)
        }
    
    })

    //Funciones
    var addTasks = function(){
        var task       = tasks.val(),
            whos       = responsible.val();
        
        if (task === ""){
            tasks.attr("placeholder","Agrega una tarea valida")
            tasks.addClass("error")
            return false
        }
        if(whos === "" || whos === undefined){
            responsible.attr("placeholder","Agrega un responsable valido")
            responsible.addClass("error")
            return false
        }

        
        $.ajax({
            url: `/api/post_tasks/`,
            type: 'post',
            data: {"tarea":tasks.val(), "responsable": responsible.val(), "fecha":fecha},
            dataType: 'json',
            success: function(response){
                console.log(response)
            },
            error: function(response){  
                console.log(response)
            }
        })

        //lista con nueva tarea agregada
        $("#lista").append(`<li class='animate__animated animate__bounceInLeft' ><a id='id_task' href='#'>${task}</a><span>${whos}</span><div class='d-flex justify-content-end'><p><small class='justify-content-end' id='date'>${fecha}</small></p></div></li>`)

        // borrando lal input
        tasks.val("")
        responsible.val("")
        $("li").each(function(i){
            $(this).on("click", function(){
                $(this).remove()
                $.ajax({
                    url: `/api/del_tasks/${$(this)[0].id}/`,
                    type: 'delete',
                    data: {"id_task":$(this)[0].id},
                    dataType: 'json',
                    success: function(response){
                        console.log(response)
                        window.location.reload()
                    }, 
                    error: function(response){
                        console.log(response)
                    }
                })
            })
        })
        $('#form-tasks').removeClass("animate__animated animate__bounceInDown")
        $('#form-tasks').addClass("animate__animated animate__backOutUp")
        $('#form-tasks').addClass('d-none')
        window.location.reload()

    };
    // load task to backend
    var loadTasks = function(res){
        for (var i = 0; i<res.length;i++){
            $("#lista").append(`<li class='animate__animated animate__bounceInLeft' id=${res[i].id}><a id='id_task' href='#'>${res[i].name_task}</a><span>${res[i].responsible_task}</span><div class='d-flex justify-content-end'><p><small class='justify-content-end' id='date'>${res[i].date_task}</small></p></div></li>`)
        }
        
        $("li").each(function(i){
            $(this).on("click", function(){
                $(this).remove()
                $.ajax({
                    url: `/api/del_tasks/${$(this)[0].id}/`,
                    type: 'delete',
                    data: {"id_task":$(this)[0].id},
                    dataType: 'json',
                    success: function(response){
                        console.log(response)
                        window.location.reload()
                    }, 
                    error: function(response){
                        console.log(response)
                    }
                })
            })
        })
    };
    var checkInput = function(){
        tasks.removeClass("error")
        tasks.attr("placeholder","Agrega tu tarea")

    }
    var checkInputResponsible = function(){
        responsible.removeClass("error")
        responsible.attr("placeholder","Agrega un responsable")
    }
    var deleteTasks = function(tag){
        this.className = "animate__animated animate__backOutRight"
        this.parentNode.remove(this)
    }

    //Eventos
    // add tasks
    newTasks.on("click", addTasks)

    //comprobe input empty
    tasks.on("click", checkInput)

    // comprobe input responsible
    responsible.on("click", checkInputResponsible)

    // delete tasks
    $("li").each(function(i){
        $(this).on("click", function(){
            $(this).remove()
            $.ajax({
                url: `/api/del_tasks/${$(this)[0].id}/`,
                type: 'delete',
                data: {"id_task":$(this)[0].id},
                dataType: 'json',
                success: function(response){
                    console.log(response)
                    window.location.reload()
                }, 
                error: function(response){
                    console.log(response)
                }
            })
        })
    })

    // add new tasks action
    $("#add-tasks").on("click", function(){
        $("#form-tasks").removeClass("d-none")
        $("#form-tasks").addClass("animate__animated animate__fadeInDown")
    })   


    }());