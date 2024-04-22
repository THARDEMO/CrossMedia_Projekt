import * as cManager from '../cManager.js'
import { NavComp } from '../../identities/nav/nav.js';
import { textBuilder } from './noteBuilder.js';

export const component = {
    domID: 'Notes',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

function render(DOM) {

    NavComp(DOM)

    let note = `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `

    textBuilder(note, DOM)
    textBuilder(note, DOM)


}