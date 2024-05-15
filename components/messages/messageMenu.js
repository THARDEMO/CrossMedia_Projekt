import { router } from '../../identities/router.js';

export function displayMenu(Conversations, Messages, parentDOM) {
    console.log(Messages);
    Conversations.forEach(convo => {

        let displayedMessage = document.createElement("div")
        displayedMessage.classList.add("displayedMessages")

        displayedMessage.innerHTML = `<div id="messenger"><p>${convo.name}</p></div>`
        parentDOM.append(displayedMessage)


        router('messageDisplay', displayedMessage, `message_id=${convo.id}&name=${convo.name}`);

    });
}