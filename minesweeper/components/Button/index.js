import htmlToElement from '../../utils/htmlToElement';
import './index.scss';
import ButtonHTML from './index.html';

const Button = ( title, onClick, className ) => {
  const btn = htmlToElement(ButtonHTML)
  btn.innerText = title;
  btn.classList.add(className);
  btn.addEventListener('click', onClick)
  return btn;
}

export default Button;

