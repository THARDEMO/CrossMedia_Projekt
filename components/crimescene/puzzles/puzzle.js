import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';
import { PubSub } from '../../../Logic/PubSub.js';
import { loading } from '../../../identities/loading.js';
import { writeTerminalMessages } from '../../../identities/terminalMessages.js';
import { solvedCrimescene } from '../solvedCS.js';

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


    DOM.innerHTML = `
        <h1>${crimescene.name}</h1>
        <p>type of crimescene: ${crimescene.type}</p>
        <ul id="terminalContainer"></ul>
        
        <div class="PuzzleContainer hiddenElement">
            <picture>
                <img src="./api/media/images/${crimescene.pussleIMG}">
            </picture>
            <form> 
                <input placeholder="Svar"></input>
                <button>Validera</button>
            </form>
            <p class="inputMessage"></p>
        </div>
    `;

    if( crimescene.mp3) {
        console.log('audio!!!')
    }

    writeTerminalMessages( DOM.querySelector( '#terminalContainer'), crimescene.introduction,  () => {

        DOM.querySelector( '.hiddenElement').classList.remove( 'hiddenElement');

        const form = DOM.querySelector( 'form');
        const input = form.querySelector( 'input');

        input.oninput = () => input.value = input.value.toUpperCase();

        form.onsubmit = async(e) => {
            e.preventDefault()
            
            if( !input.value ) return
            if( input.value != crimescene.answer) return displayInputMessage( input.value, 'Fel vid validation: Fel svar', 'Error');
            
            displayInputMessage( input.value, 'Sänder svar till server:', 'Loading');

            const response = await STATE.Post({
                entity: 'crimescenes',
                crimescene_id: id, 
                user_id: STATE.currentUserID(),
                crimescene_answer: input.value,
            })

            if( !response) return displayInputMessage( 'Försök igen', 'Någonting gick snett...', 'Connected');

            solvedCrimescene( crimescene, DOM);
        }
    });
}

function displayInputMessage( inputContent, message, klass ) {
    const inputMessage = document.querySelector( '.inputMessage');
    setTimeout(()=>{
        inputMessage.innerHTML = `${message} - <span class="highlighted-terminal" style="color:var(--terminal${klass})">${inputContent}</span>`;
    }, 200)
}

