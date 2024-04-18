export const structure = {
    terminal: {
        initilizer: ['<span class="highlighted-terminal terminal-connected">CrossShell v.3.4.0</span>', 'copyright (c) Malmö University'],
        connection: ['Attempting connection to internal sytems'],
        connectionMade: ['<span class="highlighted-terminal terminal-loading">Connecting . . .</span>'],
        madeConnection: [`Connection made at: <span class="highlighted-terminal terminal-connected">${Date.now()}</span>`],
        fetchingIP: ['<span class="highlighted-terminal terminal-loading">Attempting to locate IP . . .</span>'],
        IP: ['IP location made at:', '<span class="highlighted-terminal terminal-connected">40. 91. 103. 157</span>'],
        proceed: ['proceed to input crimescene keyCode . . .'],
        done: ['']
    },
    terminalError: {
        connection: ['Attempting connection to internal sytems'],
        initilizer: ['<span class="highlighted-terminal terminal-loading">connecting . . .</span>'],
        decoding: ['Decoding response from server:', `<span class="highlighted-terminal terminal-connected">${Date.now()}</span>`],
        error: ['ERROR::404', '<span class="highlighted-terminal terminal-error"> Wrong crimescene keyCode . . .</span>'],
        intruction: ['Reenter a new crimescene keyCode.'],
    },
    terminalSuccess: {
        connection: ['Attempting connection to internal sytems'],
        initilizer: ['<span class="highlighted-terminal terminal-loading">connecting . . .</span>'],
        decoding: ['Decoding response from server:', `<span class="highlighted-terminal terminal-connected">${Date.now()}</span>`],
        success: ['<span class="highlighted-terminal terminal-success">Access granted to crimescene</span>'],
        redirecting: ['<span class="highlighted-terminal terminal-loading">Redirecting . . .</span>']

    },
}