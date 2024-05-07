import { router } from '../../identities/router.js';
import { writeTerminalMessages } from '../../identities/terminalMessages.js';


export function solvedCrimescene( crimescene, DOM ) {
    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <ul id="terminalContainer"></ul> 
        <div class="actionsContainer">
            <button class="exitCM hiddenElement"></button>
            <button class="restartCM hiddenElement"></button>
        </div>   
    `;

    //QUIT BUTTON
    router( 'home', DOM.querySelector( '.exitCM'));
    // RESTART BUTTON
    router( 'crimescene', DOM.querySelector( '.restartCM'));


    const terminalSuccess = {
        status: ['STATUS:', '<span class="highlighted-terminal terminal-success">Löst.</span>'],
        svar: [ 'SVAR:', `<span class="highlighted-terminal terminal-loading">${crimescene.answer}</span>`],
        update: [ 'UPPDATERAR: . . .'],
        message: [ 'Nya <span class="highlighted-terminal terminal-connected">Meddelanden</span> & <span class="highlighted-terminal terminal-connected">Anteckningar</span> tillgängliga.'],
        continue: [ 'Fortsätt undersöka brottsplatser och få mer information om vandalismen.']
    };

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), terminalSuccess, () => {
        DOM.querySelectorAll( '.hiddenElement').forEach(C => C.classList.remove( 'hiddenElement'));
    })

}