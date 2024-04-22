export function writeTerminalMessages( DOM, terminalStructure, callback, callbackParam) {
    const terminalStages = Object.keys( terminalStructure);
    let stage = 0;
    setInterval(() => {

        if( stage >= terminalStages.length) {
            ClearAllIntervals();
            callback( callbackParam );
            return
        }
        
        const messageArray = terminalStructure[terminalStages[stage]];
        
        const li = document.createElement( 'li');
        messageArray.forEach( message => {
            
            li.innerHTML += message + ' ';
        });
        DOM.append( li);
        
        stage++

    }, 450);
}

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++) window.clearInterval(i);
}