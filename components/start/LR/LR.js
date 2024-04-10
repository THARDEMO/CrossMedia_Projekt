import * as cManager from '../../cManager.js';
import * as STATE from '../../../Logic/state.js';
import { ACCOUNT } from '../../../Logic/accountManager.js';
import { LF } from './loginForm.js';
import { PubSub } from '../../../Logic/PubSub.js';

// console.log( ACCOUNT)

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
            ${returnInputHTML('text', 'Användare', 'username')}
            ${returnInputHTML('password', 'Lösenord', 'password')}
            <div class="feedbackMessages">
                <p style="color:red" class="error"></p>
                <p style="color:lightgreen" class="success"></p>
            </div>
        </form>
    `;
    submitButton( DOM.querySelector('#LR-form'));
    
    secondaryActionMessage( DOM );
    DOM.querySelector( '#closeLR').onclick = () => DOM.remove();


    const errorDOM = DOM.querySelector( '.error');
    const successDOM = DOM.querySelector( '.success');
    //ERRORS
    PubSub.subscribe
    ({
        event: 'LR::error',
        listener: ( detail ) => displayMessage( errorDOM, detail),
    })
    PubSub.subscribe
    ({
        event: 'ERROR::ReachServer',
        listener: ( { response, message }) => displayMessage( errorDOM, `${message}: ${response.status}, try again.`)
    })
    PubSub.subscribe
    ({
        event: 'ERROR::fetcher',
        listener: (detail) => displayMessage( errorDOM, detail)
    })
    //SUCCESS
    PubSub.subscribe
    ({
        event: 'LR::success',
        listener: ( detail ) => displayMessage( successDOM, detail ),
    })

    function displayMessage( container, message ) {
        container.textContent = message;
        setTimeout( () => container.textContent = null, 5000)
    }
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

function returnInputHTML( type, label, target, classList) {
    return `
       <div class="inputContainer">
            <label for="input[${label}]">${label}</label>
            <input type="${type}" name="${label}" data-target="${target}"></input> 
       </div>
    `;
}

function submitButton( formDOM ) {

    const DOM = document.createElement( 'button');
    DOM.type = 'submit';

    const fieldOBJ = {};

    switch( LR.page) {
        case 'Logga In': 
            DOM.textContent = 'Logga in';
            DOM.onclick = (e) => {
                e.preventDefault();
                if( !controlInputs()) return;

                document.querySelectorAll( "form input").forEach( field => fieldOBJ[field.dataset.target] = field.value)
                ACCOUNT.login( fieldOBJ);
            }
        break;
        case 'Registrera Konto': 
            DOM.textContent = 'Registrera';
            DOM.onclick = (e) => {
                e.preventDefault();
                if(!controlInputs()) return;

                document.querySelectorAll( "form input").forEach( field => fieldOBJ[field.dataset.target] = field.value)

                ACCOUNT.register( fieldOBJ);
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
        // console.log( inputContent, input);
        
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