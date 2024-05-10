import * as cManager from '../cManager.js';
import * as STATE from '../../Logic/state.js';
import { PubSub } from '../../Logic/PubSub.js';
import { structure } from './structure.js';
import { router } from '../../identities/router.js';
import { NavComp } from '../../identities/nav/nav.js';
import { loading } from '../../identities/loading.js';


export const component = {
    domID: 'homescreen',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp(DOM);

    DOM.innerHTML = loading( DOM);

    const notis = await STATE.Get({entity: 'notifications', id: STATE.currentUserID()});

    PubSub.publish
    ({
       event: 'FETCH::removeLoading',
       detail: null,
    })

    for (const button in structure.apps) {
        const { name, route, _class, img } = structure.apps[button];

        let notisContainer = ''
        if( _class && notis[_class].length) {
            notisContainer = `<div class="notification">${notis[_class].length} notification</div>`;
        }

        const buttonDOM = document.createElement('button');
        buttonDOM.innerHTML = `
            <div>
                <img class="buttonImage--home" src="./Images/${img}">
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