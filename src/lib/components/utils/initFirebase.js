import firebase from 'firebase';


// Initialize Firebase

export default function initFirebaseMessaging() {
    var config = {
        apiKey: "AIzaSyBitGjW9gft-dJgvhdkEz2mlwpQAKl2Hcg",
        authDomain: "ttmessenger-fe638.firebaseapp.com",
        databaseURL: "https://ttmessenger-fe638.firebaseio.com",
        projectId: "ttmessenger-fe638",
        storageBucket: "ttmessenger-fe638.appspot.com",
        messagingSenderId: "497364105054"
    };
    firebase.initializeApp(config);

    const messaging = firebase.messaging();
    messaging.requestPermission().then(function() {
        // console.log(messaging.getToken())
        return messaging.getToken();
    }).then(function(token){
        localStorage.setItem('firebase', token)
    })
        .catch(function(err) {
            console.log('Permission denied', err);
        });

    // messaging.onMessage(function(payload){
    //     console.log('onMessage: ',payload);
    // });
}
