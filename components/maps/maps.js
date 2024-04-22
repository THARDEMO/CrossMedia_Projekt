import * as cManager from '../cManager.js'
import { NavComp } from '../../identities/nav/nav.js';

import * as L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/+esm'

export const component = {
    domID: 'Maps',
    elementType: 'section',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( DOM ) {
    NavComp()

    const mapContainer = document.createElement( 'div');
    mapContainer.classList.add( 'Map');


    let map = L.map(mapContainer).setView([55.60587, 13.00073], 12); 

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    const testMarker = L.marker([55.58486, 12.98913]).addTo( map);
    const testMarker2 = L.marker([55.59007, 12.99548]).addTo( map);


    DOM.append( mapContainer);


    setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
     }, 100);

}