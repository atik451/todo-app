const container =document.querySelector(".container");
const todoform =document.querySelector(".todo-form");
const todoinput =document.querySelector("#inputtodo");
const todoaddbutton =document.querySelector("#addtodoButton");
const todolists =document.querySelector("#lists");
const messageElement =document.querySelector("#message");

//showMessage
const showMessage =(text,status) =>
    {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
setTimeout(()=> {
    messageElement.textContent ="";
    messageElement.classList.remove(`bg-${status}`);
}, 1000);

};
//createtodo
const createTodo = (todoId,todovalue) => {
const todoElement = document.createElement("li");
todoElement.id = todoId;
todoElement.classList.add("li-style");
todoElement.innerHTML = `
<span>${todovalue} </span>
<span><button class ="btn" id = "deleteButton"><i 
class="fas fa-trash"> </i> </button> </span>

`;

todolists.appendChild(todoElement);

const deleteButton = todoElement.querySelector("#deleteButton");
deleteButton.addEventListener("click",deleteTodo);
};


//deleteTodo
const deleteTodo = (event) =>{
   const selectedTodo = event.target.parentElement.parentElement.
   parentElement ;
   todolists.removeChild(selectedTodo);
   showMessage("todo is deleted","danger");

   
   let todos = getTodosFromLocalStorage();
 todos =  todos.filter((todo)=> todo.todoId !== selectedTodo.id );
 localStorage.setItem("mytodos",JSON.stringify(todos));
         todoinput.value ="";
};

//getTodoFromlocalStorage
getTodosFromLocalStorage = () =>{
    return localStorage.getItem("mytodos")
? JSON. parse (localStorage.getItem("mytodos")) : []  ;
};
//addTodo 
const addtodo = (event) => {
    
        event.preventDefault();

         const todovalue = todoinput.value;

         //unique id
         const todoId = Date.now().toString();
         
         createTodo(todoId, todovalue)
         showMessage("todo id added","success");
//add todo to localstorage
         const todos = getTodosFromLocalStorage();
         todos.push({todoId,todovalue});
         localStorage.setItem("mytodos",JSON.stringify(todos));
         todoinput.value ="";
    };
//loadtodos
const loadTodos = () =>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todovalue));
};

todoform.addEventListener("submit",addtodo);
window.addEventListener("DOMContentLoaded",loadTodos);