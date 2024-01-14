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
      question: "Bagaimana Sunan Kalijaga berperan dalam penyebaran agama Islam di Pulau Jawa?",
      answers: [
        { option: "Sebagai panglima perang yang memimpin pasukan Islam", correct: false },
        { option: "Sebagai ulama yang hanya fokus pada aktivitas keagamaan", correct: false },
        { option: "Sebagai penasihat keraton, seniman, dan arsitek yang berperan penting dalam dakwah Islam", correct: true },
        { option: "Sebagai pedagang yang menyebarkan Islam melalui perdagangan", correct: false },
      ],
    },
    {
      question: "Apa pandangan Sunan Kalijaga terhadap budaya lokal dalam dakwah Islam?",
      answers: [
        { option: "Menyerang pendirian budaya lokal secara langsung", correct: false },
        { option: "Mengabaikan budaya lokal dalam penyebaran Islam", correct: false },
        { option: "Toleran terhadap budaya lokal dan mendekatinya secara bertahap", correct: true },
        { option: "Menggantikan budaya lokal dengan budaya Arab", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi keyakinan Sunan Kalijaga terkait pemahaman Islam oleh masyarakat?",
      answers: [
        { option: "Pemahaman Islam harus dipaksakan secara paksa", correct: false },
        { option: "Masyarakat harus dipisahkan dari kebiasaan lama secara tegas", correct: false },
        { option: "Islam akan dipahami dengan sendirinya, sehingga kebiasaan lama akan hilang", correct: true },
        { option: "Masyarakat harus diisolasi dari pengaruh luar", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Kalijaga menggunakan kesenian Wayang dalam dakwah Islam?",
      answers: [
        { option: "Mengharamkan penggunaan Wayang dalam aktivitas dakwah", correct: false },
        { option: "Menggunakan Wayang sebagai hiburan tanpa kaitannya dengan Islam", correct: false },
        { option: "Mengakulturasi kesenian Wayang dengan ajaran Islam sebagai sarana dakwah", correct: true },
        { option: "Menggantikan Wayang dengan seni modern", correct: false },
      ],
    },
    {
      question: "Apa saja perayaan yang dikembangkan oleh Sunan Kalijaga sebagai bagian dari dakwah Islam?",
      answers: [
        { option: "Wayang, gamelan, dan seni suara suluk", correct: false },
        { option: "Garebeg maulud dan lakon carangan Layang Kalimasada", correct: false },
        { option: "Baju takwa dan perayaan sekatenan", correct: false },
        { option: "Semua jawaban benar", correct: true },
      ],
    },
    {
      question: "Di mana makam Sunan Kalijaga berada?",
      answers: [
        { option: "Kadilangu, Demak", correct: true },
        { option: "Kebumen", correct: false },
        { option: "Kartasura", correct: false },
        { option: "Banten", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi kontribusi Sunan Kalijaga dalam seni suara suluk?",
      answers: [
        { option: "Ia menciptakan lagu suluk Ilir-ilir dan Gundul-gundul Pacul", correct: true },
        { option: "Ia tidak memiliki kontribusi dalam seni suara suluk", correct: false },
        { option: "Ia hanya menggunakan seni suara suluk sebagai hiburan", correct: false },
        { option: "Ia melarang penggunaan seni suara suluk dalam dakwah Islam", correct: false },
      ],
    },
    {
      question: "Apa yang dirancang oleh Sunan Kalijaga terkait lanskap pusat kota?",
      answers: [
        { option: "Pusat kota dengan struktur modern", correct: false },
        { option: "Pusat kota tanpa adanya masjid", correct: false },
        { option: "Lanskap pusat kota berupa kraton, alun-alun dengan dua beringin, dan masjid", correct: true },
        { option: "Lanskap pusat kota dengan hanya bangunan komersial", correct: false },
      ],
    },
    {
      question: "Apa yang dikonsep oleh Sunan Kalijaga terkait Masjid Agung Cirebon dan Masjid Agung Demak?",
      answers: [
        { option: "Ia tidak terlibat dalam pembangunan masjid-masjid tersebut", correct: false },
        { option: "Desain masjid yang sederhana tanpa detail khusus", correct: false },
        { option: "Rancangan pembangunan masjid dengan menggunakan tiang 'tatal' (pecahan kayu) yang merupakan kreasi Sunan Kalijaga", correct: true },
        { option: "Penggunaan bahan bangunan modern dalam pembangunan masjid-masjid tersebut", correct: false },
      ],
    },
    {
      question: "Apa peran Sunan Kalijaga dalam merancang baju takwa?",
      answers: [
        { option: "Ia tidak memiliki kontribusi dalam merancang baju takwa", correct: false },
        { option: "Ia hanya menggunakan baju takwa tanpa merancangnya", correct: false },
        { option: "Ia adalah penggagas baju takwa", correct: true },
        { option: "Ia melarang penggunaan baju takwa dalam masyarakat Islam", correct: false },
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
          "HEBATT!! kamu sudah cukup memahami tentang Pengetahuan Sunan Kalijaga";
        btnUlangi.textContent = "Ulangi";
        btnUlangi.onclick = function () {
          window.location.href = "sunan-kalijaga.html";
        };
        btnLanjut.textContent = "Kembali ke halaman utama";
        btnLanjut.onclick = function () {
          window.location.href = "../../index.html";
        };
      } else {
        resultImageElement.src = "../../Assets/pengetahuan/failedToNextLevel.svg";
        resultTextElement.textContent =
          "Wah kamu belum cukup memahami tentang Pengetahuan Sunan Kalijaga";
        btnUlangi.textContent = "Ulangi";
        btnUlangi.onclick = function () {
          window.location.href = "sunan-kalijaga.html";
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
  
