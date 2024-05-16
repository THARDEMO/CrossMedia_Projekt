import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';

import { loading } from '../../../identities/loading.js';
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';
import { solvedCrimescene } from '../solvedCS.js';


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

    // loading( DOM );

    const crimescene = await STATE.Get( {entity: 'crimescenes', id: id});
    
    console.log( crimescene);

    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
        <div class="InterrogationContainer"></div>
        <div class="messageContainer"></div>
    `;

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction,  InterrogationPhase, {
        phase: 0,
        DOM: DOM.querySelector( '.InterrogationContainer'),
        crimescene: crimescene,
    });

}


function InterrogationPhase( { phase, DOM, crimescene }) {

    //NO MORE PHASES
    if( phase >= Object.keys( crimescene.interrogation).length ) return endPhase( DOM, crimescene);

    const phaseKey = Object.keys( crimescene.interrogation)[phase];
    DOM.innerHTML = null;
    const interrogation = crimescene.interrogation[phaseKey];
    
    DOM.innerHTML += `
        <video controls autoplay>
            <source src="./api/media/videos/${interrogation.video}">
        </video>
        <div class="ResponseContainer"></div>
    `

    // DOM.querySelector( '.video').innerHTML = `<source src="./api/media/videos/${interrogation.video}"></source>`;

    DOM.querySelector( 'video').onended = () => {
        if( interrogation.answers === null ) return endPhase( DOM, crimescene);

        document.querySelector('.messageContainer').innerHTML = ''

        interrogation.answers.forEach(answer => {

            const answerButton = document.createElement( 'button');
            answerButton.textContent = answer.preview;
        
            answerButton.onclick = () => {
                
                DOM.querySelector('.ResponseContainer').innerHTML = null;
                document.querySelector('.messageContainer').innerHTML = `
                    <p>${answer.message}<p>
                `;

                setTimeout(()=>{
                    InterrogationPhase({
                        phase: phase += 1,
                        DOM: DOM,
                        crimescene: crimescene,
                    })

                }, 500);
            }

            DOM.querySelector('.ResponseContainer').append( answerButton);
        });

    };
}

async function endPhase( DOM, crimescene ) {


    const response = await STATE.Post({
        entity: 'crimescenes',
        crimescene_id: crimescene.id, 
        user_id: STATE.currentUserID(),
        crimescene_answer: 'inget möjligt svar...',
    })

    console.log( response);

    const container = document.createElement( 'div');
    container.classList.add( 'InterrogationsActionsContainer')
    container.innerHTML = `
        <button class="continue">Fortsätt</button>
        <button class="restart">Starta Om</button>    
    `;

    container.querySelector( '.continue').onclick = () => {
        solvedCrimescene( crimescene, document.querySelector( '#Interrogations'));
    }

    container.querySelector( '.restart').onclick = () => InterrogationPhase({phase:0,DOM:DOM,crimescene:crimescene});

    DOM.append( container);
}