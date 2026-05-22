const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const sound = new Audio("click.mp3");
let finished = false;

display.value = localStorage.getItem("result") || "";

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

function saveResult() {
  localStorage.setItem("result", display.value);
}

function clearDisplay() {
  display.value = "";
}

function removeLast() {
  display.value = display.value.slice(0, -1);
}

function addToDisplay(value) {
  if (
    finished &&
    "0123456789.".includes(value)
  ) {
    display.value = "";
    finished = false;
  }
  display.value += value;
}

function calculate() {
  try {
    display.value = eval(display.value);
    finished = true;
    saveResult();
  } catch {
    display.value = "Error";
  }
}

function createRipple(e, btn) {
  let circle = document.createElement("span");
  let x = e.clientX - btn.offsetLeft;
  let y = e.clientY - btn.offsetTop;
  circle.style.left = x + "px";
  circle.style.top = y + "px";
  btn.appendChild(circle);
  setTimeout(() => {
    circle.remove();
  }, 600);
}

buttons.forEach(btn => {
  btn.addEventListener("click", e => {
    playSound();
    createRipple(e, btn);

    let value = btn.getAttribute("data-value");
    if (value) {
      addToDisplay(value);
    }
    if (btn.id === "clear") {
      clearDisplay();
    }
    if (btn.id === "back") {
      removeLast();
    }
    if (btn.id === "equal") {
      calculate();
    }
  });
});
document.addEventListener("keydown", e => {
  if ("0123456789+-*/.".includes(e.key)) {
    addToDisplay(e.key);
    playSound();
  }
  if (e.key === "Enter") {
    calculate();
  }
  if (e.key === "Backspace") {

    removeLast();
  }
  if (e.key === "Escape") {

    clearDisplay();
  }

});
// let mydata = [1,2,3,4,43,2,1,"mostafa"] 
// let newdata = new Set([1,2,3,4,43,2,1]) // set is a collection of unique values, it will remove duplicates
//  let newdata = new Set(mydata)
// let newdata = new Set().add(1).add(2).add(3).add(4).add(43)

// console.log(mydata[0]) // 1
// console.log(newdata[0]) // undefined
// console.log(newdata.size) // 5

//  newdata.delete(43) // removes 43 from the set 
//  console.log(newdata.size) // 4
// console.log(newdata.delete(2)) // true, removes 2 from the set
// newdata.clear() // clears the array
// console.log(newdata) // []
// newdata.clear() // clears the set
// console.log(newdata.size) // 0
//  console.log(newdata.has("mostafa")) // true, checks if "mostafa" is in the set
// let mdata = [1,2,2,3,3,"a","a"]
// let data = new Set([1,2,2,3,3,"a","a"])

// let itrator = data.keys() // returns an iterator of the keys in the set
// console.log(itrator.next()) // {value: 1, done: false}
// console.log(itrator.next()) // {value: 2, done: false}
// console.log(itrator.next().value) // 3
// console.log(itrator.next().value) // "a"
// console.log(itrator.next()) // {value: undefined, done: true}

// data.forEach((el) => {
//     console.log(el) // 1, 2, 3, "a"
// })

// let weakdata = new WeakSet([{a: 1, b: 2, c: 3}]) // WeakSet is a collection of objects, it will not allow primitive values and it will not prevent garbage collection of the objects it contains
// console.log(weakdata) // WeakSet { <items unknown> }

// let itr = weakdata.keys() // WeakSet does not have keys() method, it will throw an error

// consle.log(itr.next().value) // TypeError: weakdata.keys is not a function