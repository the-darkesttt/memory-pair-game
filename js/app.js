const gameList = document.querySelector('.game-list');

const cardSprites = [
    'img/01.webp',
    'img/02.webp',
    'img/03.webp',
    'img/04.webp',
    'img/05.webp',
    'img/06.webp',
];

class Card {
    constructor(sprite) {
        this.sprite = sprite;

        this.item = document.createElement('li');

        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        const img = document.createElement('img');
        img.setAttribute('src', this.sprite);
        img.classList.add('img');
        
        this.item.appendChild(flipContainer)
        flipContainer.appendChild(flipper);
        flipper.appendChild(front);
        flipper.appendChild(back);
        back.appendChild(img);
    }

    appear() {
        gameList.appendChild(this.item);
    }
}

const generatedCards = [];
let foundedPairs = 0;

cardSprites.forEach((sprite) => {
    generatedCards.push(new Card(sprite));
    generatedCards.push(new Card(sprite));
});

generatedCards.sort(function() { return 0.5 - Math.random() });
generatedCards.forEach((card) => {
    card.appear();
});

gameList.addEventListener('click', ({ target }) => {
    const targetCard = target;

    if (targetCard.getAttribute('class') !== 'game-list') {

        const cardFlipContainer = targetCard.parentElement.parentElement;

        cardFlipContainer.classList.add('flip-container-clicked');

        const cardList = document.querySelectorAll('.flip-container-clicked');

        if (cardList.length === 2) {
            const firstCard = cardList[0].querySelector('.img');
            const firstCardImgSrc = firstCard.getAttribute('src');

            const secondCard = cardList[1].querySelector('.img');
            const secondCardImgSrc = secondCard.getAttribute('src');

            const firstCardContainer = firstCard.parentElement.parentElement.parentElement;
            const secondCardContainer = secondCard.parentElement.parentElement.parentElement;

            if (firstCardImgSrc !== secondCardImgSrc) {

                setTimeout(() => {
                    firstCardContainer.classList.remove('flip-container-clicked');
                    secondCardContainer.classList.remove('flip-container-clicked');
                }, 600);
                
            } else {

                foundedPairs += 2;

                setTimeout(() => {
                    firstCardContainer.classList.remove('flip-container-clicked');
                    secondCardContainer.classList.remove('flip-container-clicked');

                    firstCardContainer.classList.add('founded');
                    secondCardContainer.classList.add('founded');
                }, 600);

                if (foundedPairs === generatedCards.length) {

                    setTimeout(() => {
                        alert('You won!')
                    }, 600)
                    
                }

            }
        } else if (cardList.lenght > 2) {
            console.log(cardList)
            cardList.forEach((card) => {
                card.classList.remove('flip-container-clicked')
            })
        }
    }
});

