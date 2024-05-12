import * as cManager from '../cManager.js'
import { LR } from './LR/LR.js';
import { StartPageNav } from '../../../identities/nav/nav.js';

export const component = {
    domID: 'Start',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

function render(DOM) {
    StartPageNav()

    DOM.innerHTML = `
    
    <div id="containerStart">
        <img id="PoliceIconStart" src ="./Images/Polisen.png"></img>
        
        <h1>Crossmedia project</h1>
        <p>förklara på denna sidan om projektet och hur man spelar osv...</p>

        <div id="LRButtonContainer"> 
            <button id="loginBtn">Logga In</button>
            <button id="registerBtn">Registrera Konto</button>
        </div>
    </div>
   

    `;

    DOM.querySelector('#loginBtn').onclick = () => LR.preRender('Logga In');
    DOM.querySelector('#registerBtn').onclick = () => LR.preRender('Registrera Konto');


}