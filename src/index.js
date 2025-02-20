import './normalize.css';
import './style.css';

import { startGame, addListeners, startGame2 } from './game_logic';

//initialize
/* startGame();
addListeners(); */

//cache DOM
const placeButton = document.getElementById('place');

//bind events
placeButton.addEventListener('click', startGame2);

//functions
