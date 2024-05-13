import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { displayMenu } from './messageMenu.js';

import { NavComp } from '../../identities/nav/nav.js';


export const component = {
    domID: 'Messages',
    elementType: 'section',

    preRender: () => cManager.renderComponent(component),
    render
}

async function render(DOM) {
    NavComp();

    const conversations = await STATE.Get(
        {
            entity: 'conversations',
            id: STATE.currentUserID(),
        });


    const messages = await STATE.Get(
        {
            entity: 'messages',
            id: STATE.currentUserID(),
            params: `conversation_id=1`
        });

    console.log(conversations);


    displayMenu(conversations, messages, DOM)


}