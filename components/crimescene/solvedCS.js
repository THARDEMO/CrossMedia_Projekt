import { router } from '../../../identities/router.js';
import { writeTerminalMessages } from '../../identities/terminalMessages.js';


export function solvedCrimescene( crimescene, DOM ) {
    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <ul id="terminalContainer"></ul> 
        <div class="actionsContainer hiddenElement">
            <button class="exitCM"></button>
            <button class="restartCM"></button>
        </div>   
    `;

    const terminalSuccess = {
        status: ['STATUS:', '<span class="highlighted-terminal terminal-success">Löst.</span>'],
        svar: [ 'SVAR:', `<span class="highlighted-terminal terminal-loading">${crimescene.answer}</span>`],
        update: [ 'UPPDATERAR: . . .'],
        message: [ 'Nya Meddelanden och Anteckningar tillgängliga.'],
    };

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), terminalSuccess, () => {

        DOM.querySelector( '.hiddenElement').classList.remove( 'hiddenElement');
        

        
    })

}