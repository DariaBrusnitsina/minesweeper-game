import './index.scss';
import htmlToElement from '../../utils/htmlToElement';
import Header from './index.html';
import { displaySettings, displayResults } from '../Panel';
import Button from '../Button';
import { createElement } from '../../utils/createElement';
import { localStorageThemeService } from '../../src/changeTheme';

const header = htmlToElement(Header)

const nav = createElement('nav', 'nav')
const h1 = createElement('h1', 'title', 'Minesweeper')
const div = createElement('div', 'nav__links')

const newGameBtn = Button("New game", displaySettings, "button_light")
const resultBtn = Button("Results", displayResults, "button_light")
const themeBtn = Button("Change theme", localStorageThemeService, "button_light")

div.append(newGameBtn, resultBtn, themeBtn)

nav.append(h1, div)
header.appendChild(nav)

export default header
