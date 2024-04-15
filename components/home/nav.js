export function NavComp(parentDOM) {
    const nav = document.createElement("nav")
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const Time = (`${hours}:${minutes}`);

    nav.innerHTML = `<p>Start<p/> <div>${Time}</div>`;



    parentDOM.append(nav)
}