
export function textBuilder(NotesString, Timestamp, parentDOM) {

    let noteContainer = document.createElement("div")
    let TimestampDiv = document.createElement("div")
    let notesDiv = document.createElement("div");
    parentDOM.append(noteContainer)
    noteContainer.append(TimestampDiv)
    noteContainer.append(notesDiv)

    const date = new Date(Timestamp)
    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const Time = (`${hours}:${minutes}`);
    console.log(Time);

    notesDiv.innerHTML = `<p>${NotesString}</p>`;
    TimestampDiv.innerHTML = `<p>${Time}</p>`
    noteContainer.classList.add("noteContainer")
    TimestampDiv.classList.add("time")
    notesDiv.classList.add("notes")

}


