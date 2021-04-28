var gamePattern=[];
var buttonColor=["green","red","yellow","blue"];
var userClickedPattern = [];
var gameOver=false;
var level=0;
var gameStarted=0;
var refreshed=0;
$(".btn").click(function(){

    if(refreshed===0)
    alert("please start the game !");
    else if(gameOver){
      alert("Please restart the game !");
    }
    else{

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});



$(document).keypress(function(event){

      if(refreshed===0)
      refreshed=1;
      gameOver=false;
      if(gameStarted===0){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStarted=1;
      }

});

function checkAnswer(currentLevel){


  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

      if(userClickedPattern.length===gamePattern.length){
      setTimeout(function () {

        nextSequence();
      }, 1000); }
  }
  else{

    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameOver=true;
    startOver();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }


}

function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);

  var randomChosenColor=buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function playSound(buttonClicked){

  var audio=new Audio("sounds/"+buttonClicked+".mp3");
  audio.play();

}

function animatePress(currentColor){

   $("."+currentColor).addClass("pressed");
   setTimeout(function () {
     $("."+currentColor).removeClass("pressed");
   }, 100);
}

function startOver(){

  gameStarted=0;
  gamePattern=[];
  level=0;

}
