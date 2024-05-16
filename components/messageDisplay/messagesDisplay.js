import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { textBuilder } from "./messageBuilder.js";
import { NavComp } from '../../identities/nav/nav.js';
import { timestampSorter } from '../../Logic/timestampSorter.js';



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

    const Messages = await STATE.Get(
        {
            entity: 'messages',
            id: STATE.currentUserID(),
            params: `conversation_id=${messenger_id}`
        });

    let nameDiv = document.createElement("div")
    nameDiv.classList.add("nameOfMessenger");
    nameDiv.innerHTML = `<p>${name}</p>`
    DOM.append(nameDiv)


    if (messenger_id === "3") {
        console.log("hej");
        let message_time_container = document.createElement("div")
        let TimestampDiv = document.createElement("div")
        let messageContainer = document.createElement("div")

        DOM.append(message_time_container)
        message_time_container.append(TimestampDiv)
        message_time_container.append(messageContainer)

        TimestampDiv.innerHTML = `<p>igår 22:05</p>`
        message_time_container.classList.add("message_time_Container")
        messageContainer.classList.add("messageContainer")
        TimestampDiv.classList.add("messagesTime")

        let messageToUserDiv = document.createElement("div");
        messageContainer.append(messageToUserDiv)
        messageToUserDiv.innerHTML = `<p>När är du hemma?</p>`;
        messageToUserDiv.classList.add("messageToUser")
    }

    let messages = timestampSorter(Messages)

    console.log(messages);

    if (messages.length > 0 || messenger_id === "3") {
        messages.forEach(message => {
            console.log("message", messages);
            textBuilder(message, DOM)
        });

    } else {
        DOM.innerHTML = `<p id="NoMessages">You have no messages.</p>`
    }

    window.scrollTo(100, 100)


}

