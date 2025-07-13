// ----------------------------
// Get elements
// ----------------------------
const nameForm = document.getElementById("name-form"); // Form to enter name
const usernameInput = document.getElementById("username");
const welcomeMessage = document.getElementById("welcome-message");
const moveCounter = document.getElementById("move-counter");
const gameBoard = document.getElementById("game-board");

// ----------------------------
// Load stored name
// ----------------------------
const storedName = localStorage.getItem("username");

if (storedName) {
    nameForm.style.display = "none";
    welcomeMessage.style.display = "block";
    const visited = localStorage.getItem("visited");
    if (visited) {
        welcomeMessage.textContent = "Welcome back, " + storedName;
    } else {
        welcomeMessage.textContent = "Welcome, " + storedName;
    }
    localStorage.setItem("visited", "yes");
}

// ----------------------------
// Handle form submit
// ----------------------------
nameForm.onsubmit = function (event) {
    event.preventDefault(); // Prevent reload
    const name = usernameInput.value.trim();
    if (name) {
        localStorage.setItem("username", name);
        localStorage.setItem("visited", "");
        location.reload(); // Reload page
    }
};

// ----------------------------
// Game logic
// ----------------------------
const emojis = ["🍕", "🐶", "🎵", "🚗", "🌟", "📚", "🧠", "🎮"];
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;

// ----------------------------
// Shuffle cards
// ----------------------------
function shuffle(array) {
    let doubled = array.concat(array);
    return doubled.sort(function () {
        return Math.random() - 0.5;
    });
}

// ----------------------------
// Create card element
// ----------------------------
function createCard(emoji, index) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-emoji", emoji);
    card.setAttribute("data-index", index);
    card.innerHTML = "?";

    card.addEventListener("click", function () {
        flipCard(card);
    });

    return card;
}

// ----------------------------
// Flip card
// ----------------------------
function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains("flipped")) {
        return;
    }

    card.classList.add("flipped");
    card.innerHTML = card.getAttribute("data-emoji");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves = moves + 1;
        moveCounter.textContent = moves;
        checkMatch();
    }
}

// ----------------------------
// Check match
// ----------------------------
function checkMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    if (card1.getAttribute("data-emoji") === card2.getAttribute("data-emoji")) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCount = matchedCount + 2;
        flippedCards = [];

        if (matchedCount === cards.length) {
            setTimeout(function () {
                alert("You Win in " + moves + " moves!");
            }, 300);
        }
    } else {
        setTimeout(function () {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = "?";
            card2.innerHTML = "?";
            flippedCards = [];
        }, 800);
    }
}

// ----------------------------
// Start or restart the game
// ----------------------------
function startGame() {
    gameBoard.innerHTML = "";
    moves = 0;
    matchedCount = 0;
    flippedCards = [];
    moveCounter.textContent = "0";

    const shuffled = shuffle(emojis);
    cards = [];

    for (let i = 0; i < shuffled.length; i++) {
        const newCard = createCard(shuffled[i], i);
        cards.push(newCard);
        gameBoard.appendChild(newCard);
    }
}

// Start automatically on page load
window.onload = startGame;
