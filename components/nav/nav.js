import { router } from '../../identities/router.js';


export function NavComp(parentDOM) {
    const nav = document.createElement("nav")
    parentDOM.append(nav)
    const date = new Date()
    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const Time = (`${hours}:${minutes}`);

    nav.innerHTML = `<p id="HomePageBtn">Start<p/> <img class="policeNav" src ="../Images/Polisen.png"></img> <div>${Time}</div>`;


    let HomePageBtn = document.getElementById("HomePageBtn")

    router('home', nav, HomePageBtn)
}