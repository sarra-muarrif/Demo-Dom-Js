// CODE EXPLAINED channel

//Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Clasess names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;
//Get item from LocalStore
let data = localStorage.getItem("TODO");
//Check the data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.lenght; //set the id to the last one
    loadList(LIST);   //Loade the list to the user interface
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
//clear to the localstoarge
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload()
})
//Show to date
const options = { weekday: "long", month: "short", day: "numeric" }
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-UK", options);

//add to do function 
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class ="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class ="text ${LINE}" >${toDo}</p>
                  <i class ="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add an item to the list user the enter key
document.addEventListener("keyup", function (even) {
    if (even.keyCode == 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            })
            //add item to locatstorge
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++;
        }
        input.value = "";
    }
})

//Complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Delete to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//target the item created dynamically
list.addEventListener("click", function (event) {
    const element = event.target;     //return the clicked element inside the list
    const elementJob = element.attributes.job.value;   //complete or delete
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add item to locatstorge
    localStorage.setItem("TODO", JSON.stringify(LIST))
})
