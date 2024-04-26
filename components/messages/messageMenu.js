import { router } from '../../identities/router.js';

export function displayMenu(Messages, parentDOM) {

    Messages.forEach(message => {

        let displayedMessage = document.createElement("div")
        displayedMessage.classList.add("displayedMessages")
        let messagePreview = message.conversation[0].ToUser[0]
        displayedMessage.innerHTML = `<p>${message.name}</p> <p>${messagePreview.substring(0, 30)}...</p>`
        parentDOM.append(displayedMessage)

        router('messageDisplay', displayedMessage, `message_name=${message.name}`);

    });
}