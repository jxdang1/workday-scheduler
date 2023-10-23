// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

    document.querySelectorAll(".saveBtn").forEach(elem => elem.addEventListener("click", savedText));


    function savedText () {
        // retrieves the id of the parent element that contains the hour in HTML
        var id = $(this).parent().attr("id");
        // the previous sibling of the current element (text) gets a value when there is text in the file
        var text = $(this).prev().val();
        //sets the hour and user input to local storage (id) and (text)
        localStorage.setItem(id, text);
    }

    var timeBlocks = document.querySelectorAll(".time-block");

    timeBlocks.forEach(compareTime);
    timeBlocks.forEach(pullFromStorage);

    function compareTime (item) {
        var currentTime = dayjs().hour;
        var currentTimeBlock = item.id.slice(5);

        if (currentTimeBlock == currentTime) {
            item.classList.add("present");
        } else if (currentTimeBlock < currentTime) {
            item.classList.add("past");
        } else {
            item.classList.add("future");
        }
    }
   

    function pullFromStorage (item) {
    var currentItem = localStorage.getItem(item.id);
    item.querySelector("textarea").value = currentItem;
}

document.getElementById("currentDay").innerHTML = dayjs().format('dddd, MMMM DD');
  });