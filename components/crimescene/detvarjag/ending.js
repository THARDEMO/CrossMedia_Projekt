import * as cManager from '../../cManager.js'

export const ending = {
    domID: 'Ending',
    parentID: 'CrimeScenes',
    elementType: 'section',
    
    crimeId: null,

    preRender: ( crimeId ) => cManager.renderComponent( ending ),
    render
}


function render( DOM) {
    DOM.innerHTML = 'IT WAS YOU ALL ALONG';
}