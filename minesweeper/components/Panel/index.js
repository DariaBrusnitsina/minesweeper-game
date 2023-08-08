import './index.scss';
import htmlToElement from '../../utils/htmlToElement';
import Panel from './index.html';
import * as STATE  from '../../src/gameState';
import board, { createBoardElements, resetCells } from '../Board';
import Button from '../Button';
import { createElement } from '../../utils/createElement';

const panel = htmlToElement(Panel)

const CLASS = {
  minesAmount: 'settings__mines-amount-label',
}

let time = 0
let clicks = 0
let clock = ""
export let minesAmount = 10
let difficulty = "easy"

//Quick Start
const quickGame = Button("Quick Start",startQuickGame, "button_light")
panel.append(quickGame)

function startQuickGame() {
  createBoardElements(10, minesAmount)
  difficulty = 'easy'
  initGame(difficulty)
}

//Choose Game Level and Mines Amount
export function displaySettings() {
  const chooseGameTitle = createElement('h2', 'title', 'Choose Game Level and Mines Amount')
  const minesAmountForm = document.createElement('div')
  minesAmountForm.innerHTML = `<div class='${CLASS.minesAmount}'><p>Mines Amount:</p><input type="number" value="10" min="10" max="99"></div>`
  const btnsRow = createElement('div', 'btnsRow')
  let btnsRowLabel = createElement('p', 'subtitle', 'Game Level:')
  const easy = Button('Easy', easyDifficulty, 'button_light')
  const medium = Button('Medium', mediumDifficulty, 'button_light')
  const hard = Button('Hard', hardDifficulty, 'button_light')

  board.innerHTML = ""
  board.style.wight ="0"
  board.style.height ="0"

  panel.innerHTML = ''
  minesAmountForm.addEventListener('change', function(e) {
    minesAmount = e.target.value
  })
  btnsRow.append(easy, medium, hard)
  panel.append(chooseGameTitle, minesAmountForm, btnsRowLabel, btnsRow)

  function easyDifficulty() {
    STATE.changeGameOver(false)
    createBoardElements(10, minesAmount)
    difficulty = 'easy'
    initGame(difficulty)
  }

  function mediumDifficulty() {
    STATE.changeGameOver(false)
    createBoardElements(15, minesAmount)
    difficulty = 'medium'
    initGame(difficulty)
  }

  function hardDifficulty() {
    STATE.changeGameOver(false)
    createBoardElements(25, minesAmount)
    difficulty = 'hard'
    initGame(difficulty)
  }
}

const timerClock = document.createElement('p')
function setTime(value) {
  timerClock.innerHTML = `⏱️${value}`
}

const flags = document.createElement('p')
export function updateFlag() {
  flags.innerText = `Flags: ${STATE.flag} 🚩`
}

export function updateClicks() {
  clicks++
  displayClicks()
}
const clicksDisp = document.createElement('p')
function displayClicks() {
  clicksDisp.innerText = `Clicks: ${clicks}`

}

//GAME ELEMENTS
export function initGame(difficulty) {
  const mines = document.createElement('p')
  panel.innerHTML = ''
  let initGameTitle = createElement('h2', 'title', 'Find all mines!')
  mines.innerText = `Difficulty level '${difficulty}' with ${minesAmount} 💣`
  panel.append(initGameTitle, timerClock,clicksDisp, mines, flags)
  updateFlag()
  displayClicks()

  const timer = new Timer(function() {
    let current = time++
      if (current < 10) {
        current = `00:0${current}`
      } else if (current >= 10 && current < 60) {
        current = `00:${current}`
      } else if (current >= 60) {
        let min = Math.floor(current/60)
        let sec = current - min*60

        if (min < 10) {
          if (sec < 10) {
            current = `0${min}:0${sec}`
          } else if (sec >= 10 && sec < 60) {
            current = `0${min}:${sec}`
          }
        } else {
          if (sec < 10) {
            current = `${min}:0${sec}`
          } else if (sec >= 10 && sec < 60) {
            current = `${min}:${sec}`
          }
        }
      }
      clock = current
    setTime(current)
  }, 1000)

  setTime(time)
}


//displayResults
export function displayResults() {
  board.innerHTML = ""
  panel.innerHTML = ''
  board.style.wight ="0"
  board.style.height ="0"

  if (!localStorage.getItem("minesweeperResults")) {
    let resultTitle = createElement('h2', 'title', 'There are no latest results yet!')
    panel.append(resultTitle)
  } else {
      let results = JSON.parse(localStorage.getItem("minesweeperResults"))
      let resultTitle = createElement('h2', 'title', 'The Latest 10 Results')
      let resultsList = createElement('ol', 'resultsList')

      results.map((item, index) => {
        let resultsItem = createElement('li', 'results', `${item.resDate}. It was found ${item.resMines} mines in ${item.resTime} seconds at the ${item.resDif} level.`)
        resultsList.append(resultsItem)
      })
      panel.append(resultTitle, resultsList)
  }
}

export function gameWin() {
  panel.innerHTML = ''
  resetCells()
  let gameOverText = createElement('h2', 'gameWin', `Hooray! You found all mines in ${time} seconds and ${clicks} moves!`)
  panel.appendChild(gameOverText)

  const date = new Date()
  const options = {weekday: 'long', day: 'numeric', month: 'long'}
  let today = `${date.toLocaleDateString('en-US', options)} ${date.toLocaleTimeString('en-US')}`

  let result = {
    resDate: today,
    resTime: time,
    resClicks: clicks,
    resMines: minesAmount,
    resDif: difficulty
  }

  if (!localStorage.getItem("minesweeperResults")) {
    let arrayResult = []
    arrayResult.push(result)
    localStorage.setItem("minesweeperResults",JSON.stringify(arrayResult))

  } else {
    let arrayResult = JSON.parse(localStorage.getItem("minesweeperResults"))

    if (arrayResult.length === 10) {
      arrayResult.shift()
      arrayResult.push(result)
    } else {
      arrayResult.push(result)
    }
    localStorage.setItem("minesweeperResults",JSON.stringify(arrayResult))
  }
}

export function gameLose() {
  panel.innerHTML = ''
  resetCells()
  let gameOverText = createElement('h2', 'gameLose', 'Game over. Try again!')
  panel.appendChild(gameOverText)
}

function Timer(fn, t) {
  var timerObj = setInterval(fn, t);

  this.stop = function() {
      if (timerObj) {
          clearInterval(timerObj);
          timerObj = null;
      }
      return this;
    }
}


export default panel
