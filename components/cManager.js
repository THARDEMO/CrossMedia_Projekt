const queue = {};

export function renderComponent(component, instance) {
    
    const { domID, elementType = 'div', parentID = 'wrapper'} = component;
    let container = document.getElementById( parentID) ? document.getElementById( parentID) : null;
    
    if( !container) return QueueComponent( component, instance);
    
    const DOM = document.createElement( elementType);
    
    if( domID) DOM.id = domID;

    component.render( DOM, instance);
    container.append( DOM);

    resolveQueue();
}


//MAYBE RENDER DOM FIRST THEN QUE
function QueueComponent( component, instance) {
    const queuedComponent = {
        component: component,
        instance: instance,
    }

    if( !queue[component.parentID]) queue[component.parentID] = [ queuedComponent ];
    else queue[component.parentID] = [ ...queue[component.parentID], queuedComponent ];
}

function resolveQueue() {
    
    for( const container in queue) {
    
        if( !document.getElementById( container)) continue;
        
        for( const [ I, C ] of queue[container].entries()) {
            
            queue[container].splice(I, 1);
            if( !queue[container].length) delete queue[container];

            renderComponent( C.component, C.instance);
        }
    }

}