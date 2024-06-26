import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { PubSub } from '../../Logic/PubSub.js';
import { NavComp } from '../../identities/nav/nav.js';
import { timestampSorter } from '../../Logic/timestampSorter.js';
import { loading } from '../../identities/loading.js';

export const component = {
    domID: 'Notes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp()
    DOM.innerHTML = `
    ${loading(DOM)}
    <div class="notesContainer"></div>

    <footer>
        <div>Ln 1, Col 1</div>
        <div><span class="count">69</span> characters</div>
        <div>Windows (CRLF)</div>
        <div>UTF-8</div>
    </footer>  
    `;

    const NoteDOM = DOM.querySelector( '.notesContainer');

    const notifications = await STATE.Get({entity: 'notifications', id: STATE.currentUserID()});
    const notes = await STATE.Get({
        entity: 'notes',
        id: STATE.currentUserID(),
    });

    PubSub.publish
    ({
       event: 'FETCH::removeLoading',
       detail: null,
    })

    if( !notes.length) {
        return renderNoteEntry(NoteDOM, {
            heading: 'Vad ska jag göra nu?',
            timestamp: (Date.now() / 1000),
            notes: ['Bossen gav mig i uppgift imorse att gå och undersöka alla brottsplatser som är markerade på kartan, det är väl dags att sätta igång så att vi kanske kan fånga den skyldige. Hmm om jag lyckas kanske jag kan få den löneökningen som vi diskuterade förra veckan.']
        })
    }

    const NOTES = timestampSorter( notes);
    NOTES.forEach( note => renderNoteEntry( NoteDOM, note));
}

function renderNoteEntry( DOM, note ) {

    const dateformat = formatDate( note.timestamp);
    const noteDOM = document.createElement( 'article');
    noteDOM.id = note.id;

    noteDOM.innerHTML+= `
        <h3>Datalogg: ${note.heading}</h3>
        <h4><em>${dateformat}</em></h4>
        <div class="textcontainer"></div>
    `;

    const textContainer = noteDOM.querySelector( `.textcontainer`);
    note['notes'].forEach( n => textContainer.innerHTML += `<p>${n}</p>`);

    DOM.prepend( noteDOM)
}


function formatDate( timestamp ) {
    const date = new Date(timestamp * 1000)

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${date.getMonth()} / ${date.getDate()} - ${hours}:${minutes}`;
}