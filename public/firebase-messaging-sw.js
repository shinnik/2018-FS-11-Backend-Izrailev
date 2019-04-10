
importScripts("https://www.gstatic.com/firebasejs/5.8.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.8.6/firebase-messaging.js");
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
