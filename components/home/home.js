import * as cManager from '../cManager.js';
import { structure } from './structure.js';
import { router } from '../../identities/router.js';
import { NavComp } from '../../identities/nav/nav.js';



export const component = {
    domID: 'homescreen',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

function render(DOM) {

    NavComp(DOM);


    for (const button in structure.apps) {
        const { name, route, img } = structure.apps[button];

        const buttonDOM = document.createElement('button');
        buttonDOM.innerHTML = `
            <img class="buttonImage--home" src="../../Images/${img}">
            <p>${name}</p>
        
        `;
        DOM.append(buttonDOM);


        router(route, buttonDOM);
    }


    const bottomContainer = document.createElement( 'footer');
    bottomContainer.classList.add( 'uselessinformation');


}