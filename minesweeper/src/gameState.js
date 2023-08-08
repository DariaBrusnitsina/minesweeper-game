let isGameOver = false
let size = "easy"
let width = 10
let flag = 0

function changeGameOver(bool) {
  isGameOver = bool
}

function addFlag() {
  flag++
}

function removeFlag() {
  flag--
}

function getFlag() {
  return flag
}

function editWidth(newWidth) {
  width = newWidth
}

export {isGameOver, width, flag, size, changeGameOver, addFlag, removeFlag, editWidth}