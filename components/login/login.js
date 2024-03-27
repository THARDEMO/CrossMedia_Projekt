import * as cManager from '../cManager.js';

export const component = {
    domID: 'loginPage',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render: ( selfDOM ) => selfDOM.textContent = 'LOGIN', 
}