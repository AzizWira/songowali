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
      question: "Siapa nama asli Sunan Kudus dan siapa orangtuanya?",
      answers: [
        { option: "Ja'far Shadiq, putra Sunan Bonang dan Dewi Sartika", correct: false },
        { option: "Abdul Qadir, putra Sunan Ampel dan Kiai Telingsing", correct: false },
        { option: "Raden Utsman Haji, putra Sunan Ngundung dan Syarifah Dewi Rahil", correct: true },
        { option: "Muhammad Fakih, putra Sunan Kudus dan Dewi Ratih", correct: false },
      ],
    },
    {
      question: "Bagaimana Raden Utsman Haji, ayah Sunan Kudus, gugur dalam pertempuran melawan Adipati Terung dari Majapahit?",
      answers: [
        { option: "Sunan Ngudung menyerah tanpa melibatkan Raden Utsman Haji", correct: false },
        { option: "Sunan Ngudung menggantikan posisi ayahnya sebagai senopati Demak", correct: false },
        { option: "Raden Utsman Haji gugur dalam pertempuran melawan Adipati Terung", correct: true },
        { option: "Pertempuran tidak melibatkan ayah Sunan Kudus", correct: false },
      ],
    },
    {
      question: "Apa versi yang dianggap paling rasional mengenai asal usul Sunan Kudus?",
      answers: [
        { option: "Sunan Kudus berasal dari Persia", correct: false },
        { option: "Sunan Kudus adalah keturunan langsung Husain bin Ali", correct: false },
        { option: "Sunan Kudus adalah cucu Sunan Bonang dan keturunan langsung dari Husain bin Ali", correct: true },
        { option: "Semua jawaban benar", correct: false },
      ],
    },
    {
      question: "Apa strategi utama Sunan Kudus dalam dakwah Islam?",
      answers: [
        { option: "Menggunakan kekerasan sebagai metode utama", correct: false },
        { option: "Melakukan pendekatan kebudayaan dan massa", correct: true },
        { option: "Menghindari interaksi dengan masyarakat lokal", correct: false },
        { option: "Tidak memperhatikan kepercayaan masyarakat setempat", correct: false },
      ],
    },
    {
      question: "Mengapa Sunan Kudus melarang menyembelih sapi?",
      answers: [
        { option: "Untuk menunjukkan kekuatan Islam", correct: false },
        { option: "Menghormati kepercayaan umat Buddha", correct: false },
        { option: "Menghargai kepercayaan umat Hindu bahwa sapi merupakan hewan suci", correct: true },
        { option: "Tanpa alasan yang jelas", correct: false },
      ],
    },
    {
      question: "Apa yang dilakukan Sunan Kudus terkait pembangunan menara layaknya candi?",
      answers: [
        { option: "Menunjukkan kekuatan Islam secara fisik", correct: false },
        { option: "Menara tersebut hanya sebagai tempat pemakaman raja", correct: false },
        { option: "Menyesuaikan dengan budaya setempat untuk lebih diterima", correct: true },
        { option: "Menara tersebut tidak memiliki tujuan khusus", correct: false },
      ],
    },
    {
      question: "Mengapa Sunan Kudus membuat padasan dengan pancuran berjumlah delapan?",
      answers: [
        { option: "Meniru tradisi Islam", correct: false },
        { option: "Upaya melakukan pendekatan terhadap umat Buddha", correct: true },
        { option: "Tanpa alasan yang jelas", correct: false },
        { option: "Menyesuaikan dengan tradisi Hindu", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Kudus mengubah acara selamatan mitoni yang dilakukan oleh masyarakat setempat?",
      answers: [
        { option: "Melarang selamatan mitoni sepenuhnya", correct: false },
        { option: "Tidak melakukan perubahan apa pun", correct: false },
        { option: "Mengubah doa kepada Allah dan nilai-nilai Islam", correct: true },
        { option: "Menghapus acara selamatan mitoni dari tradisi lokal", correct: false },
      ],
    },
    {
      question: "Siapa guru-guru Sunan Kudus selain ayahnya, Sunan Ngudung?",
      answers: [
        { option: "Kiai Ageng Ngerang dan Sunan Ampel", correct: true },
        { option: "Sunan Bonang dan Sunan Ampel", correct: false },
        { option: "Sunan Ngundung dan Kiai Telingsing", correct: false },
        { option: "Kiai Ageng Ngerang dan Sunan Bonang", correct: false },
      ],
    },
    {
      question: "Apa prinsip utama Sunan Kudus dalam mengajarkan Islam kepada masyarakat?",
      answers: [
        { option: "Konfrontasi langsung dan kekerasan", correct: false },
        { option: "Tidak memperhatikan adat dan budaya lokal", correct: false },
        { option: "Mengambil ikan tanpa membuat keruh airnya", correct: true },
        { option: "Tidak melakukan pendekatan kebudayaan dalam dakwah Islam", correct: false },
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
        "HEBATT!! kamu sudah cukup memahami tentang Pengetahuan Sunan Kudus";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-kudus.html";
      };
      btnLanjut.textContent = "Kembali ke halaman utama";
      btnLanjut.onclick = function () {
        window.location.href = "../../index.html";
      };
    } else {
      resultImageElement.src = "../../Assets/pengetahuan/failedToNextLevel.svg";
      resultTextElement.textContent =
        "Wah kamu belum cukup memahami tentang Pengetahuan Sunan Kudus";
      btnUlangi.textContent = "Ulangi";
      btnUlangi.onclick = function () {
        window.location.href = "sunan-kudus.html";
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
