import ancientsData from "../data/ancients.js";
import ancientsCards from "../assets/Ancients/ancientsCards.js";
import difficulties from "../data/difficulties.js";
import cardsGreenData from "../data/mythicCards/green/index.js";
import cardsBrownData from "../data/mythicCards/brown/index.js";
import cardsBlueData from "../data/mythicCards/blue/index.js";

console.log(`
На выбор 4 карты древнего +20,
На выбор 4 уровня сложности +20,
Карты замешиваются согласно правилам игры +40,
Есть трекер текущего состояния колоды +20,
Итого: 100 из 105.
`);

// !Click card God
const cards = document.querySelectorAll(".card");
const difficultyBtnNormal = document.querySelector(".normal");
const difficultyBtnEasy = document.querySelector(".easy");
const difficultyBtnHard = document.querySelector(".hard");
const difficultyBtnVeryEasy = document.querySelector(".very-easy");
// console.log(difficultyBtnVeryEasy);

cards[0].style.backgroundImage = `url('./assets/Ancients/${ancientsCards.azathoth}')`;
cards[1].style.backgroundImage = `url('./assets/Ancients/${ancientsCards.cthulhu}')`;
cards[2].style.backgroundImage = `url('./assets/Ancients/${ancientsCards.iogSothoth}')`;
cards[3].style.backgroundImage = `url('./assets/Ancients/${ancientsCards.shubNiggurath}')`;

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", () => {
    cards.forEach((element) => {
      element.classList.remove("active-card");
    });
    cards[i].classList.add("active-card");
    if (
      (cards[i].classList.contains("active-card") &&
        difficultyBtnNormal.classList.contains("active-btn")) ||
      difficultyBtnEasy.classList.contains("active-btn") ||
      difficultyBtnHard.classList.contains("active-btn") ||
      difficultyBtnVeryEasy.classList.contains("active-btn")
    ) {
      createDeck();
    }
  });
}

difficultyBtnNormal.addEventListener("click", () => {
  difficultyBtnVeryEasy.classList.remove("active-btn");
  difficultyBtnEasy.classList.remove("active-btn");
  difficultyBtnHard.classList.remove("active-btn");
  difficultyBtnNormal.classList.toggle("active-btn");
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].classList.contains("active-card") &&
      difficultyBtnNormal.classList.contains("active-btn")
    ) {
      createDeck();
    }
  }
});

difficultyBtnEasy.addEventListener("click", () => {
  difficultyBtnNormal.classList.remove("active-btn");
  difficultyBtnHard.classList.remove("active-btn");
  difficultyBtnVeryEasy.classList.remove("active-btn");
  difficultyBtnEasy.classList.toggle("active-btn");
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].classList.contains("active-card") &&
      difficultyBtnEasy.classList.contains("active-btn")
    ) {
      createDeck();
    }
  }
});

difficultyBtnHard.addEventListener("click", () => {
  difficultyBtnNormal.classList.remove("active-btn");
  difficultyBtnEasy.classList.remove("active-btn");
  difficultyBtnVeryEasy.classList.remove("active-btn");
  difficultyBtnHard.classList.toggle("active-btn");
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].classList.contains("active-card") &&
      difficultyBtnHard.classList.contains("active-btn")
    ) {
      createDeck();
    }
  }
});

difficultyBtnVeryEasy.addEventListener("click", () => {
  difficultyBtnNormal.classList.remove("active-btn");
  difficultyBtnEasy.classList.remove("active-btn");
  difficultyBtnHard.classList.remove("active-btn");
  difficultyBtnVeryEasy.classList.toggle("active-btn");
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].classList.contains("active-card") &&
      difficultyBtnVeryEasy.classList.contains("active-btn")
    ) {
      createDeck();
    }
  }
});

// !random number
const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function createDeck() {
  let indexActiveGod;
  let activeGod;
  let totalGreenCards;
  let totalBrownCards;
  let totalBlueCards;
  let basicGreenDeck;
  let basicBrownDeck;
  let basicBlueDeck;

  // !get the active god
  function getActiveGod() {
    const elementsGod = document.querySelectorAll(".card");
    for (let i = 0; i < elementsGod.length; i++) {
      if (elementsGod[i].classList.contains("active-card")) {
        if (elementsGod[i].classList.contains(`${ancientsData[i].name}`)) {
          return ancientsData[i].name;
        }
      }
    }
  }
  getActiveGod();
  activeGod = getActiveGod();

  // !get index the active God
  function getIndexActiveGod(param) {
    for (let i = 0; i < ancientsData.length; i++) {
      if (activeGod === ancientsData[i].name) {
        return i;
      }
    }
  }
  indexActiveGod = getIndexActiveGod(activeGod);

  // !get total green cards
  function getTotalGreenCards() {
    return (
      ancientsData[indexActiveGod].firstStage.greenCards +
      ancientsData[indexActiveGod].secondStage.greenCards +
      ancientsData[indexActiveGod].thirdStage.greenCards
    );
  }
  totalGreenCards = getTotalGreenCards();

  // !create basic green deck
  function createBasicGreenDeck(param) {
    const stack = [];
    for (let i = 0; i < param; i++) {
      let indexRandomCard = getRandomNum(0, cardsGreenData.length - 1);
      if (difficultyBtnEasy.classList.contains("active-btn")) {
        if (
          cardsGreenData[indexRandomCard].difficulty !== "hard" &&
          stack.includes(cardsGreenData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsGreenData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnHard.classList.contains("active-btn")) {
        if (
          cardsGreenData[indexRandomCard].difficulty !== "easy" &&
          stack.includes(cardsGreenData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsGreenData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnVeryEasy.classList.contains("active-btn")) {
        if (
          cardsGreenData[indexRandomCard].difficulty === "easy" &&
          stack.includes(cardsGreenData[indexRandomCard].id) !== true &&
          stack.length < totalGreenCards
        ) {
          stack.push(cardsGreenData[indexRandomCard].id);
        }
        if (stack.length >= 5 && stack.length < totalGreenCards) {
          if (
            cardsGreenData[indexRandomCard].difficulty === "normal" &&
            stack.includes(cardsGreenData[indexRandomCard].id) !== true
          ) {
            stack.push(cardsGreenData[indexRandomCard].id);
          } else i = i - 1;
        } else if (stack.length < totalGreenCards) {
          i = i - 1;
        }
      } else if (!stack.includes(cardsGreenData[indexRandomCard].id)) {
        stack.push(cardsGreenData[indexRandomCard].id);
      } else i = i - 1;
    }
    return stack;
  }

  basicGreenDeck = createBasicGreenDeck(totalGreenCards);

  // !get total brown cards
  function getTotalBrownCards() {
    return (
      ancientsData[indexActiveGod].firstStage.brownCards +
      ancientsData[indexActiveGod].secondStage.brownCards +
      ancientsData[indexActiveGod].thirdStage.brownCards
    );
  }
  totalBrownCards = getTotalBrownCards();

  // !create basic brown deck
  function createBasicBrownDeck(param) {
    const stack = [];
    for (let i = 0; i < param; i++) {
      let indexRandomCard = getRandomNum(0, cardsBrownData.length - 1);
      if (difficultyBtnEasy.classList.contains("active-btn")) {
        if (
          cardsBrownData[indexRandomCard].difficulty !== "hard" &&
          stack.includes(cardsBrownData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBrownData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnHard.classList.contains("active-btn")) {
        if (
          cardsBrownData[indexRandomCard].difficulty !== "easy" &&
          stack.includes(cardsBrownData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBrownData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnVeryEasy.classList.contains("active-btn")) {
        if (
          cardsBrownData[indexRandomCard].difficulty === "easy" &&
          stack.includes(cardsBrownData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBrownData[indexRandomCard].id);
        }
        if (stack.length >= 5 && stack.length < totalBrownCards) {
          if (
            cardsBrownData[indexRandomCard].difficulty === "normal" &&
            stack.includes(cardsBrownData[indexRandomCard].id) !== true
          ) {
            stack.push(cardsBrownData[indexRandomCard].id);
          } else i = i - 1;
        } else if (stack.length < totalBrownCards) {
          i = i - 1;
        }
      } else if (!stack.includes(cardsBrownData[indexRandomCard].id)) {
        stack.push(cardsBrownData[indexRandomCard].id);
      } else i = i - 1;
    }
    return stack;
  }

  basicBrownDeck = createBasicBrownDeck(totalBrownCards);

  // !get total blue cards
  function getTotalBlueCards() {
    return (
      ancientsData[indexActiveGod].firstStage.blueCards +
      ancientsData[indexActiveGod].secondStage.blueCards +
      ancientsData[indexActiveGod].thirdStage.blueCards
    );
  }
  totalBlueCards = getTotalBlueCards();

  // !create basic blue deck
  function createBasicBlueDeck(param) {
    const stack = [];
    for (let i = 0; i < param; i++) {
      let indexRandomCard = getRandomNum(0, cardsBlueData.length - 1);
      if (difficultyBtnEasy.classList.contains("active-btn")) {
        if (
          cardsBlueData[indexRandomCard].difficulty !== "hard" &&
          stack.includes(cardsBlueData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBlueData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnHard.classList.contains("active-btn")) {
        if (
          cardsBlueData[indexRandomCard].difficulty !== "easy" &&
          stack.includes(cardsBlueData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBlueData[indexRandomCard].id);
        } else i = i - 1;
      } else if (difficultyBtnVeryEasy.classList.contains("active-btn")) {
        if (
          cardsBlueData[indexRandomCard].difficulty === "easy" &&
          stack.includes(cardsBlueData[indexRandomCard].id) !== true
        ) {
          stack.push(cardsBlueData[indexRandomCard].id);
        } else if (stack.length < 2) {
          i = i - 1;
        }
      } else if (!stack.includes(cardsBlueData[indexRandomCard].id)) {
        stack.push(cardsBlueData[indexRandomCard].id);
      } else i = i - 1;
    }
    return stack;
  }
  basicBlueDeck = createBasicBlueDeck(totalBlueCards);

  // !create deck stage
  function createDeckStage(param1, param2) {
    const arrCards = [];
    for (let i = 0; i < param1; i++) {
      arrCards.push(param2.pop());
    }
    return arrCards;
  }
  const deckStage1 = [
    ...createDeckStage(
      ancientsData[indexActiveGod].firstStage.greenCards,
      basicGreenDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].firstStage.brownCards,
      basicBrownDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].firstStage.blueCards,
      basicBlueDeck
    ),
  ];

  const deckStage2 = [
    ...createDeckStage(
      ancientsData[indexActiveGod].secondStage.greenCards,
      basicGreenDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].secondStage.brownCards,
      basicBrownDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].secondStage.blueCards,
      basicBlueDeck
    ),
  ];

  const deckStage3 = [
    ...createDeckStage(
      ancientsData[indexActiveGod].thirdStage.greenCards,
      basicGreenDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].thirdStage.brownCards,
      basicBrownDeck
    ),
    ...createDeckStage(
      ancientsData[indexActiveGod].thirdStage.blueCards,
      basicBlueDeck
    ),
  ];

  const deck = [deckStage3, deckStage2, deckStage1];

  // !get card on click
  const deckCards = document.querySelector(".deck");
  let seceltedCard;
  let selectedDeck;

  function getCard() {
    selectedDeck = deck[deck.length - 1];
    if (selectedDeck !== undefined) {
      const randomCard = getRandomNum(0, selectedDeck.length - 1);
      seceltedCard = selectedDeck[randomCard];
      selectedDeck.splice(randomCard, 1);
      if (selectedDeck.length === 0) {
        deck.splice(deck.length - 1, 1);
      }
      return seceltedCard;
    }
  }
  deckCards.addEventListener("click", getCard);

  // !show card on click
  function showCard() {
    const showSeceltedCard = document.querySelector(".selected-card");

    for (let i = 0; i < cardsBrownData.length; i++) {
      if (cardsBrownData[i].id === seceltedCard) {
        showSeceltedCard.style.backgroundImage = `url("${cardsBrownData[i].cardFace}")`;
      }
    }

    for (let i = 0; i < cardsGreenData.length; i++) {
      if (cardsGreenData[i].id === seceltedCard) {
        showSeceltedCard.style.backgroundImage = `url("${cardsGreenData[i].cardFace}")`;
      }
    }

    for (let i = 0; i < cardsBlueData.length; i++) {
      if (cardsBlueData[i].id === seceltedCard) {
        showSeceltedCard.style.backgroundImage = `url("${cardsBlueData[i].cardFace}")`;
      }
    }
    if (selectedDeck === undefined) {
      showSeceltedCard.style.backgroundImage = "none";
    }
    getCardsTrack(deckStage1, 0);
    getCardsTrack(deckStage2, 1);
    getCardsTrack(deckStage3, 2);
  }
  deckCards.addEventListener("click", showCard);

  // !create a tracker
  function elementDot(params) {
    let dot = document
      .querySelectorAll(".dots-container")
      [params].querySelectorAll(".dot");
    return dot;
  }
  // !get number of color cards and add in tracker
  function getCardsTrack(deckStage, elem) {
    let resultGreen = 0;
    let resultBrown = 0;
    let resultBlue = 0;
    deckStage.forEach((element) => {
      for (let i = 0; i < cardsGreenData.length; i++) {
        if (cardsGreenData[i].id === element) {
          resultGreen++;
        }
      }
      for (let i = 0; i < cardsBrownData.length; i++) {
        if (cardsBrownData[i].id === element) {
          resultBrown++;
        }
      }
      for (let i = 0; i < cardsBlueData.length; i++) {
        if (cardsBlueData[i].id === element) {
          resultBlue++;
        }
      }
    });
    elementDot(elem)[0].textContent = resultGreen;
    elementDot(elem)[1].textContent = resultBrown;
    elementDot(elem)[2].textContent = resultBlue;
  }
  getCardsTrack(deckStage1, 0);
  getCardsTrack(deckStage2, 1);
  getCardsTrack(deckStage3, 2);
}
