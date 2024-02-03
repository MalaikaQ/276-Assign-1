const questions = [
    {
      question: '1. What is the capital of France?',
      choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      question: '2. Which planet is known as the Red Planet?',
      choices: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars'
    },
    {
      question: "3. What is the color of the sky?",
      choices: ["Pink", "Blue", "Green", "Grey"],
      correctAnswer: "Blue"
    },
    {
      question: "4. Which animal is the tallest in the world?",
      choices: ["Giraffe", "Cat", "Elephant", "Mouse"],
      correctAnswer: "Giraffe"
    },
    {
      question: "5. How many sides does a triangle have?",
      choices: ["2", "7", "5", "3"],
      correctAnswer: "3"
    },
    {
      question: "6. How many days are in the month of April?",
      choices: ["30", "31", "29", "28"],
      correctAnswer: "30"
    },
    {
      question: "7. What continent is the largest?",
      choices: ["North America", "Australia", "Asia", "Europe"],
      correctAnswer: "Asia"
    }
  ];
  
  let currentQuestion = 0;
  let userAnswers = [];
  
  const questionText = document.getElementById('question-text');
  const choicesList = document.getElementById('choices-list');
  const prevBtn = document.getElementById('prev-button');
  const nextBtn = document.getElementById('next-button');
  const submitBtn = document.getElementById('submit-button');
  const resultsContainer = document.getElementById('results-container');
  const scoreText = document.getElementById('score-text');
  const correctAnswersList = document.getElementById('correct-answers-list');
  
  function showQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionText.textContent = currentQuestionData.question;
  
    choicesList.innerHTML = '';
    currentQuestionData.choices.forEach((choice, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = choice;
      listItem.addEventListener('click', () => selectAnswer(index)); 
      if (typeof userAnswers[currentQuestion] !== 'undefined' && userAnswers[currentQuestion] === index) {
      listItem.classList.add('selected', 'highlighted');
    }
      choicesList.appendChild(listItem);

    });
    updateNavigationButtons();
  }
  
  function selectAnswer(choiceIndex) {
    userAnswers[currentQuestion] = choiceIndex;
    showQuestion();
  }
  
  function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === questions.length - 1;
  }
  
  function showResults() {
    let score = 0;
    correctAnswersList.innerHTML = '';
  
    questions.forEach((question, index) => {
      const userChoice = userAnswers[index];
      const listItem = document.createElement('li');
      const isCorrect = userChoice === question.choices.indexOf(question.correctAnswer);
  
      listItem.textContent = `Question ${index + 1}: ${question.choices[userChoice]}`;
      listItem.classList.add(isCorrect ? 'correct' : 'incorrect');
      correctAnswersList.appendChild(listItem);
      listItem.innerHTML += ` <strong style="color: black;"> (Correct Answer: ${question.correctAnswer})</strong>`;
 
      if (isCorrect) {
        score++;
      }
    });
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
    resultsContainer.classList.remove('hidden');
  }
  
  prevBtn.addEventListener('click', () => {
    currentQuestion--;
    showQuestion();
  });
  
  nextBtn.addEventListener('click', () => {
    if (typeof userAnswers[currentQuestion] === 'undefined') {
      alert('Please select an answer before moving to the next question.');
      return; 
    }
    currentQuestion++;
    showQuestion();
  });
  
  submitBtn.addEventListener('click', showResults);

  showQuestion();
  