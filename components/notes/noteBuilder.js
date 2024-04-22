
export function textBuilder(NotesString, parentDOM) {

    let notes = document.createElement("div");
    parentDOM.append(notes)

    notes.innerHTML = `<p>${NotesString}</p>`;
    notes.classList.add("notes")

}


