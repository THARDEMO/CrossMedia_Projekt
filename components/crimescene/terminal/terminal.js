import * as STATE from '../../../Logic/state.js';
import * as cManager from '../../cManager.js';
import { structure } from './structure.js';

import { writeTerminalMessages } from '../../../identities/terminalMessages.js';

export const terminal = {
    domID: 'terminalContainer',
    parentID: 'CrimeScenes',
    elementType: 'ul',
    
    preRender: () => cManager.renderComponent( terminal),
    render
}

function render( DOM ) {

    writeTerminalMessages( DOM, structure.terminal, terminalLogin, DOM);

} 

function terminalLogin( DOM ) {
    const form = document.createElement( 'form');
    form.innerHTML = `
        <input placeholder="_"></input>
        <button>enter</button>
    `
    DOM.append( form);

    form.querySelector( 'input').focus();

    form.onsubmit = async ( e ) => {
        e.preventDefault()
        const code = form.querySelector( 'input').value;
        if( !code) return;
        form.remove();

        DOM.innerHTML += `
            <li> <span class="highlighted-terminal terminal-connected">${code}</span></li>
            <li> <span class="highlighted-terminal terminal-loading">Sending pre requests . . .</span></li>
        `;

        /// POST TO SERVER
        const resource = await STATE.Post( 'terminal', {
            entity: 'crimescenes',
            key_code: code,
            user_id: STATE.currentUserID()
        });

        if( !resource) return writeTerminalMessages( DOM, structure.terminalError, terminalLogin, DOM);

        writeTerminalMessages( DOM, structure.terminalSuccess, () => {
            window.location = window.location.origin + `/?view=crimescene&id=${resource.crime_id}`;
        })

    }
}