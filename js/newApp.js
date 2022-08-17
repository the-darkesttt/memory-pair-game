// changeable variables

let cardSprites = [
  {
      id: 'spite-01',
      src: 'img/01.webp',
  },
  {
      id: 'spite-02',
      src: 'img/02.webp',
  },
  {
      id: 'spite-03',
      src: 'img/03.webp',
  },
  {
      id: 'spite-04',
      src: 'img/04.webp',
  },
  {
      id: 'spite-05',
      src: 'img/05.webp',
  },
  {
      id: 'spite-06',
      src: 'img/06.webp',
  },
];
let stopGame = false;
let foundedPairs = 0;
let flippedCardsArr = [];
let cardsItems = '';
let min = 0;
let sec = 0;

// elements in DOM

const body = document.querySelector('body');
const gameList = document.querySelector('.game-list');

const timerMin = document.querySelector('#timerMin');
const timerSec = document.querySelector('#timerSec');

const menu = document.querySelector('.game-menu');
const menuTitle = document.querySelector('.modal__title');
const menuDecs = document.querySelector('.modal__desc');
const startBtnModal = document.querySelector('#game-start-button');

// start & restart btns

const restartBtn = document.querySelector('#restart-btn');
const restartBtnModal = document.createElement('button');

restartBtnModal.innerHTML = 'Restart';
restartBtnModal.classList.add('restart-btn-modal');

startBtnModal.addEventListener('click', hideMenu);
restartBtn.addEventListener('click', restartingGame);
restartBtnModal.addEventListener('click', () => {
restartingGame();
timerSec.innerHTML = `00`;
timerMin.innerHTML = `00`;
hideMenu();
});

// starting functions

function hideMenu() {
  body.classList.add("menu-close");
  menu.classList.add("game-menu__hide");
  setTimeout(countGameTime, 1000);
}

function restartingGame() {
  foundedPairs = 0;
  sec = 0;
  min = 0;
  flippedCardsArr = [];
  stopGame = false;

  createCardDeck();
}

function countGameTime() {
if (!stopGame) {
  sec++;

  if (sec < 10) {
    timerSec.innerHTML = `0${sec}`;
  } else {
    timerSec.innerHTML = sec;
  }

  if (min < 10) {
    timerMin.innerHTML = `0${min}`;
  } else {
    timerMin.innerHTML = min;
  }

  if (sec === 59) {
    sec = 0;
    min++;
  }

  setTimeout(countGameTime, 1000);
}
}

// creating card deck

function createCardDeck() {
gameList.innerHTML = '';
shuffleCards(cardSprites);
cardsItems = '';
createCards();
gameList.innerHTML = cardsItems;
}
createCardDeck();

function createCard(card) {
  return `
  <li>
      <div class='flip-container' data-sprite-id='${card.id}'>
          <div class='flipper'>
              <div class='front'></div>
              <div class='back'><img src='${card.src}'></div>
          </div>
      </div>
  </li>`;
}

cardSprites = [...cardSprites, ...cardSprites];

function shuffleCards(cards) {
  cards.sort(() => 0.5 - Math.random());
}

function createCards() {
cardSprites.forEach((sprite) => {
  cardsItems += createCard(sprite);
});
}

// main functions

gameList.addEventListener('click', ({ target }) => {
  if (target.closest('.flipper') && flippedCardsArr.length < 2) {
      flipCard(target);
      if (flippedCardsArr.length === 2) {
        compareCards();
      }
  }
});

function flipCard(target) {
  const cardFlipContainer = target.closest('.flip-container');
  
  if (flippedCardsArr.length < 2) {
    cardFlipContainer.classList.add('flip-container-clicked');
    flippedCardsArr.push(cardFlipContainer);
  }
}

function compareCards() {

const firstCardID = flippedCardsArr[0].dataset.spriteId;
const secondCardID = flippedCardsArr[1].dataset.spriteId;

if (firstCardID === secondCardID) {
  hideMatchingCards();
} else {
  hideUnmatchingCards();
}

}

function hideCards(cardsArr) {
cardsArr[0].classList.remove('flip-container-clicked');
cardsArr[1].classList.remove('flip-container-clicked');
}

function hideMatchingCards() {

foundedPairs += 2;
const temp = [...flippedCardsArr];
flippedCardsArr = []; 

setTimeout(() => {
  hideCards(temp);

  temp[0].classList.add('founded');
  temp[1].classList.add('founded');
}, 600);
  
if (foundedPairs === cardSprites.length) {
  showWinMessage();
}
}

function hideUnmatchingCards() {
setTimeout(() => {
  hideCards(flippedCardsArr);
  flippedCardsArr = []; 
}, 600);
}

function showWinMessage() {
stopGame = true;
setTimeout(() => {
  menuTitle.innerHTML = 'You won!';
  menuDecs.innerHTML = `Congratulations! You found pairs for all cards by spending ${min} minutes and ${sec} seconds!`;
  
  startBtnModal.after(restartBtnModal);
  startBtnModal.remove()

  menu.classList.remove('game-menu__hide');
}, 1000);
} 