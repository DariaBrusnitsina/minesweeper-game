import './../styles/index.scss';
import header from '../components/Header';
import board from '../components/Board';
import panel from '../components/Panel';

const body = document.querySelector('body');
body.classList.add('container')
const row = document.createElement('div');
row.classList.add('row');
row.appendChild(panel);
row.appendChild(board);
body.append(header, row)