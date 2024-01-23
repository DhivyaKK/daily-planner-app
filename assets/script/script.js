//use the advancecs dayjs plugin to use the ordinal of the day
dayjs.extend(window.dayjs_plugin_advancedFormat);
var currentDayEle = $("#currentDay");

//var to store all the user tasks i.e text area vals
var userSavedEvents = [];
var timeBlock;

//var for html elements
var row;
var timeCol;
var eventCol;
var saveCol;

//current hour
var currentHour = dayjs().hour();

//on page load, set date to current date in the format name of day, month and day
$(window).on("load", function () {
  const currentDate = dayjs();
  const formattedDate = currentDate.format("dddd, MMMM Do");
  currentDayEle.text(formattedDate);

  //generate html for business hours 9am-6pm
  for (let i = 9; i <= 18; i++) {
    //create rows for planner
    row = $(`<div class="row">`);
    timeCol = $(
      `<div class="col-2 time-block hour" id="${i}">${timeformat(i)} </div> `
    );
    eventCol = $(
      `<textarea class="col-8 description"></textarea>`
    );
    saveCol = $(
      ` <button id="${i}" class="col-2 saveBtn"><i class="fas fa-save"></i></button></div>`
    );
    row.append(timeCol);
    row.append(eventCol);
    row.append(saveCol);
    $("#display-planner").append(row);
  }

  timeBlock = $(".hour");
  setTextAreaBackground(timeBlock);

userSavedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];

 for(let i = 0; i < userSavedEvents.length; i++)
 {
    console.log(userSavedEvents);
    $("#"+userSavedEvents[i].eventKey).siblings(".description").val(userSavedEvents[i].eventText);
 }

$(".saveBtn").click(function(e){
    var hourId = $(this).attr("id");
    var textBlock = $(this).prev().val();
    console.log(hourId, textBlock);

     let eventObj ={
        eventKey: hourId,
        eventText: textBlock
     }

     userSavedEvents.push(eventObj);
     localStorage.setItem("userEvents", JSON.stringify(userSavedEvents));
     //console.log(userSavedEvents);
})

});



//show time as am /pm
function timeformat(hour) {
  let partOfDay = "";
  if (hour < 12) {
    partOfDay = "am";
  } else {
    partOfDay = "pm";
  }
  hour = hour % 12;
  hour = hour ? hour : 12; //if 0, then 12hrs
  return hour + " " + partOfDay;
}

//check the hour block if its past(gray), present (red) or furture (green)
//$.each(timeBlock, function()
function setTextAreaBackground(timeBlock) {

  timeBlock.each(function () {
    let getRowHour = parseInt($(this).attr("id"));
    if (currentHour === getRowHour) {
      $(this).next().addClass("present");
    } else if (currentHour > getRowHour) {
      $(this).next().addClass("past");
    } else if (currentHour < getRowHour) {
      $(this).next().addClass("future");
    }
  });
}

/* on click of textarea,class=event; on click of savebtn, set local storage with textarea contents.
On page refresh, presist the user values in textarea */

// $(".saveBtn").on("click", function (event) {
//   //let textareaRef = $(this).prev();
//   let textareaRef = $(this).attr("id");
//   let userInputReminder = textareaRef.val();
//   debugger;
//   if (userInputReminder == "") {
//     return;
//   }

//   let timeOfBlock = $(this).parent().children(0).attr("id");
//   debugger;

//   //store as a key value pair
//   localStorage.setItem(timeOfBlock, userInputReminder);
// });
