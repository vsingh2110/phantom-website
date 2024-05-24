// -------------------------form-------firebase------------------
// ------

//Unique Firebase Object
var firebaseConfig = {
  apiKey: "AIzaSyB_Jl_3FgNT7bHFRY63_e2FkfuqMkUJz5A",
  authDomain: "phantom-test-site-form.firebaseapp.com",
  databaseURL: "https://phantom-test-site-form-default-rtdb.firebaseio.com",
  projectId: "phantom-test-site-form",
  storageBucket: "phantom-test-site-form.appspot.com",
  messagingSenderId: "514732869106",
  appId: "1:514732869106:web:b65039a4f2e1728aeb976b"
};

//Initialize Firebase---
firebase.initializeApp(firebaseConfig);

// -----------------------------------------------

// ------for-firestore-cloud-database--------------------------------------------------------
var firestore = firebase.firestore();

//----Variable to access database collection in firestore cloud
const db = firestore.collection("formData");

// ------------form--contact---page------
//Get Submit Form---popup--
let submitButton2 = document.getElementById("submit-form-page");

//Create Event Listener To Allow Form Submission
submitButton2.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  if (
    document.getElementById("name2").value == "" ||
    document.getElementById("phone2").value == ""
    // || document.getElementById("msg").value == ""
  ) {
    alert("Fill All Fields !");
  } else {
    // -------------------------date-stamp------------------------
    let sayDate = () => {
      // Using Date() method
      let dateTimeStamp = Date();

      // Converting the number value to string
      let DateTimeStampVal = dateTimeStamp.toString();
      return "Form was submitted at: " + DateTimeStampVal;
    };
    let sayDateVal = sayDate();
    //Get Form Values
    let Name = document.getElementById("name2").value;
    let Phone = document.getElementById("phone2").value;
    let Email = document.getElementById("email2").value;
    let Enquiry = document.getElementById("enquiry2").value;
    let sayDateValStamp = sayDateVal;

    firestore
      .collection("formData")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const getName = doc.data().name;
          if (Name === getName) {
            console.log("Already Exists");
          }

          // console.log("data", doc.data().fname);
        });
      });
    //  --------------------------------

    //Save Form Data To Firebase
    db.doc()
      .set({
        name: Name,
        phone: Phone,
        email: Email,
        enquiry: Enquiry,
        sayDateVal: sayDateValStamp
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    //alert
    alert("Your Form Has Been Submitted Successfully");

    //clear form after submission
    function clearForm() {
      document.getElementById("clearFrom2").reset();
    }
    clearForm();
  }
});
