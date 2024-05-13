import * as cManager from '../cManager.js';
import { NavComp } from '../../identities/nav/nav.js';

export const component = {
    domID: 'page404',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( selfDOM ) {

    NavComp( selfDOM );

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('view');


    selfDOM.innerHTML = `

        <h1><span>404</span> - ${page} existerar ej...</h1>
        <p>Återgå till <em>MENY</em> för att fortsätta lösa alla tillgängliga brott, du kommer klara detta om du kämpar på! Malmös Poliskår lägger sitt fulla förtroende i dig. Hitta näsan!</p>
    
    `;
}