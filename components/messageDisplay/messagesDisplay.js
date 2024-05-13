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
    const name = urlParams.get('name');
    const messenger_id = urlParams.get(`message_id`)
    console.log(messenger_id);

    const messages = await STATE.Get(
        {
            entity: 'messages',
            id: STATE.currentUserID(),
            params: `conversation_id=${messenger_id}`
        });

    let nameDiv = document.createElement("div")
    nameDiv.classList.add("nameOfMessenger");
    nameDiv.innerHTML = `<p>${name}</p>`
    DOM.append(nameDiv)


    messages.forEach(message => {
        console.log(messages);
        message.conversation.sort((a, b) => a.timestamp - b.timestamp);
        textBuilder(message, DOM)
    });

}

