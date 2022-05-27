var buttons=["red","green","blue","yellow"];
var pattern=[];
var user_pattern=[];
var level=0;
var started= false;


$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextPattern();
    started = true;
  }
});

$(".btn").click(function(){
  var chosen_color= $(this).attr("id");
  user_pattern.push(chosen_color);

  playSound(chosen_color);
  tap(chosen_color);

  checkAnswer(user_pattern.length-1);
});

function checkAnswer(currentLevel) {

  if (pattern[currentLevel] === user_pattern[currentLevel]) {
    if (user_pattern.length === pattern.length){
      setTimeout(function () {
        nextPattern();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    startOver();
  }
}


function nextPattern(){
  user_pattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var random= Math.floor(Math.random()*4);
  var random_color= buttons[random];
  pattern.push(random_color);

  $("#"+random_color).fadeIn(300).fadeOut(300).fadeIn(300);
  playSound(random_color);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3")
  audio.play();
}


function tap(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed");},100);
}

function startOver(){
  level=0;
  pattern=[];
  started= false;
}
