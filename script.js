var questions = [
    {
      question: "What is 2*5?",
      choices: [2, 5, 10, 15, 20],
      correctAnswer: 2
    },
    {
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4
    },
    {
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0
    },
    {
      question: "What is 1*7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3
    },
    {
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }
  ];
  
  var questionCounter = 0; // Tracks question number
  var selections = []; // Array containing user choices
  var quiz = document.getElementById('quiz'); // Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  document.getElementById('next').addEventListener('click', function (e) {
    e.preventDefault();
  
    // Suspend click listener during fade animation
    if (quiz.style.display === 'none') {
      return false;
    }
  
    if (!hasUserSelected()) {
      alert('Please make a selection!');
      return;
    }
  
    choose();
    questionCounter++;
    if (questionCounter < questions.length) {
      displayNext();
    } else {
      displayScore();
    }
  });
  
  // Click handler for the 'prev' button
  document.getElementById('prev').addEventListener('click', function (e) {
    e.preventDefault();
  
    if (quiz.style.display === 'none') {
      return false;
    }
  
    choose();
    if (questionCounter > 0) {
      questionCounter--;
      displayNext();
    }
  });
  
  // Click handler for the 'Start Over' button
  document.getElementById('start').addEventListener('click', function (e) {
    e.preventDefault();
  
    if (quiz.style.display === 'none') {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    document.getElementById('start').style.display = 'none';
  });
  
  // Animates buttons on hover
  var buttons = document.getElementsByClassName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', function () {
      this.classList.add('active');
    });
    buttons[i].addEventListener('mouseleave', function () {
      this.classList.remove('active');
    });
  }
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = document.createElement('div');
    qElement.id = 'question';
  
    var header = document.createElement('h2');
    header.textContent = 'Question ' + (index + 1) + ':';
    qElement.appendChild(header);
  
    var question = document.createElement('p');
    question.appendChild(document.createTextNode(questions[index].question));
    qElement.appendChild(question);
  
    var radioButtons = createRadios(index);
    qElement.appendChild(radioButtons);
  
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = document.createElement('ul');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = document.createElement('li');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.innerHTML = input;
      radioList.appendChild(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +document.querySelector('input[name="answer"]:checked').value;
  }
  
  // Checks if the user has made a selection
  function hasUserSelected() {
    var selectedRadio = document.querySelector('input[name="answer"]:checked');
    return selectedRadio !== null;
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.style.display = 'none';
  
    if (questionCounter < questions.length) {
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.innerHTML = '';
      quiz.appendChild(nextQuestion);
      if (!(isNaN(selections[questionCounter])) && selections[questionCounter] !== undefined) {
        var selectedRadio = document.querySelector('input[value="' + selections[questionCounter] + '"]');
        if (selectedRadio) {
          selectedRadio.checked = true;
        }
      }
  
      // Controls display of 'prev' button
      if (questionCounter === 0) {
        document.getElementById('prev').style.display = 'none';
        document.getElementById('next').style.display = 'block';
      } else {
        document.getElementById('prev').style.display = 'block';
        document.getElementById('next').style.display = 'block';
      }
    } else {
      if (quiz.style.display !== 'none') {
        displayScore();
      }
    }
  
    quiz.style.display = 'block';
  }
  
 

// Computes score and returns a paragraph element to be displayed
function displayScore() {
    quiz.style.display = 'none';

    var score = document.createElement('p');
    score.id = 'question';

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.innerHTML = 'You got ' + (numCorrect) + ' questions out of ' +
      questions.length + ' right!!!'; // Exclude the last question
    quiz.innerHTML = '';
    quiz.appendChild(score);
    document.getElementById('next').style.display = 'none';
    document.getElementById('prev').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    quiz.style.display = 'block';
}

    

