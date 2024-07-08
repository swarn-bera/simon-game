var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var buttonColours = ["red","blue","green","yellow"];

function newSequence(){

    userClickedPattern=[];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour =  buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+ randomChosenColour).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    $("#level-title").html("Level " + level);
    level++;
    
}

$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var sound = new Audio('sounds/'+ name +'.mp3');
    sound.play();
    
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}

var i=0;

$(document).keypress(function(){
    
        if(i === 0){
            newSequence();
            i++;
        }
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
    
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                newSequence();
            }, 1000)
        } 
    }
    else{
        console.log("wrong");
        var reset=1;
        var soundd = new Audio("sounds/wrong.mp3")
        soundd.play();

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);

        $("h1").html("Game Over, Press Any Key to Restart");
        startOver(reset);
    }
}

function startOver(tatti){
    if(tatti === 1){
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        i = 0;
        tatti = 0;
}}
