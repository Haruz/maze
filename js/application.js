// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery
//= require jquery_ujs

  
   
  //var w = window.open('map.txt').toString('utf-8');
  //console.log(w);
  console.log("pandas eat children");
  function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                var textnode = document.createTextNode(allText);
                document.getElementById("maze").innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}
readTextFile("map.txt");


function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.toString = function() {
  return this.x + ":" + this.y;
};

function MazeGod() {
 

  this.mazeContainer = document.getElementById("maze");
  this.mazeOutputDiv = document.getElementById("maze_data");
  this.mazeMessage   = document.getElementById("maze_message");
  this.mazeScore     = document.getElementById("maze_score");
  this.heroScore     =  0;

  this.maze = [];
  this.heroPos = {};
  this.redDoor = false;
  this.redAnswer = false;
  this.blueDoor = false;
  this.greenDoor = false;
  this.purpleDoor = false;
  this.blueAnswer = false;
  this.greenAnswer = false;
  this.purpleAnswer = false;
  this.heroHasSword = false;
  this.heroHasGun = false;
  this.heroHasSpoon = false;
  this.heroHasKnife = false;
  this.childMode = false;
  var diceRoll = Math.random().toFixed(2);
      console.log(diceRoll);
  for(i=0; i < this.mazeContainer.children.length; i++) {
    for(j=0; j < this.mazeContainer.children[i].children.length; j++) {
      var el =  this.mazeContainer.children[i].children[j];
      this.maze[new Position(i, j)] = el;

  
      if (diceRoll >= 0.75){
        if(el.classList.contains("entrance-1")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }else if (diceRoll >= 0.50 && diceRoll < 0.75){
      if(el.classList.contains("entrance-2")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }}else if (diceRoll >= 0.25 && diceRoll < 0.50){ 
        if(el.classList.contains("entrance-3")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }}else if (diceRoll < 0.25){ 
        if(el.classList.contains("entrance-4")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }
    }
  }

  this.mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
  this.setMessage("Pick up a weapon");


  this.keyPressHandler = this.charactermove.bind(this);
  document.addEventListener("keydown", this.keyPressHandler, false);
}

MazeGod.prototype.setMessage = function(text) {
  this.mazeMessage.innerHTML = text;
  this.mazeScore.innerHTML = this.heroScore;
};

MazeGod.prototype.heroTakeGold = function() {
  this.maze[this.heroPos].classList.remove("gold");
  this.heroScore += 10;
  this.setMessage("yay, money!");
};

MazeGod.prototype.heroTakeKey = function() {
  this.maze[this.heroPos].classList.remove("key");
  this.heroHasKey = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-key");
  this.setMessage("you have the key!");
};

MazeGod.prototype.heroTakeSword = function() {
  this.maze[this.heroPos].classList.remove("sword");
  //document.getElementsByClassName("red-door").classList.add("trap-door");
  //document.getElementsByClassName("red-door").classList.remove("red-door");
  
  this.heroHasSword = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-sword");
  this.setMessage("you have the sword of ziggaro!");
};

MazeGod.prototype.heroTakeSpoon = function() {
  this.maze[this.heroPos].classList.remove("spoon");
  this.heroHasSpoon = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-spoon");
  this.setMessage("you got a spoon!");
};

MazeGod.prototype.heroTakeKnife = function() {
  this.maze[this.heroPos].classList.remove("knife");
  this.heroHasKnife = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-knife");
  this.setMessage("you got a sharp knife!");
};

MazeGod.prototype.heroTakeGun = function() {
  this.maze[this.heroPos].classList.remove("gun");
  this.heroHasGun = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-gun");
  this.setMessage("it's a gun...");
};

MazeGod.prototype.heroKillDragon = function() {
  this.maze[this.heroPos].classList.remove("dragon");
  this.redDoor = true;
  this.heroScore += 40;
  this.setMessage("you killed the dragon!");
};
MazeGod.prototype.heroKillCake = function() {
  this.maze[this.heroPos].classList.remove("cake");
  this.purpleDoor = true;
  this.heroScore += 40;
  this.setMessage("you killed the cake!");
};
MazeGod.prototype.heroKillVampire = function() {
  this.maze[this.heroPos].classList.remove("vampire");
  this.greenDoor = true;
  this.heroScore += 40;
  this.setMessage("you killed the vampie!");
};
MazeGod.prototype.heroKillBear = function() {
  this.maze[this.heroPos].classList.remove("bear");
  this.blueDoor = true;
  this.heroScore += 40;
  this.setMessage("you killed the bear!");
};

MazeGod.prototype.gameOver = function(text) {

  document.removeEventListener("keydown", this.keyPressHandler, false);
  this.setMessage(text);
  this.mazeContainer.classList.add("finished");
};

MazeGod.prototype.heroWins = function() {
  this.heroScore += 100;
  this.gameOver("you saved the day !!!");
};

MazeGod.prototype.tryMoveHero = function(pos) {
  var nextStep = this.maze[pos].className;


  if(nextStep.match(/dragon/)) {

    if(this.heroHasSword) {
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
      var questions = [
  ["How will you fight the dragon\n1) slash it's head off\n2) stab it in the heart\n3) slap it with the sword", 1]];
  var answer;
function print(message) {
   document.getElementById('output').innerHTML = message;

}
function buildList(arr) {
 var listHTML = '<ol>';
  for (var i = 0; i < arr.length; i += 1) {
    listHTML += '<li>' + arr[i] + '</li>';
  }
  listHTML += '</ol>';
  return listHTML;
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    this.redAnswer = true;
  } else {
    //wrong.push(question);
    //var right-answer = false;
  }
};
    if(this.redAnswer){
      this.heroKillDragon();
    return;
            } 
  else {
    this.heroScore = Math.max(this.heroScore - 5, 0);
      this.setMessage("the dragon slapped me!");
    }
    return;
  }
}
  if(nextStep.match(/bear/)) {
    //this.heroScore = Math.max(this.heroScore - 5, 0);
    if(this.heroHasKnife) {
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
      var questions = [
  ["How will you fight the bear\n1) cut it open\n2) cut and eye\n3) put the knife down it's just a stuffed animal", 3]];
  var answer;
function print(message) {
   document.getElementById('output').innerHTML = message;

}
function buildList(arr) {
 var listHTML = '<ol>';
  for (var i = 0; i < arr.length; i += 1) {
    listHTML += '<li>' + arr[i] + '</li>';
  }
  listHTML += '</ol>';
  return listHTML;
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    this.blueAnswer = true;
  } else {
    //wrong.push(question);
    //var right-answer = false;
  }
};
    if(this.blueAnswer){
      this.heroKillBear();
    return;
            } 
  else {
    this.heroScore = Math.max(this.heroScore - 5, 0);
      this.setMessage("bear hugged you!");
    }
    return;
  }
}
  if(nextStep.match(/vampire/)) {
    //this.heroScore = Math.max(this.heroScore - 5, 0);
    if(this.heroHasGun) {
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
      var questions = [
  ["How will you fight the vampie\n1) shoot with normal bullet\n2) give it a hug\n3) shoot with silver bullet", 3]];
  var answer;
function print(message) {
   document.getElementById('output').innerHTML = message;

}
function buildList(arr) {
 var listHTML = '<ol>';
  for (var i = 0; i < arr.length; i += 1) {
    listHTML += '<li>' + arr[i] + '</li>';
  }
  listHTML += '</ol>';
  return listHTML;
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    this.greenAnswer = true;
  } else {
    //wrong.push(question);
    //var right-answer = false;
  }
};
    if(this.greenAnswer){
      this.heroKillVampire();
    return;
            } 
  else {
    this.heroScore = Math.max(this.heroScore - 5, 0);
      this.setMessage("vampire backhanded you!");
    }
    return;
  }
}
  if(nextStep.match(/cake/)) {
    //this.heroScore = Math.max(this.heroScore - 5, 0);
    if(this.heroHasSpoon) {
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
      var questions = [
  ["How will you fight the cake\n1) eat it \n2) admit it's a lie....\n3) smell it", 2]];
  var answer;
function print(message) {
   document.getElementById('output').innerHTML = message;

}
function buildList(arr) {
 var listHTML = '<ol>';
  for (var i = 0; i < arr.length; i += 1) {
    listHTML += '<li>' + arr[i] + '</li>';
  }
  listHTML += '</ol>';
  return listHTML;
}

for (var i = 0; i < questions.length; i += 1) {
  question = questions[i][0];
  answer = questions[i][1];
  response = prompt(question);
  response = parseInt(response);
  if (response === answer) {
    this.blueAnswer = true;
  } else {
    //wrong.push(question);
    //var right-answer = false;
  }
};
    if(this.blueAnswer){
      this.heroKillCake();
    return;
            } 
  else {
    this.heroScore = Math.max(this.heroScore - 5, 0);
      this.setMessage("the cake threw sprinkles!");
    }
    return;
  }
}

if(nextStep.match(/red-door/)) {
    //this.heroScore = Math.mededededededax(this.heroScore - 5, 0);
    if(this.greenDoor || this.redDoor || this.purpleDoor || this.blueDoor ) {
      if (this.heroHasSword && this.redDoor){
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }else if (this.heroHasSword === false && this.redDoor === false){
    this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }
else if(this.heroHasSword && this.redDoor === false){
    this.setMessage("The dragon will not let you leave now! slay it!");
    } else {
      this.setMessage("damn the key is in the dragon!");
    }
    }
    return;
  }

   if(nextStep.match(/green-door/)) {
    //this.heroScore = Math.mededededededax(this.heroScore - 5, 0);
    if(this.greenDoor || this.redDoor || this.purpleDoor || this.blueDoor ) {
      if (this.heroHasGun && this.greenDoor){
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }else if (this.heroHasGun === false && this.greenDoor === false){
    this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }
else if(this.heroHasGun && this.greenDoor === false){
    this.setMessage("The vampire is looking at you!");
    } else {
      this.setMessage("damn the key is in the vampire!");
    }
    }
    return;
  }
      if(nextStep.match(/blue-door/)) {
    //this.heroScore = Math.mededededededax(this.heroScore - 5, 0);
    if(this.greenDoor || this.redDoor || this.purpleDoor || this.blueDoor ) {
      if (this.heroHasKnife && this.blueDoor){
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }else if (this.heroHasKnife === false && this.blueDoor === false){
    this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }
else if(this.heroHasKnife && this.blueDoor === false){
    this.setMessage("afraid of a bear??!");
    } else {
      this.setMessage("damn the key is in the bear!");
    }
    }
    return;
  }
    if(nextStep.match(/purple-door/)) {
    //this.heroScore = Math.mededededededax(this.heroScore - 5, 0);
    if(this.greenDoor || this.redDoor || this.purpleDoor || this.blueDoor ) {
      if (this.heroHasSpoon && this.purpleDoor){
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }else if (this.heroHasSpoon === false && this.purpleDoor === false){
    this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }
else if(this.heroHasSpoon && this.purpleDoor === false){
    this.setMessage("the cake will stop you!");
    } else {
      this.setMessage("damn the key is in the cake!");
      //console.log(this.heroHasSpoon);
      console.log(this.purpleDoor);
    }
    }
    return;
  }
  if(nextStep.match(/mega-door/)) {
    //this.heroScore = Math.mededededededax(this.heroScore - 5, 0);
    if(this.greenDoor && this.redDoor && this.purpleDoor && this.blueDoor ) {
      this.maze[this.heroPos].classList.remove("hero");
      this.maze[pos].classList.add("hero");
      this.heroPos = pos;
    return;
  }else {
    this.setMessage("you need to beat all the monsters first!");
    return;
    }
  }
  if(nextStep.match(/wall/)) {
    return;
  }
  if(nextStep.match(/princess/)) {
      this.heroWins();
  
  }


  this.maze[this.heroPos].classList.remove("hero");
  this.maze[pos].classList.add("hero");
  this.heroPos = pos;

  // after moving onto new div
  if(nextStep.match(/gold/)) {
    this.heroTakeGold();
    return;
  }
  if(nextStep.match(/sword/)) {
    this.heroTakeSword();
    return;
  }
    if(nextStep.match(/spoon/)) {
    this.heroTakeSpoon();
    return;
  }
    if(nextStep.match(/gun/)) {
    this.heroTakeGun();
    return;
  }
    if(nextStep.match(/knife/)) {
    this.heroTakeKnife();
    return;
  }
  if(nextStep.match(/exit/)) {
    return;
  }
  // if(this.heroScore >= 1) {
  //   if(!this.childMode) {
  //     this.heroScore--;
  //   }
  //   if(!this.childMode && this.heroScore <= 0) {
  //     this.gameOver("sorry, you didn't make it");
  //   } else {
  //     this.setMessage("...");
  //   }
  //}
};

MazeGod.prototype.charactermove = function(e) {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  switch(e.keyCode)
  {
    case 37: // left
      this.mazeContainer.classList.remove("face-right");
      tryPos.y--;
      break;

    case 38: // up
      tryPos.x--;
      break;

    case 39: // right
      this.mazeContainer.classList.add("face-right");
      tryPos.y++;
      break;

    case 40: // down
      tryPos.x++;
      break;

    default:
      return;

  }
  this.tryMoveHero(tryPos);
  e.preventDefault();
};
