import * as cManager from '../cManager.js'
import { NavComp } from '../../identities/nav/nav.js';
import * as STATE from '../../Logic/state.js';
import { timestampSorter } from '../../Logic/timestampSorter.js';
import { textBuilder } from './noteBuilder.js';

export const component = {
    domID: 'Notes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp()
    DOM.innerHTML = `

    <div class="notesContainer"></div>

    <footer>
        <div>Ln 1, Col 1</div>
        <div><span class="count">69</span> characters</div>
        <div>Windows (CRLF)</div>
        <div>UTF-8</div>
    </footer>  
    `;

    const notes = await STATE.Get({
        entity: 'notes',
        id: STATE.currentUserID(),
    });

    if( !notes) {
        return DOM.querySelector( '.notesContainer').innerHTML = `
            <article>
                <p>Jag borde lösa någon brottsplats först innan jag kan skriva några dataloggar här...</p>
            </article>
        `;
    }

    const NOTES = timestampSorter( notes);
    NOTES.forEach( note => renderNoteEntry( DOM.querySelector( '.notesContainer'), note));
}

function renderNoteEntry( DOM, note ) {

    const dateformat = formatDate( note.timestamp);
    
    DOM.innerHTML+= `
        <article id="note_${note.id}">
            <h3>Datalogg: ${note.heading}</h3>
            <h4><em>${dateformat}</em></h4>
            <div class="textcontainer"></div>
        </article>
    `;

    const textContainer = DOM.querySelector( `#note_${note.id} > .textcontainer`);

    note['notes'].forEach( n => textContainer.innerHTML += `<p>${n}</p>`);
}


function formatDate( timestamp ) {
    const date = new Date(timestamp * 1000)

    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${date.getMonth()} / ${date.getDate()} - ${hours}:${minutes}`;
}