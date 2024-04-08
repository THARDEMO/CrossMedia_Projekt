import * as cManager from '../cManager.js'

export const component = {
    domID: 'Maps',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( DOM ) {

    DOM.innerHTML = component.domID;

}