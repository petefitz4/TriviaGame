

var panel = $('#questions');
var countStart = 20;

//Create a trivia game that shows only one question until the player answers it or their time runs out.



$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});
//When start button pressed erase the start button and begin countdown timer for 20 seconds on first question-->//
$(document).on('click', '#start', function(e) {
  $('#box').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
  game.loadQuestion();
});



//Add 10 multiple choice and/or true/false questions -->

var questions = [{
  question: "Which famous movie actress appeared on General Hospital from 1981 to 1983?",
  answers: ["Raquel Welch", "Demi Moore", "Catherine Zeta-Jones", "Halle Berry"],
  correctAnswer: "Demi Moore",
  image:"assets/images/demimoore.jpeg"
}, {
  question: "Which actress turned 16 in the movie Sixteen Candles?",
  answers: ["Ally Sheedy", "Demi Moore", "Molly Ringwald", "Joan Cusack"],
  correctAnswer: "Molly Ringwald",
  image:"assets/images/mollyringwald.jpeg"
}, {
  question: "Top Gun was a movie based of an officer kicked out of the Marines",
  answers: ["True", "False"],
  correctAnswer: "False",
  image:"assets/images/topgun.jpeg"
}, {
  question: "The movie Strange Brew had a pair of brothers named:",
  answers: ["Doug and Bob", "Bob and Dave", "Dave and Rick", "Charlie and Joe"],
  correctAnswer: "Doug and Bob",
  image:"assets/images/bobanddoug.jpeg"
},
	{
  question: "The favorite candy of ET in the movie ET: The Extraterrestial",
  answers: ["Skittles", "Jelly Belly's", "Snickers", "Reese's Pieces"],
  correctAnswer: "Reese's Pieces",
  image:"assets/images/ET.gif"
}, {
  question: "The Brat Pack included all the following except:",
  answers: ["Courtney Thorne-Smith", "Rob Lowe", "Emilio Esteves", "Mare Winningham"],
  correctAnswer: "Courtney Thorne-Smith",
  image:"assets/images/bratpack.jpeg"
}, {
  question: "The Cyberdyne Systems model name of the Terminator in the movie The Terminator is: ",
  answers: ["Cyborg T100", "Dynomator 101", "T-800 Model 101", "ASG4740"],
  correctAnswer: "T-800 Model 101",
  image:"assets/images/terminator.png"
}, {
  question: "What was Dustin Hoffman's character's first name in the movie Rain Main?",
  answers: ["Dexter", "Raynor", "Roger", "Raymond"],
  correctAnswer: "Raymond",
  image:"assets/images/raymond.jpeg"
}, {
  question: "Which character makes the winning putt at the end of the movie Caddyshack:",
  answers: ["Danny Noonan", "Carl Spackler", "Ty Webb", "Al Czervik"],
  correctAnswer: "Danny Noonan",
  image:"assets/images/dannynoonan.jpeg"
},	{
  question: "Which of the following was NOT a character name in the movie The Outsiders",
  answers: ["Ponyboy", "Steve", "Mikie", "Dally"],
  correctAnswer: "Steve",
  image:"assets/images/outsiders.jpeg"
}];


//If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStart,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },

  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStart;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
 
//If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 6 * 1000);
    } else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

//On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

    panel.html('<h2>Game Over, here are your results!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);
  //when answer is selected display whether choice is correct or incorrect
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  //If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  //display the correct answer
  //display an image of correct answer
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>You are Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStart;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
