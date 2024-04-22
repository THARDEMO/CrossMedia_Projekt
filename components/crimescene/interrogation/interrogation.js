import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';

import { loading } from '../../../identities/loading.js';
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';


export const interrogations = {
    domID: 'Interrogations',
    parentID: 'CrimeScenes',
    elementType: 'section',
    
    crimeId: null,

    preRender: ( crimeId ) => {
        interrogations.crimeId = crimeId;
        cManager.renderComponent( interrogations );
    },
    render
}

async function render( DOM ) {
    const id = interrogations.crimeId;

    loading( DOM );

    const crimescene = await STATE.Get( {entity: 'crimescenes',id: id});
    
    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
        <div class="InterrogationContainer"></div>
    `;

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction,  InterrogationPhase, {
        phase: 0,
        DOM: DOM.querySelector( '.InterrogationContainer'),
        crimescene: crimescene,
    });

}




function InterrogationPhase( { phase, DOM, crimescene }) {
    const phaseKey = Object.keys( crimescene.interrogation)[phase];
    
    DOM.innerHTML = 'null'

    const interrogation = crimescene.interrogation[phaseKey];
    
    DOM.innerHTML += `
        <video controls>
            <source src="../../api/media/videos/${interrogation.video}">
        </video>
    `

    DOM.querySelector( 'video').onended = () => {

        if( phaseKey === 'last' ) {
            DOM.innerHTML = `conclusion here...`;
            return
        }
        
        interrogation.answers.forEach(answer => {

            const answerButton = document.createElement( 'button');
            answerButton.textContent = answer;
        
            answerButton.onclick = () => {
                InterrogationPhase({
                    phase: phase += 1,
                    DOM: DOM,
                    crimescene: crimescene,
                })
            }

            DOM.append( answerButton);
        });

    };
}