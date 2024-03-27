import * as cManager from '../../cManager.js';
import * as STATE from '../../../appLogic/state.js'
import { PubSub } from '../../../appLogic/PubSub.js'

export const component = {
    domID: 'loginForm',
    parentID: '.loginPage',
    elementType: 'form',

    preRender: () => cManager.renderComponent( component),
    render
}

function render( selfDOM) {

    selfDOM.innerHTML = `
        <label for="input['username']">Username:</label>
        <input type="text" name="username"></input>
        
        <label for="input['password']">Password:</label>
        <input type="text" name="password"></input>
    `;

    const SWITCHER = document.createElement( 'button');
    SWITCHER.onclick = ( e ) => {
        e.preventDefault();

        atomicState.page = atomicState.page != 'login' ? 'login' : 'register';

        PubSub.publish
        ({
            event: 'LOGIN::activePage',
            detail: { page: atomicState.page, selfDOM: selfDOM},
        })
    }
    SWITCHER.textContent = `Switch Page`;
    SWITCHER.classList.add( 'switcher');
    selfDOM.append( SWITCHER);

    //PUBLISH SELF DOM & PAGE
    PubSub.publish
    ({
        event: 'LOGIN::activePage',
        detail: { page: atomicState.page, selfDOM: selfDOM},
    })
}

PubSub.subscribe
({
    event: 'LOGIN::activePage',
    listener: ( detail ) => subComponents[detail.page]( detail )
})


// PAGES _____________________________
const atomicState = { page: 'login' }
const subComponents = {
    login: ( detail ) => loginButton( detail ),
    register: ( detail ) => registerButton( detail ),
}

function loginButton({ selfDOM }) {
    document.querySelector('.actions')?.remove();
    
    const button = document.createElement( 'button');
    button.textContent = 'Login';
    button.classList.add( 'actions');

    button.onclick = ( e ) => {
        e.preventDefault();

        const fieldOBJ = {};
        document.querySelectorAll( "form input").forEach( field => fieldOBJ[field.name] = field.value)

        STATE.login( fieldOBJ);

    }

    selfDOM.append( button);
}

function registerButton({ selfDOM }) {
    document.querySelector('.actions')?.remove();

    const button = document.createElement( 'button');
    button.textContent = 'Register';
    button.classList.add( 'actions');

    button.onclick = ( e ) => {
        e.preventDefault();

        let fields = [];
        document.querySelectorAll( "form input").forEach( field => {
            const fieldOBJ = {};
            fieldOBJ[field.name] = field.value

            fields = [...fields, fieldOBJ];
        })

        STATE.update({
            entity: 'users',
            fields: fields,
        });

    }

    selfDOM.append( button);
}

