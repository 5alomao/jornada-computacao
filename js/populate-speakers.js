async function fetchSpeakersData() {
  try {
    const response = await fetch("./assets/JSON/speakers_data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const speakersData = await response.json();
    populateSpeakers(speakersData);

    // Inicializa o carrossel depois de carregar os palestrantes
    initializeCarousel();
  } catch (error) {
    console.error("Error fetching the speakers data:", error);
  }
}

function populateSpeakers(speakersData) {
  const speakersList = document.getElementById("speakers-list");
  speakersList.innerHTML = ""; // Limpa qualquer conteúdo existente
  speakersData.forEach((speaker) => {
    speakersList.innerHTML += createSpeakerCard(speaker);
  });
}

function createSpeakerCard(speaker) {
  return `
    <div class="speaker-card">
      <div class="speaker-left">
        <h1>${speaker.nome}</h1>
        <img src="${speaker.imagem}" alt="Imagem do(a) palestrante ${speaker.nome}.">
      </div>
      <div class="speaker-right">
        <div class="speaker-card-topic">
          <p>Tema</p>
          <p><strong>${speaker.tema}</strong></p>
        </div>
        <div class="speaker-card-topic">
          <p>${speaker.tipo}</p>
          <p><strong><i class="fa-regular fa-calendar"></i> ${speaker.data}</strong></p>
          <p><strong><i class="fa-regular fa-clock"></i> ${speaker.hora}</strong></p>
        </div>
        <a href="${speaker.link}" target="_blank"><span class="speaker-btn">INSCREVA-SE</span></a>
      </div>
    </div>
  `;
}

function initializeCarousel() {
  let currentIndex = 0;
  const items = document.querySelectorAll(".speaker-card");
  const totalItems = items.length;

  function updateCarousel() {
    const carousel = document.querySelector(".speakers-list");
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  window.nextSlide = function () {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  };

  window.prevSlide = function () {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  };
}

document.addEventListener("DOMContentLoaded", (event) => {
  fetchSpeakersData();
});
