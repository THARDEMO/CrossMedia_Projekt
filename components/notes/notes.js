import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { NavComp } from '../nav/nav.js';
import { textBuilder } from './noteBuilder.js';

export const component = {
    domID: 'Notes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {

    NavComp(DOM)

    const notes = await STATE.Get({
        entity: 'notes',
        id: 7,
    });
    console.log(notes)

    notes.forEach(note => {
        textBuilder(note.notes, note.timestamp, DOM)
    });

}