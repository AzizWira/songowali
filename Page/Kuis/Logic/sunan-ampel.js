let currentQuestion = 0;
let score = 0;
let wrongAnswer = 0;
let unansweredQuestions = 0;
let timer; // Variable to store the timer
const questionarea = document.getElementById("question-area");
const card1 = document.getElementById("card-1");
const card2 = document.getElementById("card-2");
const card3 = document.getElementById("card-3");

let questions = [
    {
      question: "Apa nama lain yang lebih dikenal untuk Sunan Ampel pada masa kecilnya?",
      answers: [
        { option: "Raden Rahmat", correct: true },
        { option: "Moh Main", correct: false },
        { option: "Moh Maling", correct: false },
        { option: "Moh Madon", correct: false },
      ],
    },
    {
      question: "Di mana Sunan Ampel lahir dan diperkirakan tutup usia?",
      answers: [
        { option: "Demak", correct: false },
        { option: "Campa", correct: true },
        { option: "Surabaya", correct: false },
        { option: "Ampel Denta", correct: false },
      ],
    },
    {
      question: "Apa filsafat metode Moh Limo yang dimiliki Sunan Ampel?",
      answers: [
        { option: "Tidak ingin berjudi, tidak mau mabuk, tidak mencuri, tidak menggunakan narkotika, tidak berzinah", correct: true },
        { option: "Tidak berjudi, tidak mau mabuk, tidak mencuri, tidak berdzikir, tidak berpuasa", correct: false },
        { option: "Tidak ingin bermain, tidak suka berbincang, tidak mau mabuk, tidak mencuri", correct: false },
        { option: "Tidak bermain judi, suka mabuk, suka mencuri, suka menghisap candu, suka berzinah", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi wilayah Ampel yang terkenal dengan nama tempat tinggal Sunan Ampel?",
      answers: [
        { option: "Ampel Denta", correct: true },
        { option: "Demak", correct: false },
        { option: "Campa", correct: false },
        { option: "Surabaya", correct: false },
      ],
    },
    {
      question: "Ajaran Moh Limo yang dianut Sunan Ampel merupakan penolakan terhadap hal-hal yang termasuk dalam lima hal tercela. Apa yang dimaksud dengan 'Moh Maling'?",
      answers: [
        { option: "Tidak ingin bermain", correct: false },
        { option: "Tidak mau mencuri", correct: true },
        { option: "Tidak suka mabuk", correct: false },
        { option: "Tidak ingin berjudi", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi dasar dakwah Sunan Ampel kepada orang-orang?",
      answers: [
        { option: "Dasar aqidah dan ibadah", correct: true },
        { option: "Dasar bermain dan bersenang-senang", correct: false },
        { option: "Dasar mencuri dan berzina", correct: false },
        { option: "Dasar mabuk-mabukan dan menghisap candu", correct: false },
      ],
    },
    {
      question: "Manakah yang merupakan salah satu prinsip dalam ajaran Sunan Ampel menurut fikih Mahzab Hanafi?",
      answers: [
        { option: "Moh Main", correct: false },
        { option: "Moh Madon", correct: true },
        { option: "Moh Madat", correct: false },
        { option: "Moh Ngombe", correct: false },
      ],
    },
    {
      question: "Di mana letak makam Sunan Ampel?",
      answers: [
        { option: "Campa", correct: false },
        { option: "Demak", correct: false },
        { option: "Ampel Denta", correct: true },
        { option: "Surabaya", correct: false },
      ],
    },
    {
      question: "Apa yang identik dengan nama tempat tinggal Sunan Ampel?",
      answers: [
        { option: "Demak", correct: false },
        { option: "Ampel Denta", correct: true },
        { option: "Surabaya", correct: false },
        { option: "Campa", correct: false },
      ],
    },
    {
      question: "Manakah yang bukan merupakan ajaran Moh Limo Sunan Ampel?",
      answers: [
        { option: "Tidak bermain judi", correct: true },
        { option: "Tidak suka mabuk", correct: false },
        { option: "Tidak menggunakan narkotika", correct: false },
        { option: "Suka mencuri", correct: false },
      ],
    },
];
  
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function highlightCorrectAnswer() {
  const correctOptionIndex = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );
  const correctButton = document.querySelector(
    `#option${correctOptionIndex + 1}`
  );
  correctButton.classList.add("correct");
}

shuffleArray(questions);

function highlightCorrectAnswerNotAnswer() {
  const correctOptionIndex = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );
  const correctButton = document.querySelector(
    `#option${correctOptionIndex + 1}`
  );
  correctButton.classList.add("overtime");
}

function highlightinCorrectAnswer(isCorrect, selectedOption) {
  const correctOptionIndexTrue = questions[currentQuestion].answers.findIndex(
    (answer) => answer.correct === true
  );

  const correctButtonTrue = document.querySelector(
    `#option${correctOptionIndexTrue + 1}`
  );

  correctButtonTrue.classList.add("correct");

  if (!isCorrect) {
    const selectedButton = document.querySelector(
      `#option${selectedOption + 1}`
    );
    selectedButton.classList.add("incorrect");
  }
}

function startTimer(duration, display) {
  clearInterval(timer); // Menghentikan timer sebelumnya (jika ada)

  let start = Date.now(),
    diff,
    hours,
    minutes,
    seconds;

  function updateTimer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);

    hours = Math.floor((diff / 3600) % 24);
    minutes = Math.floor((diff / 60) % 60);
    seconds = Math.floor(diff % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (diff <= 0) {
      handleUnansweredQuestions();
      selectAnswer(false, undefined); // Panggil fungsi selectAnswer dengan jawaban salah
    }
  }

  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function loadQuestion() {
  let question = questions[currentQuestion];
  let indexQuestion = document.getElementById("index-question");
  let questionElement = document.getElementById("question");
  let answersElement = document.getElementById("answers");
  const timerDisplay = document.getElementById("timer");

  const answerLetters = ["A", "B", "C", "D"];
  
  indexQuestion.innerHTML = `Soal ${currentQuestion + 1} / ${questions.length}`;
  questionElement.innerHTML = question.question;
  answersElement.innerHTML = "";

  startTimer(30, timerDisplay); // set waktu

  // Shuffle the order of answer options
  shuffleArray(question.answers);

  questionarea.classList.add("fade-in");

  for (let i = 0; i < question.answers.length; i++) {
    answersElement.innerHTML += `
        <button id="option${i + 1}" class="btn" onclick="selectAnswer(${
      question.answers[i].correct
    }, ${i})">
          <span>${answerLetters[i]}</span><span>${
      question.answers[i].option
    }</span>
        </button>
      `;
  }
}

function selectAnswer(isCorrect, selectedOption) {
  clearInterval(timer);

  if (selectedOption === undefined) {
    highlightCorrectAnswerNotAnswer();
    wrongAnswer++;
  } else if (selectedOption !== undefined && !isCorrect) {
    highlightinCorrectAnswer(isCorrect, selectedOption);
    wrongAnswer++;
  } else if (selectedOption !== undefined && isCorrect) {
    highlightCorrectAnswer();
    score++;
  }

  disableButtons();

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      handleUnansweredQuestions();
      displayResult();
    }
  }, 1500);
}

function disableButtons() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function displayResult() {
    clearInterval(timer);
  
    const scoreElement = document.getElementById("score");
    const wrongAnswersElement = document.getElementById("wrongAnswers");
    const resultImageElement = document.getElementById("resultImage");
    const resultTextElement = document.querySelector(".text-result p");
  
    scoreElement.textContent = score;
    wrongAnswersElement.textContent = wrongAnswer;
  
    const popupResult = document.getElementById("popup-result");
    const conBtnResult = document.querySelector(".con-btn-result");
    const conBtnResult2 = document.querySelector(".con-btn-result2");
    const btnKembali = document.createElement("button");
    const btnLanjut = document.createElement("button");
    const btnUlangi = document.createElement("button");
  
    btnKembali.textContent = "Kembali ke halaman utama";
    btnKembali.onclick = function () {
      window.location.href = "../../index.html";
    };
  
    if (score >= 6) {
      resultImageElement.src = "../../Assets/pengetahuan/success.svg";
      resultTextElement.textContent =
        "HEBATT!! kamu sudah cukup memahami tentang Pengetahuan Sunan Muria";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-muria.html";
      };
      btnLanjut.textContent = "Kembali ke halaman utama";
      btnLanjut.onclick = function () {
        window.location.href = "../../index.html";
      };
    } else {
      resultImageElement.src = "../../Assets/pengetahuan/failedToNextLevel.svg";
      resultTextElement.textContent =
        "Wah kamu belum cukup memahami tentang Pengetahuan Sunan Muria";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-muria.html";
      };
      btnLanjut.textContent = "Kembali ke halaman utama";
      btnLanjut.onclick = function () {
        window.location.href = "../../index.html";
      };
    }
  
    conBtnResult2.innerHTML = "";
    conBtnResult.innerHTML = "";
    // conBtnResult2.appendChild(btnKembali);
    conBtnResult.appendChild(btnLanjut);
    conBtnResult.appendChild(btnUlangi);
  
    popupResult.style.display = "block";
    questionarea.style.display = "none";
    card2.style.display = "none";
    card3.style.display = "flex";
  }

function submitQuiz() {
  displayResult();
}

function handleUnansweredQuestions() {
  if (!timer) {
    unansweredQuestions += questions.length - currentQuestion;
  }
}

window.addEventListener("unload", handleUnansweredQuestions);

setTimeout(() => {
  loadQuestion();
  card1.style.display = "none";
  card2.style.display = "flex";
}, 15000);
