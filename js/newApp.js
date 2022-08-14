const gameList = document.querySelector(".game-list");

const cardSprites = [
  "img/01.webp",
  "img/02.webp",
  "img/03.webp",
  "img/04.webp",
  "img/05.webp",
  "img/06.webp",
];
//**************************************** */
// const cardsSprites = [      Good practise
//     {
//         identifier: "something",
//         sprite: "src",
//     }
//     {
//         id: "second",
//         sprite: "srcSecond",
//     }
//**************************************** */
// ]
// class Card {
//     constructor(sprite) {
//         this.sprite = sprite;
//     }

//     appear() {
//         gameList.appendChild(this.item);
//     }
//     у
// }

// this.item = document.createElement("li");

// const flipContainer = document.createElement("div");
// flipContainer.classList.add("flip-container");

// const flipper = document.createElement("div");
// flipper.classList.add("flipper");

// const front = document.createElement("div");
// front.classList.add("front");

// const back = document.createElement("div");
// back.classList.add("back");

// const img = document.createElement("img");
// img.setAttribute("src", this.sprite);
// img.classList.add("img");

// this.item.appendChild(flipContainer);
// flipContainer.appendChild(flipper);
// flipper.appendChild(front);
// flipper.appendChild(back);
// back.appendChild(img);

function createCard(card) {
  return `
    <li>
    <div class="flip-container">
        <div class="flipper">
            <div class="front"></div>
            <div class="back"><img src="${imgSrc}" class="img"></div>
        </div>
    </div>
</li>`;
}

const generatedCards = [];
let foundedPairs = 0;
//два варіанти подвоєння масиву
cardSprites = cardSprites.concat(cardSprites);
cardSprites = [...cardSprites, ...cardSprites];
//
shuffle(/*cards*/);
function shuffle() {
  cardSprites.sort(() => 0.5 - Math.random());
}
let temp = "";
cardSprites.forEach((sprite) => {
  temp += createCard(sprite);
});
gameList.innerHTML = temp;
// cardSprites.forEach((sprite) => {
//     generatedCards.push(new Card(sprite));
//     generatedCards.push(new Card(sprite));
// });

// cardSprites.sort(function() { return 0.5 - Math.random() });

// let arrayFLipCLicker = []; *
gameList.addEventListener("click", ({ target }) => {
  const targetCard = target; // delete this line(maybe)

  if (
    targetCard.getAttribute("class") !== "game-list" /*target.closest(".back")*/
  ) {
    const cardFlipContainer = targetCard.parentElement.parentElement; //const cardFlipContainer target.closest(".flip-container")

    //let arrayFLipCLicker = [] *
    //  arrayFLipCLicker = [...arrayFLipCLicker, cardFlipContainer];
    cardFlipContainer.classList.add("flip-container-clicked");
    //querySelector
    const cardList = document.querySelectorAll(".flip-container-clicked");

    if (cardList.length === 2) {
      const firstCard = cardList[0].querySelector(".img");
      const firstCardImgSrc = firstCard.getAttribute("src");

      const secondCard = cardList[1].querySelector(".img");
      const secondCardImgSrc = secondCard.getAttribute("src");

      const firstCardContainer =
        firstCard.parentElement.parentElement.parentElement;
      const secondCardContainer =
        secondCard.parentElement.parentElement.parentElement;
      /*
setTimeout(() => {
// 1 dick better then 3 примiтка: до 16 жодних не треба
}, 0)
*/
      if (firstCardImgSrc !== secondCardImgSrc) {
        setTimeout(() => {
          //function verbUnmatch()
          firstCardContainer.classList.remove("flip-container-clicked");
          secondCardContainer.classList.remove("flip-container-clicked");
        }, 600);
      } else {
        foundedPairs += 2;

        setTimeout(() => {
          //function verbMatch()
          firstCardContainer.classList.remove("flip-container-clicked");
          secondCardContainer.classList.remove("flip-container-clicked");

          firstCardContainer.classList.add("founded");
          secondCardContainer.classList.add("founded");
        }, 600);
        //function verbWon()
        if (foundedPairs === generatedCards.length) {
          setTimeout(() => {
            alert("You won!");
          }, 600);
        }
      }
    } else if (cardList.lenght > 2) {
      console.log(cardList);
      cardList.forEach((card) => {
        card.classList.remove("flip-container-clicked");
      });
    }
  }
});

/*
gameList.addEventListener("click", ({target}) => {
    flip(target)
})
few options for this stuff
gameList.addEventListener("click", flip);
function flip({target}) {

}
const flip = ({target}) => {

}*/
