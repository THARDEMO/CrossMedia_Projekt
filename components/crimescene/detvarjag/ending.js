import * as cManager from '../../cManager.js'
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';

import { messageEnding } from './message_ending.js';

export const ending = {
    domID: 'Ending',
    parentID: 'CrimeScenes',
    elementType: 'section',
    
    crimeId: null,

    preRender: ( crimeId ) => cManager.renderComponent( ending ),
    render
}


function render( DOM) {


    DOM.innerHTML = `
        <h1>Valet</h1>
        <ul id="terminalContainer"></ul>
        <div class="optionsContainer">
            <button class="hiddenElement erkänn">Erkänn Allt.</button>
            <button class="hiddenElement undanröj">Undanröj alla bevis.</button>
            <button class="hiddenElement ange">Falskt ange MFF-Thomas.</button>
        </div>
    `;

    const goodending = document.createElement('div');
    goodending.classList.add('goodending');
    goodending.classList.add('hiddenEnding');
    goodending.innerHTML = `        
        <picture>
            <img src="./api/media/images/glad_zlatan.png">
        </picture>
    `;
    document.body.prepend( goodending)

    const badending = document.createElement('div');
    badending.classList.add('badending');
    badending.classList.add('hiddenEnding');
    badending.innerHTML = `        
        <picture>
            <img src="./api/media/images/zlatan_besviken.png">
        </picture>
    `;
    document.body.prepend( badending)

    
    const goodAudio = new Audio( './api/media/audio/zlatan_glad.mp3');
    const badAudio = new Audio( './api/media/audio/zlatan_missnöjd.mp3');

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), messageEnding, displayOptions, DOM);
    
    function displayOptions( DOM ) {
        DOM.querySelectorAll( '.hiddenElement').forEach(e=>e.classList.remove( 'hiddenElement'));
    
        DOM.querySelector('.erkänn').onclick = () => {
            goodending.classList.remove('hiddenEnding');
            goodAudio.play();
            goodAudio.onended = () => {
                localStorage.clear();
                window.location.reload();
            }
            
        }

        DOM.querySelectorAll( 'button:not(.erkänn)').forEach(b=>b.onclick = () => {
            badending.classList.remove( 'hiddenEnding');
            badAudio.play();

            badAudio.onended = () => {
                localStorage.clear();
                window.location.reload();
            }
        })
    }
}
