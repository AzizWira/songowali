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
      question: "Kapan Sunan Giri lahir?",
      answers: [
        { option: "Tahun 1442 M", correct: false },
        { option: "Tahun 1506", correct: false },
        { option: "Tahun 1450 M", correct: false },
        { option: "Tahun 1480 M", correct: true },
      ],
    },
    {
      question: "Dimana Sunan Giri meninggal dan dimakamkan?",
      answers: [
        { option: "Desa Kebomas Gresik", correct: false },
        { option: "Desa Giri, Kebomas Gresik", correct: true },
        { option: "Desa Banyuwangi, Jawa Timur", correct: false },
        { option: "Desa Madura, Kepulauan Madura", correct: false },
      ],
    },
    {
      question: "Apa peran Sunan Giri dalam Walisongo?",
      answers: [
        { option: "Pendiri Kerajaan Blambangan", correct: false },
        { option: "Pendiri Kerajaan Giri Kedaton", correct: true },
        { option: "Pemimpin Kerajaan Madura", correct: false },
        { option: "Anggota Kerajaan Sulawesi", correct: false },
      ],
    },
    {
      question: "Apa tujuan pembangunan Giri Kedaton oleh Sunan Giri?",
      answers: [
        { option: "Pusat perdagangan", correct: false },
        { option: "Pusat seni dan budaya", correct: false },
        { option: "Pusat penyebaran agama Islam", correct: true },
        { option: "Pusat pemerintahan", correct: false },
      ],
    },
    {
      question: "Daerah mana yang dipengaruhi oleh penyebaran Islam dari Giri Kedaton?",
      answers: [
        { option: "Sumatra, Jawa, Bali", correct: false },
        { option: "Lombok, Kalimantan, Sulawesi", correct: true },
        { option: "Papua, Maluku, Nusa Tenggara", correct: false },
        { option: "Aceh, Riau, Bangka Belitung", correct: false },
      ],
    },
    {
      question: "Apa arti nama 'Giri' yang digunakan oleh Sunan Giri?",
      answers: [
        { option: "Gunung", correct: false },
        { option: "Laut", correct: false },
        { option: "Tempat ibukota Kerajaan Blambangan saat itu", correct: true },
        { option: "Kota", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Giri menggunakan seni pertunjukan untuk menyebarkan Islam?",
      answers: [
        { option: "Hanya melalui tulisan", correct: false },
        { option: "Hanya melalui ceramah", correct: false },
        { option: "Melalui pendidikan yang dipertunjukkan di Giri Keraton", correct: true },
        { option: "Melalui pidato di tempat umum", correct: false },
      ],
    },
    {
      question: "Apa yang diselipkan oleh Sunan Giri melalui seni pertunjukan di Giri Keraton?",
      answers: [
        { option: "Ajaran seni tradisional", correct: false },
        { option: "Pedoman hidup dari ajaran Islam", correct: true },
        { option: "Cerita-cerita mitos", correct: false },
        { option: "Kode-kode rahasia", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Giri melakukan dakwah secara langsung kepada masyarakat?",
      answers: [
        { option: "Hanya melalui surat", correct: false },
        { option: "Dengan mendatangi masyarakat satu persatu", correct: true },
        { option: "Melalui media massa", correct: false },
        { option: "Melalui pesantren saja", correct: false },
      ],
    },
    {
      question: "Apa salah satu bentuk seni pertunjukan yang dikembangkan oleh Sunan Giri untuk anak-anak?",
      answers: [
        { option: "Wayang kulit", correct: false },
        { option: "Cublak-cublak suweng", correct: true },
        { option: "Kuda lumping", correct: false },
        { option: "Reog Ponorogo", correct: false },
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
      window.location.href = "../index.html";
    };
  
    if (score >= 6) {
      resultImageElement.src = "../Assets/success.svg";
      resultTextElement.textContent =
        "HEBATT!! kamu sudah cukup memahami tentang Tentang Budaya Kesenian di jepara";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "tesBudayaKesenian.html";
      };
      btnLanjut.textContent = "Coba Tentang Budaya Adat";
      btnLanjut.onclick = function () {
        window.location.href = "tesBudayaAdat.html";
      };
    } else {
      resultImageElement.src = "../Assets/failedToNextLevel.svg";
      resultTextElement.textContent =
        "Wah kamu belum cukup memahami tentang Tentang Budaya Kesenian di jepara, ayo ulangi atau coba Tentang Budaya Adat";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "tesBudayaKesenian.html";
      };
      btnLanjut.textContent = "Coba Tentang Budaya Adat";
      btnLanjut.onclick = function () {
        window.location.href = "tesBudayaAdat.html";
      };
    }
  
    conBtnResult2.innerHTML = "";
    conBtnResult.innerHTML = "";
    conBtnResult2.appendChild(btnKembali);
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
