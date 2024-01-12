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
      question: "Apa gelar yang diberikan kepada Sunan Drajat oleh Raden Patah Sultan Demak?",
      answers: [
        { option: "Sunan Ampel", correct: false },
        { option: "Sunan Drajat", correct: false },
        { option: "Sunan Mayang Madu", correct: true },
        { option: "Sunan Qosim", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Drajat memperkenalkan Islam?",
      answers: [
        { option: "Melalui penindasan dan paksaan", correct: false },
        { option: "Dengan cara menyampaikan ajaran langsung di masjid atau langgar", correct: true },
        { option: "Hanya melalui fatwa dan petuah", correct: false },
        { option: "Dengan mengabaikan konsep dakwah bil-hikmah", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi fokus utama Sunan Drajat dalam dakwahnya?",
      answers: [
        { option: "Menyebarkan Islam dengan kekerasan", correct: false },
        { option: "Membuat masyarakat bergantung pada bantuan pemerintah", correct: false },
        { option: "Kesejahteraan sosial dan perhatian pada kaum fakir miskin", correct: true },
        { option: "Menciptakan konflik sosial di wilayahnya", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Drajat mengajarkan ajaran Islam melalui seni tradisional?",
      answers: [
        { option: "Dengan mengabaikan seni tradisional", correct: false },
        { option: "Melalui tembang pangkur dengan iringan gending", correct: true },
        { option: "Hanya melalui pengajian di masjid", correct: false },
        { option: "Dengan menekankan kepatuhan tanpa alasan yang jelas", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi motivasi utama Sunan Drajat dalam usahanya mengentas kemiskinan?",
      answers: [
        { option: "Membuat masyarakat bergantung pada bantuan pemerintah", correct: false },
        { option: "Kepentingan pribadi", correct: false },
        { option: "Etos kerja keras, kedermawanan, dan mengentas kemiskinan", correct: true },
        { option: "Menyebarluaskan Islam dengan cara paksa", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Drajat memperbaiki mental masyarakat setempat?",
      answers: [
        { option: "Menekankan individualisme", correct: false },
        { option: "Mengajarkan masyarakat agar bekerja keras dan saling membantu satu sama lain", correct: true },
        { option: "Menghancurkan tradisi adat", correct: false },
        { option: "Menyebarkan Islam tanpa memperhatikan kondisi sosial", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi fokus Sunan Drajat dalam menyampaikan ajaran agama melalui ritual adat tradisional?",
      answers: [
        { option: "Menghancurkan tradisi adat", correct: false },
        { option: "Menekankan kepatuhan tanpa alasan yang jelas", correct: false },
        { option: "Menyelaraskan dengan ajaran Islam asal tidak bertentangan", correct: true },
        { option: "Menyebarkan Islam dengan cara paksa", correct: false },
      ],
    },
    {
      question: "Berapa lama Sunan Drajat memegang kendali keprajaan di wilayah perdikan Drajat?",
      answers: [
        { option: "20 tahun", correct: false },
        { option: "36 tahun", correct: true },
        { option: "50 tahun", correct: false },
        { option: "10 tahun", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi tujuan utama Sunan Drajat dalam usahanya menciptakan kehidupan yang makmur?",
      answers: [
        { option: "Pencitraan diri", correct: false },
        { option: "Kekuasaan politik", correct: false },
        { option: "Menghilangkan kemiskinan dan menciptakan kemakmuran", correct: true },
        { option: "Meningkatkan tingkat individualisme", correct: false },
      ],
    },
    {
      question: "Kapan Sunan Drajat memperoleh gelar Sunan Mayang Madu dari Raden Patah Sultan Demak?",
      answers: [
        { option: "Tahun 1442 Saka atau 1520 Masehi", correct: true },
        { option: "Tahun 1400 Saka atau 1500 Masehi", correct: false },
        { option: "Tahun 1600 Saka atau 1680 Masehi", correct: false },
        { option: "Tahun 1300 Saka atau 1380 Masehi", correct: false },
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
      resultImageElement.src = "../../Assets/pengetahuansuccess.svg";
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
