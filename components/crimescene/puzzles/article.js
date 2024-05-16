import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';
import { PubSub } from '../../../Logic/PubSub.js';
import { loading } from '../../../identities/loading.js';
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';
import { solvedCrimescene } from '../solvedCS.js';

export const article = {
    domID: 'Puzzle',
    parentID: 'CrimeScenes',
    elementType: 'section',
    
    crimeId: null,

    preRender: ( crimeId ) => {
        article.crimeId = crimeId;
        cManager.renderComponent( article );
    },
    render
}

async function render( DOM ) {
    const id = article.crimeId;

    loading( DOM );

    const crimescene = await STATE.Get( {entity: 'crimescenes', id: id});


    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
        
        <div class="PuzzleContainer hiddenElement">
            <picture>
                <img src="./api/media/images/${crimescene.article_img}">
            </picture>
            <button>Jag har läst artikeln</button>
        </div>
    `;

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction,  () => {

        DOM.querySelector( '.hiddenElement').classList.remove( 'hiddenElement');

        DOM.querySelector( 'button').onclick = async() => {

            const response = await STATE.Post({
                entity: 'crimescenes',
                crimescene_id: id, 
                user_id: STATE.currentUserID(),
                crimescene_answer: 'inget möjligt svar...',
            })

            solvedCrimescene( crimescene, DOM);
        }
    });
}