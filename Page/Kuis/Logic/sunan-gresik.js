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
      question: "Apa nama lain dari Sunan Gresik?",
      answers: [
        { option: "Sunan Ampel", correct: false },
        { option: "Maulana Malik Ibrahim", correct: true },
        { option: "Sunan Kudus", correct: false },
        { option: "Sunan Bonang", correct: false },
      ],
    },
    {
      question: "Di mana Sunan Gresik dimakamkan?",
      answers: [
        { option: "Desa Gapurosukolilo, Gresik", correct: true },
        { option: "Desa Kemuning, Surabaya", correct: false },
        { option: "Desa Gresik, Jawa Timur", correct: false },
        { option: "Desa Sunan Gresik, Mojokerto", correct: false },
      ],
    },
    {
      question: "Apa peran Sunan Gresik dalam penyebaran agama Islam di Tanah Jawa?",
      answers: [
        { option: "Menyebarkan agama Islam dengan kekerasan", correct: false },
        { option: "Menggunakan pendekatan budaya lokal dalam dakwah", correct: true },
        { option: "Tidak terlibat dalam penyebaran agama Islam", correct: false },
        { option: "Memaksa orang untuk memeluk Islam", correct: false },
      ],
    },
    {
      question: "Apa yang membuat Sunan Gresik dihormati oleh Raja Majapahit?",
      answers: [
        { option: "Kekuatan militer yang dimilikinya", correct: false },
        { option: "Keturunan bangsawan yang mulia", correct: false },
        { option: "Sifat pemberani, bijaksana, dan ramah dalam berdakwah", correct: true },
        { option: "Kekayaan dan kemewahan yang dimilikinya", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Gresik berdakwah kepada masyarakat golongan bawah?",
      answers: [
        { option: "Dengan memaksa mereka menerima ajaran Islam", correct: false },
        { option: "Dengan memberikan pengajaran tingkat tinggi yang sulit dimengerti", correct: false },
        { option: "Dengan mengajar sesuai kapasitas mereka agar mudah dimengerti", correct: true },
        { option: "Dengan menghindari interaksi dengan mereka", correct: false },
      ],
    },
    {
      question: "Apa prinsip Sunan Gresik dalam menyebarkan Islam, sesuai anjuran Nabi?",
      answers: [
        { option: "Memaksakan ajaran Islam", correct: false },
        { option: "Menyebarkan Islam dengan kekerasan", correct: false },
        { option: "Menyebarkan Islam dengan cara yang mudah agar umat nyaman dan tidak terancam", correct: true },
        { option: "Menyembunyikan ajaran Islam dari masyarakat umum", correct: false },
      ],
    },
    {
      question: "Bagaimana Sunan Gresik melakukan dakwah melalui perdagangan?",
      answers: [
        { option: "Dengan memaksa orang membeli barang dagangannya", correct: false },
        { option: "Dengan memberikan diskon besar kepada umat Islam", correct: false },
        { option: "Dengan berdagang dan mendekati masyarakat untuk mengenalkan Islam", correct: true },
        { option: "Dengan menjauhi dunia perdagangan", correct: false },
      ],
    },
    {
      question: "Apa yang diajarkan Maulana Malik Ibrahim tentang hidup dari perniagaan?",
      answers: [
        { option: "Mengandalkan hidup dari perdagangan", correct: true },
        { option: "Menjadi petani untuk mencukupi kebutuhan hidup", correct: false },
        { option: "Bergantung pada bantuan sosial", correct: false },
        { option: "Menghindari segala bentuk pekerjaan dunia", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi fokus Sunan Gresik dalam membimbing masyarakat Gresik?",
      answers: [
        { option: "Hanya mengajarkan agama", correct: false },
        { option: "Fokus pada pengobatan dan pertanian saja", correct: false },
        { option: "Membimbing melalui tiga cara: pengobatan, perdagangan, akhlak, dan budi pekerti yang baik", correct: true },
        { option: "Tidak memiliki fokus tertentu dalam pembimbingan", correct: false },
      ],
    },
    {
      question: "Apa yang menjadi kontribusi Sunan Gresik terhadap pendidikan melalui sistem pesantren?",
      answers: [
        { option: "Tidak terlibat dalam pendidikan", correct: false },
        { option: "Mendirikan sekolah modern", correct: false },
        { option: "Menggunakan pendekatan budaya lokal dalam pendidikan", correct: false },
        { option: "Memajukan pendidikan melalui sistem pesantren", correct: true },
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
  
