

export function textBuilder(MessageString, parentDOM) {

    let message_time_container = document.createElement("div")
    let TimestampDiv = document.createElement("div")
    let messageContainer = document.createElement("div")

    parentDOM.append(message_time_container)
    message_time_container.append(TimestampDiv)
    message_time_container.append(messageContainer)

    let Timestamp = MessageString.timestamp;
    const date = new Date(Timestamp * 1000)
    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const Time = (`${hours}:${minutes}`);


    TimestampDiv.innerHTML = `<p>${Time}</p>`
    message_time_container.classList.add("message_time_Container")
    messageContainer.classList.add("messageContainer")
    TimestampDiv.classList.add("messagesTime")

    MessageString.conversation.forEach(message => {

        message.ToUser.forEach(conversation => {
            let messageToUserDiv = document.createElement("div");
            messageContainer.append(messageToUserDiv)
            messageToUserDiv.innerHTML = `<p>${conversation}</p>`;
            messageToUserDiv.classList.add("messageToUser")

        })

        message.FromUser.forEach(conversaion => {
            let messageFromUserDiv = document.createElement("div")

            messageContainer.append(messageFromUserDiv)
            messageFromUserDiv.innerHTML = `<p>${conversaion}</p>`;
            messageFromUserDiv.classList.add("messageFromUser")
        })
    });
}