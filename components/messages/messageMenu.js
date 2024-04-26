import { router } from '../../identities/router.js';

export function displayMenu(Messages, parentDOM) {
    console.log(Messages);

    Messages.forEach(message => {
        let displayedMessage = document.createElement("div")
        displayedMessage.classList.add("displayedMessages")
        displayedMessage.innerHTML = `<p>${message.name}</p> <p>${message.conversation[0].ToUser[0]}...</p>`
        parentDOM.append(displayedMessage)

        router('messageDisplay', displayedMessage)
    });
}