import { gameLose, gameWin, updateFlag, minesAmount } from '../components/Panel'
import { cells } from '../components/Board/index'
import * as STATE from './gameState'

export function handleClickOnCell(cell) {
  let currentId = cell.id

  if (STATE.isGameOver) return
  if (cell.classList.contains('checked') || cell.classList.contains('flag') ) return

  if (cell.classList.contains('mine')) {
    makeGameOver()

  } else {
    if (cell.getAttribute('data') != 0) {
      cell.classList.add('checked')
      cell.innerHTML = cell.getAttribute('data')

      if (cell.getAttribute('data') === "1") {
        cell.classList.add('one')
      } else if (cell.getAttribute('data') === "2") {
        cell.classList.add('two')
      } else if (cell.getAttribute('data') === "3") {
        cell.classList.add('three')
      } else {
        cell.classList.add('four')
      }
      return
    }
    cell.classList.add('checked')
    checkNeighboringCells(currentId)
  }
}

function checkNeighboringCells(currentId) {
  let width = STATE.width
  const isLeft = currentId % width === 0
  const isRight = currentId % width === width - 1

  setTimeout(() => {
    if (currentId > 0 && !isLeft) {
      const newId = cells[parseInt(currentId) -1].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId > width-1 && !isRight) {
      const newId = cells[parseInt(currentId) +1 -width].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId > width) {
      const newId = cells[parseInt(currentId -width)].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId > width && !isLeft) {
      const newId = cells[parseInt(currentId) -1 -width].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId < (width*width)-1 && !isRight) {
      const newId = cells[parseInt(currentId) +1].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId < (width*width)-(width-1) && !isLeft) {
      const newId = cells[parseInt(currentId) -1 +width].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId < width*width-(width+1) && !isRight) {
      const newId = cells[parseInt(currentId) +1 +width].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
    if (currentId < (width*width)-(width)) {
      const newId = cells[parseInt(currentId) +width].id
      const newCell = document.getElementById(newId)
      handleClickOnCell(newCell)
    }
  }, 10)
}

function makeGameOver() {
    STATE.changeGameOver(true)

    cells.forEach(c => {
      if(c.classList.contains('mine')) {
        c.innerHTML = "💣"
      }
    })
    gameLose()
}

export function handleChangeFlag(cell) {
  if (STATE.isGameOver) return

  if(!cell.classList.contains('checked') && STATE.flag < minesAmount) {
    if (!cell.classList.contains('flag')) {
      cell.classList.add('flag')
      cell.innerHTML = "🚩"
      STATE.addFlag()
      checkCompliteGame()
      return
    } else {
      cell.classList.remove('flag')
      cell.innerHTML = ""
      STATE.removeFlag()
    }
    updateFlag()
  } else if (!cell.classList.contains('checked') && STATE.flag === minesAmount) {
    if (cell.classList.contains('flag')) {
      cell.classList.remove('flag')
      cell.innerHTML = ""
      STATE.removeFlag()
      updateFlag()
    }
  }
}

function checkCompliteGame() {
  let matches = 0
  if (STATE.isGameOver) return


  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('flag') && cells[i].classList.contains('mine')) {
      matches += 1
    }
  }

  if (matches === minesAmount) {
    STATE.changeGameOver(true)
    gameWin()
  }
}