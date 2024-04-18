export function router( page, DOM, params = null) {

    const origin = window.location.origin;
    const location = window.location;

    DOM.onclick = () => {
        let path = `${origin}?view=${page}`;
        if( params) path += `?${params}`;

        location.href = path;
    }
}