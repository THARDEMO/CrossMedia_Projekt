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
        <img id="PoliceIconStart" src ="./Images/Polisen.png"></img>
        
        <h1>Hitta Zlatans näsa</h1>
        <div id="DiscriptiptionContainer"> 
            <p>Välkommen till malmö poliskårs app för allt gällande vandalismer och brott, speciellt när det gäller stulna näsor. Detta är en upplevelse som låter dig inta rollen som en polis vars uppgift är att lösa den välkända vandalismen på zlatanstatyn.</p>

            <p><em>* Bruksanvisning: Nya utredare uppmanas att läsa *</em></p>
        
            <h3>Menyn</h3>
            <div class="text-picture">
                <img src="./images/homescreen.png"> 
                <p>Detta är sidan som du kommer se mest under spelets gång. Det är hubben som knyter samman appen och alla dess funktioner för att lösa brott.<br><br>Notifikationer gällande anteckningar och meddelanden visas här också.<br><br><em>Se figur vänster</em></p>
            </div>

            <h3>Sidor</h3>
            <ul>
                <li>
                    <h4>Kartor</h4>
                    <p>Detta är sidan som används för att lokera alla brottsplatser markerade av din chef. De syns som en pin på den exakta positionen av brottplatsen.</p>
                    <p>Innehållet av en pin är titel, beskrivning av brottsplats, bild *<em>efter behov</em>* & ledtråd för brottsplatsens lösenord</p>
                </li>
                <li>
                    <h4>Anteckningar</h4>
                    <p>Enligt reglement(<em>1866:37</em>) skall varje polisman anteckna sina tankar efter en brottplats.</p>
                    <p>Dvs. i denna sidan kommer du hitta anteckningar efter varje löst brottplats.</p>
                </li>
                <li>
                    <h4>Meddelanden</h4>
                    <p>Här ser du dina meddelanden, det kommer meddelanden efter varje löst brott av olika folk som vill nå dig.</p>
                    <p><em>* Utredaren uppmanas att hålla koll och läsa igenom nogrant efter varje löst brottsplats *</em></p>
                </li>
                <li>
                    <h4>BrottsAssistent</h4>
                    <p>Polisens nya assistent som hjälper till att presentera brottsplatser. Varje brottplats har ett lösenord kopplat till sig. Ta reda på dem och slå in det i terminalen. När en brottsplats är löst klickar man på den röda knappen för att avsluta och komma ifrån vyn</p>
                    <p><em>Brottsassistenten presenterar brottet och vägleder dig vad som ska göras</em></p>
                    
                </li>
                <li>
                    <h4>Inställningar</h4>
                    <p>Här loggar du ut. Inget mer.</p>
                </li>
            </ul>

            <p><em>* Bruksanvisning Slut *</em></p>

            <h3>Order</h3>
            <p>Din uppgift är att gå till alla brottsplatser & lösa dem, detta kan du göra i okronologisk ordning. Läs Anteckningar & Meddelanden och ta reda på vem som vandaliserat Zlatans näsa.</p>
            <p>Malmös Poliskår litar på dig!</p>

            <p style="text-align:center"><em>Nya poliser behöver registrera ett konto<br>*Lösenordsuppgifter krypteras och sparas säkert i polisens interna system*</em></p>

         
        </div>

        <div id="LRButtonContainer"> 
            <button id="loginBtn">Logga In</button>
            <button id="registerBtn">Registrera Konto</button>
        </div>
   
    `;

    DOM.querySelector('#loginBtn').onclick = () => LR.preRender('Logga In');
    DOM.querySelector('#registerBtn').onclick = () => LR.preRender('Registrera Konto');


}