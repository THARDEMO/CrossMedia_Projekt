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

    console.log(name);
    const messages = await STATE.Get({ entity: 'messages', id: STATE.currentUserID() });


    let Messages = [{
        name: "chefen",
        conversation: [{
            ToUser: ["Its chefen where where are u?",
                "how are u?",
                "Awnser!"],
            FromUser: ["im at home was just gonna take a nap!", "what do you want?"],
            timestamp: 1713763000,
        },
        {
            ToUser: ["hello where are u?"],
            FromUser: ["im at home was just gonna take a nap!"],
            timestamp: 1713761000,
        },
        {
            ToUser: ["hello where are u?"],
            FromUser: ["im at home was just gonna take a nap!"],
            timestamp: 1713762000,
        },
        {
            ToUser: ["hello where are u?"],
            FromUser: ["im at home was just gonna take a nap!"],
            timestamp: 1713760000,
        }]

    },
    {
        name: "Vittne",
        conversation: [{
            ToUser: ["Its Vittne where are u?",
                "how are u?",
                "Awnser!"],
            FromUser: ["im at home was just gonna take a nap!", "what do you want?"],
            timestamp: 1713769273,
        }]
    },
    {
        name: "Korvgubben",
        conversation: [{
            ToUser: ["Its Korvgubben where are u?",
                "how are u?",
                "Awnser!"],
            FromUser: ["im at home was just gonna take a nap!", "what do you want?"],
            timestamp: 1713769273,
        }]
    }]



    Messages.forEach(message => {
        if (name === message.name) {
            message.conversation.sort((a, b) => a.timestamp - b.timestamp);
            textBuilder(message, DOM)
        }
    });


}