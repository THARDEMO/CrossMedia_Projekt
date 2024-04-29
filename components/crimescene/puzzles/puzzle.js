import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';
import { PubSub } from '../../../Logic/PubSub.js';
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

        const puzzleContainer = document.createElement('div');
        puzzleContainer.innerHTML = `
            <picture>
                <img src="../../api/media/images/${crimescene.pussleIMG}">
            </picture>
            <form> 
                <input placeholder="Svar"></input>
                <button>Validera</button>
            </form>
            <p class="errorMessage"></p>
        `;

        const form = puzzleContainer.querySelector( 'form');
        form.onsubmit = async(e) => {
            e.preventDefault()
            
            const input = form.querySelector( 'input');

            if( !input.value ) return

            if( input.value != crimescene.answer) return displayInputError( input.value, 'Fel svar' );

            const response = await STATE.Post({
                entity: 'crimescenes',
                crimescene_id: id, 
                user_id: STATE.currentUserID(),
                crimescene_answer: input.value,
            })

            if( !response) return

            solvedCrimescene( crimescene, DOM);


        }
        DOM.append( puzzleContainer);

    });
}

function displayInputError( inputContent, type ) {
    const errorMessage = document.querySelector( '.errorMessage');
    setTimeout(()=>{
        errorMessage.textContent = `Fel vid validation: ${type} - ${inputContent}`;
    }, 200)
}

function solvedCrimescene( crimescene, DOM ) {
    DOM.innerHTML = `
    
        <h1>${crimescene.name}</h1>
        <p>STATUS: löst</p> 
        <p>SVAR: ${crimescene.answer}</p>
        <p>Nya Meddelanden och Anteckningar finns.</p>
        <button>Återgå till Meny</button>
    
    `
}