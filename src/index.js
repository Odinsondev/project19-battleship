import './normalize.css';
import './style.css';

import { startGame, addListeners, startShipPlacement } from './game_logic';

//cache DOM
const placeButton = document.getElementById('place');

//bind events
placeButton.addEventListener('click', startShipPlacement);
