export default ((self) => {
    const ports = [];
    const API_methods = {
        SEND_MESSAGE: "send_message",
        LIST_CHATS: "list_chats",
        LIST_MESSAGES: "list_messages"
    };
    const URL = 'http://127.0.0.1:5050/api';
    self.addEventListener('connect', (event) => {
        const port = event.source;
        // if (!ports.includes(port)) {
        //     console.log(ports.includes(port), 'includes?');
        ports.push(port);
        // }
        console.log(port);
        port.addEventListener('message', (event) => {
            // console.log(port, event.target);
            if (event.data.apiName === API_methods.SEND_MESSAGE) {
                console.log('sending message');
                let data = {
                    jsonrpc: "2.0",
                    method: event.data.apiName,
                    params: {"user_id": event.data.data.user_id,
                        "chat_id": event.data.data.chat_id,
                        "content": event.data.data.content},
                    id: 1,
                };
                let request = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: "no-cors"
                };

                // console.log(request);
                if (event.data.fetch) {
                    fetch(URL,request)
                        .then((response) =>  {
                            let res = JSON.stringify(response);
                            ports.filter(port => port !== event.target).forEach((port) => {
                                port.postMessage(res)
                            });
                            // ports.forEach((port) => port.postMessage(res))
                        })
                        // .then(data => {
                        //     port.postMessage(data);
                        // })
                        .catch(error => console.log(error))
                }
                else {
                    ports.filter(port => port !== event.target).forEach((port) => {
                        port.postMessage('SEND MESSAGE API SYNCHRONIZE')
                    });
                }
            }
            if (event.data.apiName === API_methods.LIST_CHATS) {
                // console.log('list chats');
                let data = {
                    jsonrpc: "2.0",
                    method: event.data.apiName,
                    params: {"user_id": event.data.data.user_id},
                    id: 1,
                };
                let request = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: "no-cors"
                };

                console.log(request);
                if (event.data.fetch) {
                    fetch(URL,request)
                        .then((response) =>  {
                            let res = JSON.stringify(response);
                            ports.filter(port => port !== event.target).forEach((port) => {
                                port.postMessage(res)
                            });
                            // ports.forEach((port) => port.postMessage(res))
                        })
                        .catch(error => console.log(error))
                }
                else {
                    ports.filter(port => port !== event.target).forEach((port) => {
                        port.postMessage('LIST CHATS API SYNCHRONIZE')
                    });
                }

            }
            if (event.data.apiName === API_methods.LIST_MESSAGES) {
                console.log('downloading messages');
                let data = {
                    jsonrpc: "2.0",
                    method: event.data.apiName,
                    params: {
                        "chat_id": event.data.data.chat_id,
                        "content": event.data.data.limit},
                        id: 1,
                };
                let request = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    mode: "no-cors"
                };

                // console.log(request);
                if (event.data.fetch) {
                    fetch(URL, request)
                        .then((response) =>  {
                            let res = JSON.stringify(response);
                            ports.filter(port => port !== event.target).forEach((port) => {
                                port.postMessage(res)
                            });
                            // ports.forEach((port) => port.postMessage(res))
                        })
                        .catch(error => console.log(error))
                }
                else {
                    ports.filter(port => port !== event.target).forEach((port) => {
                        port.postMessage('LIST MESSAGES API SYNCHRONIZE')
                    });
                }
            }
            if (event.data === 'disconnect') {
                ports.splice(ports.indexOf(event.target), 1);
            }
        });
        port.start();
    });
});
