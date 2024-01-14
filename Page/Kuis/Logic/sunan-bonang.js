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
      question: "Apa nama kecil dari Sunan Bonang?",
      answers: [
        { option: "Raden Ampel", correct: false },
        { option: "Raden Makhdum Ibrahim", correct: true },
        { option: "Arya Teja", correct: false },
        { option: "Sunan Ampel", correct: false },
      ],
    },
    {
      question: "Siapa ibu kandung Sunan Bonang?",
      answers: [
        { option: "Nyai Ageng Manila", correct: true },
        { option: "Dyah Siti Manila", correct: false },
        { option: "Nyai Ageng Arya Teja", correct: false },
        { option: "Nyai Ageng Makhdum", correct: false },
      ],
    },
    {
      question: "Apa kesenian yang digunakan Sunan Bonang sebagai media dakwah?",
      answers: [
        { option: "Wayang Kulit", correct: false },
        { option: "Reog Ponorogo", correct: false },
        { option: "Gamelan bonang", correct: true },
        { option: "Kuda Lumping", correct: false },
      ],
    },
    {
      question: "Apa yang ditonjolkan pada bagian tengah gamelan bonang?",
      answers: [
        { option: "Kuningan", correct: true },
        { option: "Kayu Lunak", correct: false },
        { option: "Besi", correct: false },
        { option: "Logam Berat", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Bonang menggunakan kesenian dalam dakwahnya?",
      answers: [
        { option: "Melalui tari tradisional", correct: false },
        { option: "Dengan menggambar mural", correct: false },
        { option: "Dengan memainkan gamelan bonang", correct: true },
        { option: "Melalui seni rupa abstrak", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi ciri khas gamelan bonang yang digunakan oleh Sunan Bonang?",
      answers: [
        { option: "Benjolan di bagian samping", correct: false },
        { option: "Benjolan di bagian tengah", correct: true },
        { option: "Ukiran artistik", correct: false },
        { option: "Warna-warni cerah", correct: false },
      ],
    },
    {
      question: "Siapa penulis buku 'Sunan Bonang Wali Keramat Karomah, Kesaktian dan Ajaran-Ajaran Hidup sang Waliullah'?",
      answers: [
        { option: "Raden Makhdum Ibrahim", correct: false },
        { option: "Asti Musman", correct: true },
        { option: "Rizem Aizid", correct: false },
        { option: "Sunan Ampel", correct: false },
      ],
    },
    {
      question: "Apa yang dijelaskan dalam buku 'Sunan Bonang Wali Keramat Karomah, Kesaktian dan Ajaran-Ajaran Hidup sang Waliullah'?",
      answers: [
        { option: "Sejarah seni rupa di Jawa", correct: false },
        { option: "Biografi Sunan Ampel", correct: false },
        { option: "Metode dakwah Sunan Bonang", correct: true },
        { option: "Sejarah kerajaan Majapahit", correct: false },
      ],
    },
    {
      question: "Apa yang dimaksud dengan pendekatan dakwah kultural yang digunakan Sunan Bonang?",
      answers: [
        { option: "Dakwah melalui media elektronik", correct: false },
        { option: "Dakwah melalui sastra", correct: false },
        { option: "Dakwah melalui kebudayaan", correct: true },
        { option: "Dakwah melalui perdebatan ilmiah", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Bonang menyebarkan agama Islam?",
      answers: [
        { option: "Melalui perang suci", correct: false },
        { option: "Dengan memaksa masyarakat", correct: false },
        { option: "Dengan memasukkan unsur-unsur Islam ke dalam budaya", correct: true },
        { option: "Melalui isolasi diri", correct: false },
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
        "HEBATT!! kamu sudah cukup memahami tentang Pengetahuan Sunan Bonang";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-bonang.html";
      };
      btnLanjut.textContent = "Kembali ke halaman utama";
      btnLanjut.onclick = function () {
        window.location.href = "../../index.html";
      };
    } else {
      resultImageElement.src = "../../Assets/pengetahuan/failedToNextLevel.svg";
      resultTextElement.textContent =
        "Wah kamu belum cukup memahami tentang Pengetahuan Sunan Bonang";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-bonang.html";
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
    card3.style.display = "flex";
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
