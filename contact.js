// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9fEfQViWyOTdILLQLVTH4-iodqzP6ARE",
    authDomain: "food-app-41600.firebaseapp.com",
    projectId: "food-app-41600",
    storageBucket: "food-app-41600.appspot.com",
    messagingSenderId: "969413251152",
    appId: "1:969413251152:web:bae2c264500e03dfa80155"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("contact us");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    e.preventDefault();

    //Get Form Values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    firestore
        .collection("contact us")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const fn = doc.data().fname;
                if (name === fn) {
                    console.log("Already Exists");
                }

                // console.log("data", doc.data().fname);
            });
        });
    //Save Form Data To Firebase
    db.doc()
        .set({
            name: name,
            email: email,
            message: message,
        })
        .then(() => { })
        .catch((error) => {
            console.log(error);
        });

    //alert
    alert("Your Form Has Been Submitted Successfully");

    //clear form after submission
    function clearForm() {
        document.getElementById("clearFrom").reset();
    }
    clearForm()
});