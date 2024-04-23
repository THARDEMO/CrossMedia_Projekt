import * as cManager from '../cManager.js'
import * as STATE from '../../Logic/state.js';
import { NavComp } from '../../identities/nav/nav.js';

import * as L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/+esm'

export const component = {
    domID: 'Maps',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

async function render( DOM ) {
    NavComp()

    const { locations, user_solved } = await STATE.Get( {entity: 'locations', id: STATE.currentUserID()});

    const mapContainer = document.createElement( 'div');
    mapContainer.classList.add( 'Map');


    let map = L.map(mapContainer).setView([55.5848040, 12.9884801], 14); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    locations.forEach(location => addMarker(map, location, user_solved.includes( location.id)));

    DOM.append( mapContainer);


    setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
    }, 100);

}

function addMarker( map, location, completed) {

    const { X, Y } = location.location;
    const marker = L.marker([X, Y]).addTo( map)

    const crimeMarker = document.createElement( 'div');
    crimeMarker.innerHTML = `
        <div class="crimeMarker">
            <h1>${location.name}</h1>
            <p>${location.description}</p>
            <img class="locationImage" src="../../api/media/images/${location.image}">
            <p>Lösenords Ledtråd: <em>${location.hints}</em></p>
            <p>Klarad: ${completed}</p>
        </div>
        <img class="markerImg" src="../../Images/Polisen.png">
    `;


    if( !location.image) {
        crimeMarker.querySelector( '.locationImage').remove();
    }

    marker.bindPopup(crimeMarker);
}