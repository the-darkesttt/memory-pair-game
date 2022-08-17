let stopGame = false;
let foundedPairs = 0;
let flippedCardsArr = [];
let cardsItems = '';
let min = 0;
let sec = 0;

const body = document.querySelector('body');
const gameList = document.querySelector('.game-list');

const gameMenu = document.querySelector('.game-menu');
const gameMenuTitle = document.querySelector('.modal__title');
const gameMenuDecs = document.querySelector('.modal__desc');
const gameStartButton = document.querySelector('#game-start-button');

const restartBtnModal = document.createElement('button');
restartBtnModal.innerHTML = 'Restart';
restartBtnModal.classList.add('restart-btn-modal');

const timerMin = document.querySelector('#timerMin');
const timerSec = document.querySelector('#timerSec');

function hideMenu() {
  body.classList.add('menu-close');
  gameMenu.classList.add('game-menu__hide');
  setTimeout(countGameTime, 1000)
  
}

gameStartButton.addEventListener('click', hideMenu);
restartBtnModal.addEventListener('click', () => {
  restartingGame();
  hideMenu();
});

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

const restartButton = document.querySelector('#restart-btn');
restartButton.addEventListener('click', restartingGame);

function restartingGame() {
  foundedPairs = 0;
  sec = -1;
  min = 0;
  flippedCardsArr = [];
  stopGame = false;

  createCardDeck();
}

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

function createCardDeck() {
  gameList.innerHTML = '';
  shuffleCards(cardSprites);
  cardsItems = '';
  createCards();
  gameList.innerHTML = cardsItems;
}

createCardDeck();

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
    gameMenuTitle.innerHTML = 'You won!';
    gameMenuDecs.innerHTML = `Congratulations! You found pairs for all cards by spending ${min} minutes and ${sec} seconds!`;
    
    gameStartButton.after(restartBtnModal);
    gameStartButton.remove()

    gameMenu.classList.remove('game-menu__hide');
  }, 1000);
} 