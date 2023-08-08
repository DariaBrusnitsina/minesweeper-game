import htmlToElement from '../../utils/htmlToElement';
import './index.scss';
import Board from './index.html';
import {handleClickOnCell, handleChangeFlag} from '../../src/clickOnCell';
import { updateClicks } from '../Panel';
import { editWidth } from '../../src/gameState';

const board = htmlToElement(Board);
export let cells = []

export function resetCells() {
  cells = []
}

board.addEventListener('click', function(e) {
  updateClicks()
})

export function createBoardElements(width, minesAmount) {
  editWidth(width)
  board.innerHTML = ""
  board.style.width = `${width*40}px`
  board.style.height = `${width*40}px`
  const minesArray = Array(Number(minesAmount)).fill('mine')
  const emptyArray = Array(width*width - minesAmount).fill('empty')
  const cellsArray = [...emptyArray, ...minesArray].sort(() => Math.random() - 0.5)

  for (let i = 0; i < width*width; i++) {
    const cell = document.createElement('div');
    cell.setAttribute('id', i)
    cell.classList.add(cellsArray[i])
    board.appendChild(cell);
    cells.push(cell);
    cell.addEventListener('click', function(e) {handleClickOnCell(cell, width)})

    cell.oncontextmenu = function(e) {
      e.preventDefault()
      handleChangeFlag(cell)
    }
  }

  for (let i = 0; i < cells.length; i++) {
    let total = 0
    const isLeft = i % width === 0
    const isRight = i % width === width - 1

    if (cells[i].classList.contains('empty')) {
      if (i > 0 && !isLeft && cells[i-1].classList.contains('mine')) total++
      if (i > width-1 && !isRight && cells[i+1 -width].classList.contains('mine')) total++
      if (i > width && cells[i - width].classList.contains('mine')) total++
      if (i > width && !isLeft && cells[i-1 -width].classList.contains('mine')) total++

      if (i < (width*width)-1 && !isRight && cells[i+1].classList.contains('mine')) total++
      if (i < (width*width)-(width-1) && !isLeft && cells[i-1 +width].classList.contains('mine')) total++
      if (i < width*width-(width+1) && !isRight &&  cells[i+1 +width].classList.contains('mine')) total++
      if (i < (width*width)-(width) && cells[i +width].classList.contains('mine')) total++

      cells[i].setAttribute('data', total)
    }
  }
}

export default board