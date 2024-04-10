import { fetcher } from './fetcher.js';
import { PubSub } from './PubSub.js';

const path = '../api/';

let STATE = {
    loginKey: () => localStorage.getItem( 'keyOfPassage'),
};

export async function update( data ) {
    const { entity, fields = [], method = 'POST', file = null} = data;

    if( file ) STATE['tmpfile'] = file;

    const updateDB = new Request( `${path}${method}.php`, {
        method: method,
        body: JSON.stringify( {entity: entity, fields: fields}),
    });

    const response = await fetcher( updateDB);

    switch( entity ) {
        case 'artworks':
            await update({ 
                entity: 'user_artworks',
                fields: [
                    {user_id: currentUserID()},
                    {artwork_id: response}
                ] 
            })
            break;
        case 'user_artworks':
            let formData = STATE['tmpfile'];
            formData.append( 'artwork_id', response);
         
            const uploadData = new Request( `${path}upload.php`, {
                method: 'POST',
                body: formData,
            })

            return await fetch( uploadData);
            break;
    }

    PubSub.publish
    ({
        event: 'STATE::updated',
        detail: {entity: entity, id: response}
    });
}

export async function get( data ) {
    const { entity, fields = null, type_id = null} = data;

    if( !STATE[entity] || STATE[entity].id != fields) {
        
        let rqstString = `${path}GET.php?entity=${entity}&fields=${fields}`;
        if( type_id) rqstString += `&type_id=${type_id}`;

        const getDB = new Request( rqstString);
        const response = await fetcher( getDB)
        STATE[ entity ] = response; 
    }

    PubSub.publish
    ({
        event: 'STATE::sending',
        detail: {entity: entity, ...STATE[entity]},
    });

}

export const currentUserID = () => JSON.parse(checkPassage());


//EXEPTIONS LOGIN / LOGOUT
export const checkPassage = () => STATE.loginKey();
export async function login({ username, password }) {

    const loginRqst = new Request( `${path}login.php`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    
    const response = await fetcher( loginRqst );
    
    if( !response) return console.log( 'error');

    localStorage.setItem( 'keyOfPassage', JSON.stringify( response ));

    PubSub.publish
    ({
        event: 'STATE::LoggedIn',
        detail: null,
    });
}
export function logout() {
    localStorage.clear();
    location.reload();
}