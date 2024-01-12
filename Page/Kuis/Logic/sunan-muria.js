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
      question: "Siapakah Ayah dari Sunan Muria?",
      answers: [
        { option: "Sunan Ngudung dan Syarifah Dewi Rahil", correct: false },
        { option: "Sunan Kalijaga dan Syarifah Dewi Rahil", correct: false },
        { option: "Sunan Ampel dan Nyai Roro Kidul", correct: false },
        { option: "Sunan Kalijaga", correct: true },
      ],
    },
    {
      question: "Apa yang menjadi spesialisasi Sunan Muria dalam bidang kesenian?",
      answers: [
        { option: "Menciptakan wayang kulit", correct: false },
        { option: "Menyusun tembang Kinanthi dan Sinom", correct: true },
        { option: "Melukis pemandangan alam", correct: false },
        { option: "Menggubah lagu-lagu populer", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Muria mengubah tradisi bancakan dan tumpeng dalam masyarakat Jawa?",
      answers: [
        { option: "Menghilangkan tradisi tersebut", correct: false },
        { option: "Menjadikan tradisi sebagai kenduri dan mengirim doa kepada leluhur", correct: true },
        { option: "Menggantikan dengan ritual Islam", correct: false },
        { option: "Melakukan upacara seremonial tanpa makna", correct: false },
      ],
    },
    {
      question: "Apa yang dilakukan Sunan Muria terkait tradisi syukuran di Colo Muria?",
      answers: [
        { option: "Membuat tradisi menjadi lebih sederhana", correct: false },
        { option: "Menghapuskan tradisi syukuran", correct: false },
        { option: "Menghormati dan mensyukuri alam dengan tradisi syukuran", correct: true },
        { option: "Membuat tradisi syukuran hanya untuk masyarakat tertentu", correct: false },
      ],
    },
    {
      question: "Mengapa masyarakat Colo masih mempraktikkan pantangan bekerja setiap Kamis Legi?",
      answers: [
        { option: "Sunan Muria tidak mengajarkan pantangan tersebut", correct: false },
        { option: "Hanya karena tradisi lama", correct: false },
        { option: "Agar mendapatkan malapetaka", correct: false },
        { option: "Untuk menghormati Sunan Muria dan mencegah hal yang tidak baik", correct: true },
      ],
    },
    {
      question: "Apa yang menjadi tujuan tradisi Colo Muria yang dilaksanakan oleh masyarakat setempat?",
      answers: [
        { option: "Menghibur masyarakat sekitar Muria", correct: false },
        { option: "Memperingati kematian Sunan Muria", correct: false },
        { option: "Menghormati dan mensyukuri apa yang ada di bumi", correct: true },
        { option: "Hanya sebagai upacara adat tanpa tujuan tertentu", correct: false },
      ],
    },
    {
      question: "Apa yang dilakukan Sunan Muria terkait pantangan bekerja setiap Kamis Legi?",
      answers: [
        { option: "Menghukum orang yang melanggar pantangan", correct: false },
        { option: "Mengubah pantangan menjadi sesuatu yang positif", correct: false },
        { option: "Memberikan doa dan selamatan agar terhindar dari malapetaka", correct: true },
        { option: "Membuat aturan baru yang tidak melibatkan ziarah ke makam Sunan Muria", correct: false },
      ],
    },
    {
      question: "Apa yang dihasilkan Sunan Muria dalam bidang kesenian yang terkenal?",
      answers: [
        { option: "Menyanyikan lagu-lagu populer", correct: false },
        { option: "Menciptakan wayang kulit", correct: false },
        { option: "Membuat tembang Kinanthi dan Sinom", correct: true },
        { option: "Menari dalam pertunjukan seni tradisional", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi warisan Sunan Muria terkait lingkungan?",
      answers: [
        { option: "Menggubah tembang-tembang tradisional", correct: false },
        { option: "Menanam pohon-pohon hias di sekitar makamnya", correct: false },
        { option: "Melestarikan lingkungan dengan menciptakan situs yang dikeramatkan", correct: true },
        { option: "Tidak ada kontribusi khusus terkait lingkungan", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Muria berkontribusi dalam menjalankan dakwah Islam di daerah Jepara, Tayu, Juwana, dan sekitar Kudus?",
      answers: [
        { option: "Dengan melakukan kekerasan", correct: false },
        { option: "Melalui pendekatan budaya, seperti pertunjukan wayang", correct: true },
        { option: "Dengan menghilangkan tradisi lama", correct: false },
        { option: "Tidak berkontribusi dalam dakwah Islam", correct: false },
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
      resultImageElement.src = "../Assets/success.svg";
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
      resultImageElement.src = "../Assets/failedToNextLevel.svg";
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
