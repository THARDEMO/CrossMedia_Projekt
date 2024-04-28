import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';

import { loading } from '../../../identities/loading.js';
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';


export const puzzle = {
    domID: 'Puzzle',
    parentID: 'CrimeScenes',
    elementType: 'section',
    
    crimeId: null,

    preRender: ( crimeId ) => {
        puzzle.crimeId = crimeId;
        cManager.renderComponent( puzzle );
    },
    render
}

async function render( DOM ) {
    const id = puzzle.crimeId;

    loading( DOM );

    const crimescene = await STATE.Get( {entity: 'crimescenes', id: id});
    
    console.log( crimescene);

    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
        <div class="InterrogationContainer"></div>
    `;

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction,  () => {

        const imgContainer = document.createElement('div');
        imgContainer.innerHTML = `
            <picture>
                <img src="../../api/media/images/${crimescene.pussleIMG}">
            </picture>
            <input></input>
        `;
        DOM.append( imgContainer);

    });

}