var arr = [];

function getItems() {
  var ul = document.querySelector("ul");

  if (localStorage.getItem("mynote") != null) {
    arr = JSON.parse(localStorage.getItem("mynote"));

    for (let i = 0; i < arr.length; i++) {
      var li = document.createElement("li");
      li.className = "note-style";
      arr[i].id = i;
      li.id = i;

      let delcont = document.createElement("div");
      delcont.className = "container-delete-icon";
      li.appendChild(delcont);
      let delbutton = document.createElement("button");
      delbutton.setAttribute("type", "button");
      delcont.appendChild(delbutton);
      let delIcon = document.createElement("i");
      delIcon.className = "fas fa-window-close delete";
      delbutton.appendChild(delIcon);

      let cont = document.createElement("div");
      cont.className = "task-note";
      //  paragraph for the task 
      let contpara = document.createElement("p");
      cont.appendChild(contpara);
      contpara.appendChild(document.createTextNode(arr[i].taskText));
      li.appendChild(cont);

      let DateTimeCont = document.createElement("div");
      DateTimeCont.className = "task-date-time";
      // paragraph for the date 
      let dateP = document.createElement("p");
      // paragraph for the time 
      let timeP = document.createElement("p");
      DateTimeCont.appendChild(dateP);
      arr[i].taskDate = arr[i].taskDate.split('-').reverse().join('/');
      dateP.appendChild(document.createTextNode(arr[i].taskDate));
      DateTimeCont.appendChild(timeP);
      timeP.appendChild(document.createTextNode(arr[i].taskTime));
      li.appendChild(DateTimeCont);
      ul.appendChild(li);
    }
  }
}
getItems();

document.querySelector("form").addEventListener("submit",  (e)=> {
  var ul = document.querySelector("ul");

  let taskText = document.querySelector("#task-text");
  let taskDate = document.querySelector("#task-date");
  let dateValue = taskDate.value.split('-').reverse().join('/');
  let taskTime = document.querySelector("#task-time");

  if (taskText.value === "") {
    alert("please enter your task");
  } 

  else if (dateValue === "") {
    alert("please enter the date");
  } 
  
  else if (taskTime == "") {
    alert("please enter the time");
  }

   else{
    let y={
      taskText: taskText.value,
      taskDate: dateValue,
      taskTime: taskTime.value,
    }
      arr.push(y);
    var li = document.createElement("li");
      li.className = "note-style";
      
    localStorage.setItem('mynote', JSON.stringify(arr));

    var delcont = document.createElement("div");
    delcont.className = "container-delete-icon";
    li.appendChild(delcont);
    // Create delete button
    let delbutton = document.createElement("button");
    delbutton.setAttribute("type", "button");
    delcont.appendChild(delbutton);
    let delIcon = document.createElement("i");
    delIcon.className = "fas fa-window-close delete";
    delbutton.appendChild(delIcon);

    cont = document.createElement("div");
    cont.className = "task-note";
    //paragraph for the task 
    let contpara = document.createElement("p");
    cont.appendChild(contpara);
    contpara.appendChild(document.createTextNode(taskText.value));
    li.appendChild(cont);

    let DateTimeCont = document.createElement("div");
    DateTimeCont.className = "task-date-time";
    //paragraph for the date 
    let dateP = document.createElement("p");
    // paragraph for the time
    let timeP = document.createElement("p");
    DateTimeCont.appendChild(dateP);
    dateP.appendChild(document.createTextNode(dateValue));
    DateTimeCont.appendChild(timeP);
    timeP.appendChild(document.createTextNode(taskTime.value));
    li.appendChild(DateTimeCont);
    ul.appendChild(li);

    document.querySelector("#task-text").value = "";
    document.querySelector("#task-date").value = "";
    document.querySelector("#task-time").value = "";
  }
  e.preventDefault();
});
document.querySelector("ul").addEventListener("click", (e)=> {
  if (e.target.classList.contains("delete")) {
       ul = document.querySelector("ul");
       li = e.path[3];
      }
      let index = 0;
      // Remove item from dom
      ul.removeChild(li);
      // Remove item from array
      arr.splice(index, 1);
      var note = document.querySelectorAll("li");
      for (let i = 0; i < arr.length; i++) {
        arr[i].id = i;
        note[i].id = i;
      }
      localStorage.setItem('mynote', JSON.stringify(arr));

      if (localStorage.mynote === "[]") {
        localStorage.removeItem("mynote");
      }
});