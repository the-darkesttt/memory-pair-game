const gameList = document.querySelector(".game-list");

let cardSprites = [
    {
        id: "spite-01",
        src: "img/01.webp",
    },
    {
        id: "spite-02",
        src: "img/02.webp",
    },
    {
        id: "spite-03",
        src: "img/03.webp",
    },
    {
        id: "spite-04",
        src: "img/04.webp",
    },
    {
        id: "spite-05",
        src: "img/05.webp",
    },
    {
        id: "spite-06",
        src: "img/06.webp",
    },
];

function createCard(card) {
    return `
    <li>
        <div class="flip-container" id="${card.id}">
            <div class="flipper">
                <div class="front"></div>
                <div class="back"><img src="${card.src}"></div>
            </div>
        </div>
    </li>`;
}

cardSprites = [...cardSprites, ...cardSprites];
function shuffle() {
    cardSprites.sort(() => 0.5 - Math.random());
}
shuffle();

let temp = "";
cardSprites.forEach((sprite) => {
    temp += createCard(sprite);
});

gameList.innerHTML = temp;

let foundedPairs = 0;

let flippedCardsArr = [];

gameList.addEventListener("click", ({ target }) => {

    if (target.closest('.flipper')) {

        flipCard(target)

        if (flippedCardsArr.length === 2) {

          compareCards();

        }
    }
});

function flipCard(target) {
    const cardFlipContainer = target.closest(".flip-container");
    
    if (flippedCardsArr.length < 2) {
      cardFlipContainer.classList.add("flip-container-clicked");
      flippedCardsArr = [...flippedCardsArr, cardFlipContainer];
    }

}

function compareCards() {

  const firstCardID = flippedCardsArr[0].getAttribute("id");
  const secondCardID = flippedCardsArr[1].getAttribute("id");

  const comparingID = cardSprites.filter((sprite) => {
    return sprite.id === firstCardID || sprite.id === secondCardID
  });

  if (comparingID.length === 2) {
    hideMatchingCards();
  } else {
    hideUnmatchingCards();
  }

}

function hideMatchingCards() {

  foundedPairs += 2;

  setTimeout(() => {
    flippedCardsArr[0].classList.remove("flip-container-clicked");
    flippedCardsArr[1].classList.remove("flip-container-clicked");

    flippedCardsArr[0].classList.add("founded");
    flippedCardsArr[1].classList.add("founded");

    flippedCardsArr = []; 
  }, 600);
    
  if (foundedPairs === cardSprites.length) {
    showWinMessage();
  }
}

function hideUnmatchingCards() {
  setTimeout(() => {
    flippedCardsArr[0].classList.remove("flip-container-clicked");
    flippedCardsArr[1].classList.remove("flip-container-clicked");

    flippedCardsArr = []; 
  }, 600);
}

function showWinMessage() {
  setTimeout(() => {
    alert("You won!");
  }, 600);
}