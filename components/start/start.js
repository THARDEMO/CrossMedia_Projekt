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
        
        <h1>Hitta Zlatans näsa</h1>
        <div id="DiscriptiptionContainer"> </p>Denna hemsidan är vart du kommer att få majoriteten av den information du behöver för att lösa fallet om Zlatans försvunna näsa. </p>
        
            <p>Du behöver skapa ett konto och logga in. På hemsidans startsida har du kartor, där kan du se de utplacerade platserna som är relevanta för att hitta näsan, ta dig till dessa platser!</p>

            <p>Området som kartan visar är över Malmö Stadion.
            Klickar du på de utplacerade punkterna så får du mer information om platsen du behöver besöka (alla brottsplatser kan lösas i en okronologisk ordning).</p>

            <p>Håll utkik på dina meddelanden men även dina antäckningar där du under spelets gång kommer få information som är vesentlig för att lösa fallet.</p> 

            <p>BrottsAssistenten kommer behöva andvändas för varje plats du besöker.
            BrottsAssistenten kräver en kod för varje plats som besöks. När du skrivit in koden kommer du få en utmaning som behövs lösas för att du ska kunna komma vidare i spelet.</p>

        </div>

        <div id="LRButtonContainer"> 
            <button id="loginBtn">Logga In</button>
            <button id="registerBtn">Registrera Konto</button>
        </div>
    </div>
   

    `;

    DOM.querySelector('#loginBtn').onclick = () => LR.preRender('Logga In');
    DOM.querySelector('#registerBtn').onclick = () => LR.preRender('Registrera Konto');


}