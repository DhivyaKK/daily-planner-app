//use the advancecs dayjs plugin to use the ordinal of the day
dayjs.extend(window.dayjs_plugin_advancedFormat);
var currentDayEle = $("#currentDay");

//var to store all the user tasks i.e text area vals
var savedEvents = [];
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
  generateHtmlForPlanner();

  //function call to set the planner background color
  setTextAreaBackground();

  //On page refresh, presist the user values in textarea
  savedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];

  for (let i = 0; i < savedEvents.length; i++) {
    //console.log(savedEvents);
    $("#" + savedEvents[i].eventKey)
      .siblings(".description")
      .val(savedEvents[i].eventText);
  }

  $(".saveBtn").on("click", function (e) {
    var hourId = $(this).attr("id");
    var textBlock = $(this).prev().val();
    
    //set an object to store the hour and user event 
    let eventObj = {
      eventKey: hourId,
      eventText: textBlock,
    };

    savedEvents.push(eventObj);
    //set the local storage var for later retrieval
    localStorage.setItem("userEvents", JSON.stringify(savedEvents));
  });
});

//generate html

function generateHtmlForPlanner() {
  for (let i = 9; i <= 18; i++) {
    //create rows for planner
    row = $(`<div class="row">`);
    timeCol = $(
      `<div class="col-2 time-block hour" id="${i}">${timeformat(i)} </div> `
    );
    eventCol = $(
      `<textarea class="col-8 description" maxlength="500"></textarea>`
    );
    saveCol = $(
      ` <button id="${i}" class="col-2 saveBtn"><i class="fas fa-save"></i></button></div>`
    );
    eventCol.css("color", "black");
    row.append(timeCol);
    row.append(eventCol);
    row.append(saveCol);
    $("#display-planner").append(row);
  }
}

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

function setTextAreaBackground() {
  timeBlock = $(".hour");
  //$.each(timeBlock, function()
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

