export function localStorageThemeService() {

  if (!localStorage.getItem("minesweeperTheme")) {
    let isLight = true
    localStorage.setItem("minesweeperTheme",JSON.stringify(isLight))
    handleChangeTheme(isLight)

  } else {
    let isLight = JSON.parse(localStorage.getItem("minesweeperTheme"))

    if (isLight) {
      handleChangeTheme(!isLight)
      localStorage.setItem("minesweeperTheme",JSON.stringify(!isLight))
    } else {
      handleChangeTheme(!isLight)
      localStorage.setItem("minesweeperTheme",JSON.stringify(!isLight))
    }
  }
}

function handleChangeTheme(isLight) {
  const body = document.querySelector('body')

  if (isLight) {
    body.style.background = "white"
    body.style.color = "black"
  } else {
    body.style.background = '#1e1e1e'
    body.style.color = "white"
  }
}

let isLight = JSON.parse(localStorage.getItem("minesweeperTheme"))
handleChangeTheme(isLight)