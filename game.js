const cards = [
    { name: 'cat', image: "images/chef.jpg" },
    { name: 'cat', image: "images/chef.jpg" },
    { name: 'dog', image: "images/gile3.jpg" },
    { name: 'dog', image: "images/gile3.jpg" },
    { name: 'bird', image: "images/girl1.png" },
    { name: 'bird', image: "images/girl1.png" },
    { name: 'fish', image: "images/kissy.jpg" },
    { name: 'fish', image: "images/kissy.jpg" },
    { name: 'rabbit', image:"images/larry.jpg" },
    { name: 'rabbit', image:"images/larry.jpg" },
    { name: 'turtle', image: "images/moewwwwww.jpg" },
    { name: 'turtle', image: "images/moewwwwww.jpg" },
    { name: 'lion', image: "images/bhd.jpg" },
    { name: 'lion', image: "images/bhd.jpg" },
    { name: 'elephant', image: "images/us.jpg" },
    { name: 'elephant', image: "images/us.jpg" }
];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = shuffle(cards);
    gameBoard.innerHTML = '';

    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;

        const imgElement = document.createElement('img');
        imgElement.src = card.image;
        imgElement.alt = card.name;

        cardElement.appendChild(imgElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.name === card2.dataset.name) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            document.getElementById('result').textContent = 'Congratulations! You won!';
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    document.getElementById('result').textContent = '';
    createGameBoard();
});

// Initialize the game
createGameBoard();
