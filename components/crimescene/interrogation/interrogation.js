import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';

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


    DOM.innerHTML = `<p>LOADING . . .</p>`

    const crimescene = await STATE.Get( {entity: 'crimescenes',id: id});

    console.log( crimescene);
    
    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
    `;

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction, () => {
        DOM.innerHTML += `
            <video controls>
                <source src="../../api/media/videos/${crimescene.media.first}">
            </video>
        `

        DOM.querySelector( 'video').onended = () => {
            DOM.innerHTML += `
                <button>answer One</button>
                <button>answer Two</button>
            `
        };
    });
}