import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { textBuilder } from "./messageBuilder.js";
import { NavComp } from '../../identities/nav/nav.js';



export const component = {
    domID: 'messageDisplay',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {

    NavComp()

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('message_name');

    const messages = await STATE.Get({ entity: 'messages', id: STATE.currentUserID() });
    console.log(messages);

    if (messages !== undefined) {
        messages.forEach(message => {
            if (name === message.name) {
                message.conversation.sort((a, b) => a.timestamp - b.timestamp);
                textBuilder(message, DOM)
            }
        });
    } else {
        DOM.innerHTML = `No messages yet!`
    }
}

