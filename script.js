/**********************************************
 * TO-DO LIST APP — BY CHUKWUEMEKA CLEMENT
 * Description:
 * This app allows the user to:
 * - Add new tasks
 * - Mark tasks as completed
 * - Delete tasks
 * - Save and load tasks using localStorage
 **********************************************/

//  SELECT IMPORTANT ELEMENTS FROM THE DOM
const inputBox = document.querySelector("input");        // The input field where user types tasks

inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    taskBtn.click()
  }
})

const taskBtn = document.getElementById("task_button");   // The "Task" button
const list = document.querySelector("ul");                // The <ul> element to display all tasks
const clearAll = document.getElementById("clearAll")


// LOAD SAVED TASKS FROM LOCAL STORAGE OR CREATE EMPTY ARRAY
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// EVENT LISTENER: WHEN USER CLICKS "ADD TASK" BUTTON
taskBtn.addEventListener("click", () => {
  const taskText = inputBox.value.trim(); // Remove extra spaces just in case

  //  VALIDATION: Prevent adding empty tasks
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // CREATE A NEW <li> ELEMENT FOR THE NEW TASK
  const li = document.createElement("li");
  li.textContent = taskText;

  // CREATE AND ADD DELETE BUTTON TO THE TASK
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "❌";
  li.appendChild(deleteBtn);

  // DELETE BUTTON FUNCTIONALITY: Remove the task from screen
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // ADD NEW TASK OBJECT TO THE TASKS ARRAY
  tasks.push({ text: taskText, completed: false });

  // UPDATE LOCAL STORAGE WITH NEW TASK LIST
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // ADD THE NEW TASK TO THE <ul> ON SCREEN
  list.appendChild(li);

  // CLEAR INPUT FIELD FOR NEXT ENTRY
  inputBox.value = "";

  // ALLOW TOGGLE BETWEEN COMPLETED / NOT COMPLETED
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
});


//  FUNCTION: DISPLAY ALL TASKS FROM LOCAL STORAGE WHEN PAGE LOADS
const displayTask = () => {
  // CLEAR EXISTING LIST TO AVOID DUPLICATES
  list.innerHTML = "";

  // LOOP THROUGH EACH SAVED TASK OBJECT
  tasks.forEach((task) => {
    //  CREATE A NEW LIST ITEM
    const li = document.createElement("li");
    li.textContent = task.text;

    // APPLY COMPLETED CLASS IF TASK WAS MARKED DONE EARLIER
    if (task.completed) {
      li.classList.add("completed");
    }

    //  ADD A DELETE BUTTON TO EACH SAVED TASK
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    li.appendChild(deleteBtn);

    // DELETE BUTTON FUNCTIONALITY
    deleteBtn.addEventListener("click", () => {
      li.remove();
      // FILTER OUT THE DELETED TASK FROM THE ARRAY
      tasks = tasks.filter((t) => t.text !== task.text);
      // UPDATE LOCAL STORAGE AFTER DELETION
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    // ALLOW TOGGLE OF COMPLETED STATUS AND SAVE THE CHANGE
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      task.completed = !task.completed; // Flip true/false
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    // APPEND EACH <li> TO THE MAIN LIST
    list.appendChild(li);
  });
};

// INITIALIZE APP: LOAD TASKS IMMEDIATELY WHEN PAGE OPENS
displayTask();

// ADDING A CLEAR ALL BUTTON
clearAll.addEventListener("click", () => {
  tasks = [];
  localStorage.removeItem("tasks");
  list.innerHTML = ""
  alert("All Task cleared")

})