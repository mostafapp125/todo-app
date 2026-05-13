let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");


window.onload = function () {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task);
  });

  
  taskInput.focus();
};
taskInput.scrollIntoView({ behavior: "smooth" })

addBtn.onclick = function () {

  if(taskInput.value !== ""){

    createTask(taskInput.value);

    saveTask(taskInput.value);

    taskInput.value = "";

  }

};


function createTask(taskText){

  let li = document.createElement("li");

  let span = document.createElement("span");

  span.textContent = taskText;

  
  let btnBox = document.createElement("div");


  let editBtn = document.createElement("button");

  editBtn.textContent = "Edit";

  editBtn.onclick = function () {

    let newTask = prompt("Edit task", span.textContent);

    if(newTask !== null && newTask !== ""){
      span.textContent = newTask;
    }

  };


  let deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {

    li.remove();

    deleteTask(span.textContent);

  };

  btnBox.appendChild(editBtn);

  btnBox.appendChild(deleteBtn);

  li.appendChild(span);

  li.appendChild(btnBox);

  taskList.appendChild(li);

}

function saveTask(task){

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

}


function deleteTask(task){

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.filter(t => t !== task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

}
taskInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    addBtn.click();
  }

});
let modeBtn = document.getElementById("modeBtn");

modeBtn.onclick = function(){

  document.body.classList.toggle("dark");

};