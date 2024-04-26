import * as cManager from '../cManager.js';
import { structure } from './structure.js';
import { router } from '../../identities/router.js';
import { NavComp } from '../../identities/nav/nav.js';

import * as STATE from '../../Logic/state.js';


export const component = {
    domID: 'homescreen',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp(DOM);


    const notis = await STATE.Get({entity: 'notifications', id: STATE.currentUserID()});
    console.log( notis);


    for (const button in structure.apps) {
        const { name, route, _class, img } = structure.apps[button];

        let notisContainer = ''
        if( _class && notis[_class]) {
            notisContainer = `<div class="notification">${notis[_class]} notification</div>`;
        }

        const buttonDOM = document.createElement('button');
        buttonDOM.innerHTML = `
            <div>
                <img class="buttonImage--home" src="../../Images/${img}">
                <p>${name}</p>    
            </div>
            ${notisContainer}
        `;
        DOM.append(buttonDOM);


        router(route, buttonDOM);
    }


    const bottomContainer = document.createElement( 'footer');
    bottomContainer.classList.add( 'uselessinformation');


}