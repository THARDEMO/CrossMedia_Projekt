import { fetcher } from './fetcher.js';
import { PubSub } from './PubSub.js';

const path = './api/';

let STATE = {
    loginKey: () => localStorage.getItem( 'keyOfPassage'),
    test: [
        {id: 1},
        {id: 2},
    ]
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

export async function Post( data ) {
    
    const rqst = new Request( `${path}POST.php`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( data)
    })

    const response = await fetcher( rqst);
    
    if(!response) return console.log( 'error')

    return response;
}

export async function Get( data ) {
    const { entity, id = null, refresh = false } = data

    if( STATE[entity] && !refresh) {
        //RETURNS EXISTING DATA ON CLIENT
        if( !id) return cloneArrayOfObjects( STATE[entity]);

        //RETURNS SPECIFIC ROW OF DATA ON CLIENT
        const instance = STATE[entity].find( row => row.id === id);
        return cloneArrayOfObjects( [instance]);
    }
    
    //NO DATA ON CLIENT OR REFRESH CLIENT DATA
    let rqstString = `${path}GET.php?entity=${entity}`;
    if( id) rqstString += `&id=${id}`;

    const rqst = new Request( rqstString);
    const response = await fetcher( rqst );

    if( !response) return console.log( 'error');

    //RETURN NEWLY REFRESHED WHOLE ENTITY
    if( !refresh) {
        STATE[entity] = response;
        return cloneArrayOfObjects( STATE[entity]);
    }

    //RETURN NEWLY REFRESHED SPECIFIC ROW
    let index = STATE[entity].indexOf( row => row.id === id);
    STATE[entity].splice( index, 1);
    STATE[entity].splice( index, 0, response);

    return cloneArrayOfObjects( [STATE[entity][index]]);
}

function cloneArrayOfObjects( arrayOfObjects ) {
    return JSON.parse( JSON.stringify( arrayOfObjects))
    
    if( typeof arrayOfObjects === 'object') return {...arrayOfObjects};
    if( arrayOfObjects.length <= 1) return {...arrayOfObjects[0]}
    return [...arrayOfObjects.map( obj => { 
        if( obj.length ) return cloneArrayOfObjects( obj);
        return {...obj }
    })]
}

export const currentUserID = () => JSON.parse(checkPassage());
export const checkPassage = () => STATE.loginKey();
