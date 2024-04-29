import { router } from '../router.js';

export function NavComp() {

    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get('view');

    const nav = document.createElement("nav")
    const date = new Date()
    const hours = date.getHours().toString().padEnd(0, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const Time = (`${hours}:${minutes}`);


    nav.innerHTML = `
        <div class="nav--flex">
            <img class="PoliceIcon" src ="./Images/Polisen.png"></img> 
            <div>${Time}</div>
        </div>
    `;

    if( pageParam !== 'home') {
        nav.innerHTML += '<p id="HomePageBtn">← meny</p>';
        let HomePageBtn = nav.querySelector("#HomePageBtn")    
        router('home', HomePageBtn)
    }

    document.body.prepend(nav)
}