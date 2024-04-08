import * as cManager from '../../cManager.js';
import { LF } from './loginForm.js';
import { PubSub } from '../../../Logic/PubSub.js';

export const LR = {
    domID: 'loginPage',
    elementType: 'section',
    page: null,
    getDOM: () => document.getElementById( LR.domID),

    preRender: ( type ) => {
        LR.page = type;
        LR.getDOM()?.remove();
        cManager.renderComponent( LR)
    },
    render
}

function render( DOM ) {

    DOM.innerHTML = `
        <div class="flexContainer flex-justify-SB">
            <h3>${LR.page}</h3>  
            <button id="closeLR">X</button>
        </div>
        <form id="LR-form">
            ${returnInputHTML('text', 'Användare')}
            ${returnInputHTML('password', 'Lösenord')}
            <div class="feedbackMessages">
                <p style="color:red" class="error"></p>
                <p style="color:lightgreen" class="success"></p>
            </div>
        </form>
    `;
    submitButton( DOM.querySelector('#LR-form'));
    
    secondaryActionMessage( DOM );
    DOM.querySelector( '#closeLR').onclick = () => DOM.remove();

    //ERRORS
    PubSub.subscribe
    ({
        event: 'LR::error',
        listener: ( detail ) => {
            DOM.querySelector( '.error').textContent = detail;
            setTimeout( () => DOM.querySelector( '.error').textContent = null, 5000)
        },
    })
    //SUCCESS
    PubSub.subscribe
    ({
        event: 'LR::success',
        listener: ( detail ) => {
            DOM.querySelector( '.success').textContent = detail
            setTimeout( () => DOM.querySelector( '.success').textContent = null, 5000)
        },
    })
}

function secondaryActionMessage( parentDOM ) {

    const DOM = document.createElement( 'div');
    DOM.classList.add( 'secondaryAction');

    switch( LR.page) {
        case 'Logga In': 
            DOM.innerHTML = 'Aldrig spelat innan? Registrera dig <em class="emphezisedText">här</em> och börja spela!';
            DOM.onclick = () => LR.preRender( 'Registrera Konto');
        break;
        case 'Registrera Konto':
            DOM.innerHTML = 'Är du redan en spelare? Logga in <em class="emphezisedText">här</em>.';
            DOM.onclick = () => LR.preRender( 'Logga In');
        break;
    }

    parentDOM.append( DOM );
}

function returnInputHTML( type, label, classList) {
    return `
       <div class="inputContainer">
            <label for="input[${label}]">${label}</label>
            <input type="${type}" name="${label}"></input> 
       </div>
    `;
}

function submitButton( formDOM ) {

    const DOM = document.createElement( 'button');
    DOM.type = 'submit';

    switch( LR.page) {
        case 'Logga In': 
            DOM.textContent = 'Logga in';
            DOM.onclick = (e) => {
                e.preventDefault();
                if( !controlInputs()) return;
            }
        break;
        case 'Registrera Konto': 
            DOM.textContent = 'Registrera';
            DOM.onclick = (e) => {
                e.preventDefault();
                if(!controlInputs()) return;

                
            }
        break;
    }

    formDOM.append( DOM);

}

function controlInputs() {
    const inputs = document.querySelectorAll( '.inputContainer > input');
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    for( const input of inputs) {
        const inputContent = input.value;
        console.log( inputContent, input);
        
        if( inputContent.length < 3) {
            PubSub.publish
            ({
                event: 'LR::error',
                detail: 'För få karaktärer, minst antal = 3',
            })
            return false;
        }

        if( format.test( inputContent)) {
            PubSub.publish
            ({
                event: 'LR::error',
                detail: 'Specialtecken är inte tillåtna',
            })
            return false
        }

    }

    return true
}