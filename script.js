'use strict'

setTimeout(() => {
  document.body.classList.remove('preload')
}, 500)

const btnRules = document.querySelector('.rules-btn')
const btnClose = document.querySelector('.close-btn')
const modalRules = document.querySelector('.modal')

//every winning scenario possible
const CHOICES = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
]

//Collecting HTML Elements
const choiceButton = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results-result')
const resultWinner = document.querySelector('.results-winner')
const resultText = document.querySelector('.results-text')
const playAgainButton = document.querySelector('.play-again')

const scoreNumber = document.querySelector('.score-number')
let score = 0

// Game Logic

choiceButton.forEach((button) => {
  //for each button add 'click' eventListeners
  button.addEventListener('click', () => {
    //button dataset(paper,rock,scissors) set on html put in a variable
    const choiceName = button.dataset.choice
    //loop through each choice in CHOICE array and find the one clicked by comparing the names and return the object with the same name ,put in "choice" variable
    const choice = CHOICES.find((choice) => choice.name === choiceName)
    choose(choice)
  })
})

function choose(choice) {
  //what ai choose
  const aichoice = aiChoose()
  //functions with person choice object and ai choice object
  displayResults([choice, aichoice])
  displayWinner([choice, aichoice])
}

//AI choose random element in CHOICE array
function aiChoose() {
  //random number beteen 0 and 2
  const rand = Math.floor(Math.random() * CHOICES.length)
  //select element in CHOICE array
  return CHOICES[rand]
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
            <div class="choice ${results[idx].name}">
                <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}">
            </div>
            `
    }, idx * 1000)
  })

  gameDiv.classList.toggle('hidden')
  resultsDiv.classList.toggle('hidden')
}

function displayWinner(results) {
  const userWins = isWinner(results)
  const aiWins = isWinner(results.reverse())

  if (userWins) {
    resultText.innerHTML = 'You win'
    resultDivs[0].classList.toggle('winner')
    keepScore(1)
  } else if (aiWins) {
    resultText.innerHTML = 'You lose'
    resultDivs[1].classList.toggle('winner')
    keepScore(-1)
  } else {
    resultText.innerHTML = 'Draw'
  }
  resultWinner.classList.toggle('hidden')
  resultsDiv.classList.toggle('show-winner')
}

// Compare if person choice beats ai choice
function isWinner(results) {
  return results[0].beats === results[1].name
}

// function to increase or decrease score and edit html
function keepScore(point) {
  score += point
  scoreNumber.innerText = score
}

//Play Again
playAgainButton.addEventListener('click', () => {
  gameDiv.classList.toggle('hidden')
  resultsDiv.classList.toggle('hidden')

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = ''
    resultDiv.classList.remove('winner')
  })

  resultText.innerHTML = ''
  resultWinner.classList.toggle('hidden')
  resultsDiv.classList.toggle('show-winner')
})

// Show/Hide rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal')
})

btnClose.addEventListener('click', () => {
  modalRules.classList.remove('show-modal')
})
