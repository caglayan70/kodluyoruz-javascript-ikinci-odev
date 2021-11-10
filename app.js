const form=document.getElementById("liveToastBtn")
const titleInput=document.getElementById("task")
const list=document.getElementById("list")


eventListeners()

function eventListeners(){
    form.addEventListener("click",newElement)
    document.addEventListener("DOMContentLoaded",function(){
        let todos=getLocalStorage()
        todos.forEach(function(todo){
            addToDo(todo)
        })
        
    })
    list.addEventListener("click",deleteItem)
}

function newElement(){

    const title=titleInput.value.trim()

    if(title===""){
        addToast("Listeye boş eleman  ekleyemezsiniz.")
    }else{
        addToDo(title)
         addLocalStorage(title)
       addToast("listeye eklendi")
    }


    
     clearInput(titleInput)   
}

function addToDo(title){
//    // <li class="list-group-item d-flex justify-content-between">
//    Ödevleri Yap
//    <a href = "#" class ="delete-item">
//        <i class = "fa fa-remove"></i>
//    </a>
// </li>

    const listItem=document.createElement("li")
    const link=document.createElement("a")
    listItem.className="list-group-item d-flex justify-content-between"
    listItem.appendChild(document.createTextNode(title))
    link.className="delete-item"
    link.href="#"
    link.innerHTML="<i class = 'fa fa-remove'></i>"
    listItem.appendChild(link)

    list.appendChild(listItem)
}

function addToast(message){
    let option = {
        animation: true,
        delay: 3000,
      };
      document.querySelector(".toast-body").innerHTML = message;
      const toast = document.querySelector("#liveToast");
      const toastElement = new bootstrap.Toast(toast, option);
      toastElement.show();
  
}

function addLocalStorage(newWord){
    let todos=getLocalStorage()
    todos.push(newWord)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function getLocalStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}
function addMain(){
    const elements=document.querySelectorAll(".list-group-item")
    elements.forEach(function(element){
        addLocalStorage(element.textContent)
    })
}

function deleteItem(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteLocalStorage(e.target.parentElement.parentElement.textContent)
    }
    if(e.target.tagName==="LI"){
        e.target.classList.toggle('checked') 
    }
}
function deleteLocalStorage(deleteTodo){
    let todos=getLocalStorage()
    todos.forEach(function(todo,index){
        if(deleteTodo===todo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
    addToast("Silme işlemi başarılı bir şekilde gerçekleşti.")
}


function clearInput(element){
    element.value=""
}
