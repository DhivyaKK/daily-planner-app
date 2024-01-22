//use the advancecs dayjs plugin to use the ordinal of the day
dayjs.extend(window.dayjs_plugin_advancedFormat);
var currentDayEle = $("#currentDay");
//var to store all the user tasks i.e text area vals
var userSavedTasks ;
//use moment function to get the time 
var timeBlock = $(".hour");
var currentTime = dayjs().hour();

//localStorage.clear();


//on page load, set date to current date in the format name of day, month and day
$(window).on("load", function(){
const currentDate = dayjs();
const formattedDate = currentDate.format("dddd, MMMM Do");
currentDayEle.text(formattedDate);

var aa = localStorage.getItem("userInputTask");
console.log("localstorage" + aa);

userSavedTasks = localStorage.getItem('userInputTask') || [];


timeBlock.each (function(){
    
    var getHour = parseInt($(this).attr("id"));
    let locObj  = localStorage.getItem("userInputTask");
    console.log(locObj);
    //debugger;
    if(currentTime === getHour)
    {
        $(this).next().addClass("present");
    }
    else if(currentTime > getHour){
        $(this).next().addClass("past");

    }
    else if(currentTime < getHour){
        $(this).next().addClass("future");
    }
})

debugger;

});


//check the hour block if its past(gray), present (red) or furture (green)
//callback(indexInArray: number, value: HTMLElement): any
//$.each(timeBlock, function(i, hour)
timeBlock.each (function(){
    
    var getHour = parseInt($(this).attr("id"));
    let locObj  = localStorage.getItem("userInputTask");
    console.log(locObj);
    //debugger;
    if(currentTime === getHour)
    {
        $(this).next().addClass("present");
    }
    else if(currentTime > getHour){
        $(this).next().addClass("past");

    }
    else if(currentTime < getHour){
        $(this).next().addClass("future");
    }
})

//on click of textarea,class=event; 
//on click of savebtn, set local storage with textarea contents.
//On page refresh, presist the user values in textarea

$(".saveBtn").on("click", function(event){

    let textareaRef = $(this).prev();
    let userInputTask = textareaRef.val();
    let timeOfBlock = $(this).parent().children(0).attr("id");
    debugger;
    
    //store as a key value pair
    localStorage.setItem(timeOfBlock, userInputTask);
})






