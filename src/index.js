import './normalize.css';
import './style.css';

import { startGame, addListeners, startGame2 } from './game_logic';

//initialize
/* startGame();
addListeners(); */

//cache DOM
const startButton = document.getElementById('start');

//bind events
startButton.addEventListener('click', startGame2);
/* startButton.addEventListener('click', addListeners);
 */

//functions
