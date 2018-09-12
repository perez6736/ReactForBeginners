import Rebase from 're-base';
import firebase from 'firebase'; 

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAb-vCNk59CFqEiQuSn6MkykGiXIGEhBaQ",
        authDomain: "catch-of-the-day-dan-perez.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-dan-perez.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//named export 
export { firebaseApp }; 

//this is default export 
export default base; 