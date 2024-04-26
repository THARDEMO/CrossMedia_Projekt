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
    const id = urlParams.get('message_id');

    console.log( id);
    const messages = await STATE.Get({ entity: 'messages', id: STATE.currentUserID() });

    let Messages = [{
        ToUser: ["hello where are u?",
            "how are u?",
            "Awnser!"],
        FromUser: ["im at home was just gonna take a nap!", "what do you want?"],
        timestamp: 1713769273,
    },
    {
        ToUser: ["hello where are u?"],
        FromUser: ["im at home was just gonna take a nap!"],
        timestamp: 1713769273,
    },
    {
        ToUser: ["hello where are u?"],
        FromUser: ["im at home was just gonna take a nap!"],
        timestamp: 1713769273,
    }]

    textBuilder(Messages, DOM)



}