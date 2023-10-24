// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // adds a listener ("click") to all .saveBtn classes
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

    // for each time-block that has been selected (timeBlocks), it runs the compareTime function
    timeBlocks.forEach(compareTime);

    // for each time-block that has been selected (timeBlocks), it runs the pullFromStorage function
    timeBlocks.forEach(pullFromStorage);



    function compareTime (item) {
        var currentTime = dayjs().hour();
        // when you select the current time block, it should start at the 5th index that returns the hour. this will show us the current time.
        var currentTimeBlock = item.id.slice(5);

        // this adds the styling after checking if it is in the past, present, or future
        if (currentTimeBlock == currentTime) {
            item.classList.add("present");
        } else if (currentTimeBlock < currentTime) {
            item.classList.add("past");
        } else {
            item.classList.add("future");
        }
    }
   
    // pulls each item from storage and puts a value in the corresponding textareas
    function pullFromStorage (item) {
    var currentItem = localStorage.getItem(item.id);
    item.querySelector("textarea").value = currentItem;
}
// shows the current date at the top of the page by gpulling from the currentDay element
document.getElementById("currentDay").innerHTML = dayjs().format('dddd, MMMM DD');
  });