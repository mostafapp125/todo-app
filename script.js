let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let modeBtn = document.getElementById("modeBtn");
let count = document.getElementById("count");

let searchInput = document.getElementById("searchInput");
let filter = document.getElementById("filter");
let empty = document.getElementById("empty");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


window.onload = function(){

  tasks.forEach(task => {
    createTask(task);
  });

  updateCount();

  checkEmpty();

  taskInput.focus();

  if(localStorage.getItem("mode") === "dark"){
    document.body.classList.add("dark");
  }

};


addBtn.onclick = function(){

  let value = taskInput.value.trim();

  if(value !== ""){

    let task = {

      id: Date.now(),

      text: value,

      completed:false

    };

    tasks.push(task);

    save();

    createTask(task);

    updateCount();

    checkEmpty();

    taskInput.value = "";

    taskInput.focus();

  }

};


taskInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    addBtn.click();
  }

});


function createTask(task){

  let li = document.createElement("li");

  if(task.completed){
    li.classList.add("completed");
  }

  let span = document.createElement("span");

  span.textContent = task.text;


  let btnBox = document.createElement("div");


  let doneBtn = document.createElement("button");

  doneBtn.textContent = "Done";

  doneBtn.className = "done";


  doneBtn.onclick = function(){

    li.classList.toggle("completed");

    task.completed = !task.completed;

    save();

  };


  let editBtn = document.createElement("button");

  editBtn.textContent = "Edit";

  editBtn.className = "edit";


  editBtn.onclick = function(){

    let newTask = prompt("Edit task", span.textContent);

    if(newTask){

      span.textContent = newTask;

      updateTask(task.id, newTask);

    }

  };


  let deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  deleteBtn.className = "delete";


  deleteBtn.onclick = function(){

    li.remove();

    deleteTask(task.id);

    updateCount();

    checkEmpty();

  };


  btnBox.appendChild(doneBtn);

  btnBox.appendChild(editBtn);

  btnBox.appendChild(deleteBtn);


  li.appendChild(span);

  li.appendChild(btnBox);


  taskList.appendChild(li);

}


function save(){

  localStorage.setItem("tasks", JSON.stringify(tasks));

}


function updateTask(id, newText){

  tasks = tasks.map(task => {

    if(task.id === id){

      task.text = newText;

    }

    return task;

  });

  save();

}


function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  save();

}


function updateCount(){

  count.textContent = `Tasks: ${tasks.length}`;

}


function checkEmpty(){

  if(tasks.length === 0){

    empty.style.display = "block";

  }else{

    empty.style.display = "none";

  }

}


modeBtn.onclick = function(){

  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){

    localStorage.setItem("mode", "dark");

  }else{

    localStorage.setItem("mode", "light");

  }

};


searchInput.addEventListener("input", function(){

  let value = searchInput.value.toLowerCase();

  let allTasks = document.querySelectorAll("li");

  allTasks.forEach(task => {

    let text = task
    .querySelector("span")
    .textContent
    .toLowerCase();

    if(text.includes(value)){

      task.style.display = "flex";

    }else{

      task.style.display = "none";

    }

  });

});


filter.onchange = function(){

  let allTasks = document.querySelectorAll("li");

  allTasks.forEach(task => {

    if(filter.value === "all"){

      task.style.display = "flex";

    }

    else if(filter.value === "completed"){

      if(task.classList.contains("completed")){

        task.style.display = "flex";

      }else{

        task.style.display = "none";

      }

    }

    else if(filter.value === "active"){

      if(!task.classList.contains("completed")){

        task.style.display = "flex";

      }else{

        task.style.display = "none";

      }

    }

  });

};