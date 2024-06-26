import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

import { NavComp } from '../../identities/nav/nav.js';
import { terminal } from './terminal/terminal.js';

import { interrogations } from './interrogation/interrogation.js';
import { puzzle } from './puzzles/puzzle.js';
import { article } from './puzzles/article.js';
import { ending } from './detvarjag/ending.js';

export const component = {
    domID: 'CrimeScenes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp( DOM );

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) return terminal.preRender();

    switch( id ) {
        case '9999': return interrogations.preRender( id );
        case '1': return puzzle.preRender( id );

        case '2': return article.preRender( id );

        case '3': return interrogations.preRender( id );

        case '4': return puzzle.preRender( id );
        case '5': return interrogations.preRender( id ); 
        case '6': return interrogations.preRender( id ); 

        case '8': return puzzle.preRender( id ); 
        case 'detvarjag': return ending.preRender()
        // case '4': return puzzle.preRender( id );

        default: DOM.innerHTML = `Crimescene::${id} Does not exist?!?! What are you doing here officer??`;
    }

}
