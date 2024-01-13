const vehicleSelection = document.getElementById("vehicleSelection");
const cards = vehicleSelection.querySelectorAll(".card");

const conTravel = document.querySelector(".con-travel");
const dataLayananTravel = [
  {
    img: "../Assets/paketInnova.jpg",
    title: "Paket Bronze | Innova",
    capacity: "Max 7 Orang",
    day: "4 Hari",
    price: "7.000.000",
    kategori: "innova",
    direct: "detail/innova-bronze.html",
  },
  {
    img: "../Assets/paketInnova.jpg",
    title: "Paket Silver | Innova",
    capacity: "Max 7 Orang",
    day: "5 Hari",
    price: "9.500.000",
    kategori: "innova",
    direct: "detail/innova-silver.html",
  },
  {
    img: "../Assets/paketInnova.jpg",
    title: "Paket Gold | Innova",
    capacity: "Max 7 Orang",
    day: "5 Hari",
    price: "12.500.000",
    kategori: "innova",
    direct: "detail/innova-gold.html",
  },
  {
    img: "../Assets/paketInnova.jpg",
    title: "Paket VIP | Innova",
    capacity: "Max 7 Orang",
    day: "6 Hari",
    price: "17.000.000",
    kategori: "innova",
    direct: "detail/innova-vip.html",
  },
  {
    img: "../Assets/paketHiace.jpg",
    title: "Paket Bronze | Hiace",
    capacity: "Max 16 Orang",
    day: "4 Hari",
    price: "9.000.000",
    kategori: "hiace",
    direct: "detail/hiace-bronze.html",
  },
  {
    img: "../Assets/paketHiace.jpg",
    title: "Paket Silver | Hiace",
    capacity: "Max 16 Orang",
    day: "5 Hari",
    price: "12.000.000",
    kategori: "hiace",
    direct: "detail/hiace-silver.html",
  },
  {
    img: "../Assets/paketHiace.jpg",
    title: "Paket Gold | Hiace",
    capacity: "Max 16 Orang",
    day: "5 Hari",
    price: "15.000.000",
    kategori: "hiace",
    direct: "detail/hiace-gold.html",
  },
  {
    img: "../Assets/paketHiace.jpg",
    title: "Paket VIP | Hiace",
    capacity: "Max 16 Orang",
    day: "6 Hari",
    price: "20.000.000",
    kategori: "hiace",
    direct: "detail/hiace-vip.html",
  },
  {
    img: "../Assets/paketMediumBus.jpg",
    title: "Paket Bronze | Medium Bus",
    capacity: "Max 30 Orang",
    day: "4 Hari",
    price: "15.000.000",
    kategori: "mediumBus",
    direct: "detail/mediumbus-bronze.html",
  },
  {
    img: "../Assets/paketMediumBus.jpg",
    title: "Paket Silver | Medium Bus",
    capacity: "Max 30 Orang",
    day: "5 Hari",
    price: "20.000.000",
    kategori: "mediumBus",
    direct: "detail/mediumbus-silver.html",
  },
  {
    img: "../Assets/paketMediumBus.jpg",
    title: "Paket Gold | Medium Bus",
    capacity: "Max 30 Orang",
    day: "5 Hari",
    price: "25.000.000",
    kategori: "mediumBus",
    direct: "detail/mediumbus-gold.html",
  },
  {
    img: "../Assets/paketMediumBus.jpg",
    title: "Paket VIP | Medium Bus",
    capacity: "Max 30 Orang",
    day: "6 Hari",
    price: "30.000.000",
    kategori: "mediumBus",
    direct: "detail/mediumbus-vip.html",
  },
  {
    img: "../Assets/paketBigBus.jpg",
    title: "Paket Bronze | Big Bus",
    capacity: "Max 50 Orang",
    day: "4 Hari",
    price: "20.000.000",
    kategori: "bigBus",
    direct: "detail/bigbus-bronze.html",
  },
  {
    img: "../Assets/paketBigBus.jpg",
    title: "Paket Silver | Big Bus",
    capacity: "Max 50 Orang",
    day: "5 Hari",
    price: "25.000.000",
    kategori: "bigBus",
    direct: "detail/bigbus-silver.html",
  },
  {
    img: "../Assets/paketBigBus.jpg",
    title: "Paket Gold | Big Bus",
    capacity: "Max 50 Orang",
    day: "5 Hari",
    price: "30.000.000",
    kategori: "bigBus",
    direct: "detail/bigbus-gold.html",
  },
  {
    img: "../Assets/paketBigBus.jpg",
    title: "Paket VIP | Big Bus",
    capacity: "Max 50 Orang",
    day: "6 Hari",
    price: "35.000.000",
    kategori: "bigBus",
    direct: "detail/bigbus-vip.html",
  },
];

function updateTravelCards(category) {
  const filteredData = dataLayananTravel.filter(
    (data) => data.kategori === category
  );

  const cardTravel = filteredData.map(
    (data) => `
      <div class="card">
        <div class="top">
          <div class="img">
            <img src="${data.img}" alt="" />
          </div>
          <h3>${data.title}</h3>
          <p>
            <span>
              <iconify-icon icon="octicon:person-16" class="icon"></iconify-icon>
            </span>${data.capacity}
          </p>
          <p>
            <span>
              <iconify-icon icon="fluent-mdl2:date-time-2" class="icon"></iconify-icon>
            </span>${data.day}
          </p>
        </div>
        <div class="bottom">
          <p>${data.price}</p>
          <button onclick="window.location.href='${data.direct}'">Cek Detail</button>
        </div>
      </div>
    `
  );

  conTravel.innerHTML = cardTravel.join("");

  // Allow time for DOM updates before applying animation class
  setTimeout(() => {
    conTravel.querySelectorAll(".card").forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.classList.add("active");
    });
  }, 50);
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");

    // Remove animation class before updating
    conTravel.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("active");
    });

    // Filter and update cards based on category
    updateTravelCards(category);

    // Highlight the selected card
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

updateTravelCards("innova");

// 

function toggleFAQ(card) {
    const textFAQ = card.querySelector(".text-faq");
    const chevronIcon = card.querySelector("iconify-icon");

    if (textFAQ.style.display === "none" || !textFAQ.style.display) {
      textFAQ.style.display = "block";
      chevronIcon.classList.add("rotate180");
    } else {
      textFAQ.style.display = "none";
      chevronIcon.classList.remove("rotate180");
    }
  }