import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';

export const component = {
    domID: 'CrimeScenes',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

async function render( DOM ) {

    DOM.innerHTML = component.domID;

    const button = renderButton();

    DOM.append( button);


    const crimescene = await STATE.Get( {entity: 'crimescenes',id: 1});
}
