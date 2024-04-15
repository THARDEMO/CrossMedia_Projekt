import * as STATE from '../../Logic/state.js';
import * as cManager from '../cManager.js';
import { structure } from './structure.js';

export const terminal = {
    domID: 'terminalContainer',
    parentID: 'CrimeScenes',
    elementType: 'ul',
    
    preRender: () => cManager.renderComponent( terminal),
    render
}

function render( DOM ) {

    writeTerminalMessages( DOM, structure.terminal, terminalLogin);

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

        DOM.innerHTML += `<li> <span class="highlighted-terminal terminal-connected">${code}</span></li>`;


        /// POST TO SERVER
        const resource = await STATE.Post( 'terminal', {
            entity: 'crimescenes',
            key_code: code,
            user_id: STATE.currentUserID()
        });

        if( !resource) return writeTerminalMessages( DOM, structure.terminalError, terminalLogin);

        writeTerminalMessages( DOM, structure.terminalSuccess, () => {
            window.location = window.location.origin + `/crimescene?id=${resource.crime_id}`;
        })

    }
}

function writeTerminalMessages( DOM, terminalStructure, callback) {
    const terminalStages = Object.keys( terminalStructure);
    let stage = 0;
    setInterval(() => {

        if( stage >= terminalStages.length) {
            ClearAllIntervals();
            callback( DOM );
            return
        }
        
        const messageArray = terminalStructure[terminalStages[stage]];
        
        const li = document.createElement( 'li');
        messageArray.forEach( message => {
            
            li.innerHTML += message + ' ';
        });
        DOM.append( li);
        
        stage++

    }, 450);
}

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
}