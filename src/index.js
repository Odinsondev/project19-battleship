import './normalize.css';
import './style.css';

import { startShipPlacement } from './game_logic';

//cache DOM
const newGameButton = document.getElementById('new-game');

//bind events
newGameButton.addEventListener('click', startShipPlacement);
