
export function textBuilder(NotesString, Timestamp, parentDOM) {

    console.log(NotesString);


    let note_Time_Container = document.createElement("div")
    let TimestampDiv = document.createElement("div")
    let noteContainer = document.createElement("div")

    parentDOM.append(note_Time_Container)
    note_Time_Container.append(TimestampDiv)
    note_Time_Container.append(noteContainer)

    NotesString.forEach(note => {
        let notesDiv = document.createElement("div");
        noteContainer.append(notesDiv)
        notesDiv.innerHTML = `<p>${note}</p>`;
        notesDiv.classList.add("notes")
    });


    const date = new Date(Timestamp * 1000)
    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const Time = (`${hours}:${minutes}`);


    TimestampDiv.innerHTML = `<p>${Time}</p>`
    note_Time_Container.classList.add("note_Time_Container")
    noteContainer.classList.add("noteContainer")
    TimestampDiv.classList.add("time")

}


