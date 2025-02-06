// -------------------------form-------firebase------------------ 
// ------

// Unique Firebase Object
var firebaseConfig = {
  apiKey: "AIzaSyB_Jl_3FgNT7bHFRY63_e2FkfuqMkUJz5A",
  authDomain: "phantom-test-site-form.firebaseapp.com",
  databaseURL: "https://phantom-test-site-form-default-rtdb.firebaseio.com",
  projectId: "phantom-test-site-form",
  storageBucket: "phantom-test-site-form.appspot.com",
  messagingSenderId: "514732869106",
  appId: "1:514732869106:web:b65039a4f2e1728aeb976b"
};

// Ensure Firebase is initialized only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the existing initialized app
}

// ------------------------- Initialize EmailJS with Public Key -------------------
emailjs.init("2kZrD3IVCkNfJsW6w"); // Public Key from EmailJS
// ------------------------- End of EmailJS Initialization ----------------------

// -----------------------------------------------

// ------for-firestore-cloud-database--------------------------------------------------------
var firestore = firebase.firestore();

//----Variable to access database collection in firestore cloud
const db = firestore.collection("formData");

// -----------------------------------------------

// Get Submit Form---popup--
let submitButton = document.getElementById("submit");  // Ensure you have this ID on your submit button
let spinner = document.getElementById("spinner");     // Spinner element

// Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", function (e) {
  // Prevent Default Form Submission Behavior
  e.preventDefault();

  // Check if all fields are filled
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("phone").value == "" ||
    document.getElementById("country").value == "" ||
    document.getElementById("city").value == ""
  ) {
    alert("Fill Required Fields!");
    return; // Ensure that the form won't proceed without filling all fields
  }

  // Show Spinner
  spinner.style.display = "block";

  // -------------------------date-stamp------------------------
  let sayDate = () => {
    // Using Date() method
    let dateTimeStamp = Date();
    // Converting the number value to string
    let DateTimeStampVal = dateTimeStamp.toString();
    return "Form was submitted at: " + DateTimeStampVal;
  };
  let sayDateVal = sayDate();

  // Get Form Values
  let Name = document.getElementById("name").value;
  let Phone = document.getElementById("phone").value;
  let Email = document.getElementById("email").value;
  let Enquiry = document.getElementById("enquiry").value;
  let Country = document.getElementById("country").value;
  let City = document.getElementById("city").value;
  let Hospital = document.getElementById("hospital").value;
  let sayDateValStamp = sayDateVal;

  // Save Form Data To Firebase
  const firebaseSave = db.doc().set({
    name: Name,
    phone: Phone,
    email: Email,
    country: Country,
    enquiry: Enquiry,
    city: City,
    hospital: Hospital,
    sayDateVal: sayDateValStamp,
  });

  // Send email using EmailJS
  const emailSend = emailjs.send("service_x2ysvvr", "template_0qgs9u9", {
    name: Name,
    phone: Phone,
    email: Email,
    country: Country,
    city: City,
    hospital: Hospital,
    enquiry: Enquiry,
  });

  // Execute both Firebase save and EmailJS send concurrently
  Promise.all([firebaseSave, emailSend])
    .then((responses) => {
      console.log("Firebase save response:", responses[0]);
      console.log("EmailJS response:", responses[1]);
      alert("Your Form Has Been Submitted Successfully");
      clearForm(); // Clear form after successful submission
    })
    .catch((error) => {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again.");
    })
    .finally(() => {
      // Hide Spinner
      spinner.style.display = "none";
    });
});

// Clear form function
function clearForm() {
  // Ensure this is the correct form ID
  document.getElementById("clearFrom").reset();
  console.log("Form cleared");
}




// ----------mobile screen menu dropdown=------

document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    // Toggle dropdown when clicking on the dropdown toggle
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      e.stopPropagation(); // Stop event from propagating

      // If dropdown is already active, close it
      // If it's not active, open it and close other dropdowns
      if (dropdownContent.classList.contains('active')) {
        dropdownContent.classList.remove('active');
      } else {
        // Close all other active dropdowns
        document.querySelectorAll('.dropdown-content.active').forEach(content => {
          content.classList.remove('active');
        });
        
        // Open this dropdown
        dropdownContent.classList.add('active');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-content.active').forEach(content => {
        content.classList.remove('active');
      });
    }
  });
});


$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".navbar").addClass("nav-sticky");
  } else {
    $(".navbar").removeClass("nav-sticky");
  }
});


// document.addEventListener("DOMContentLoaded", function () {
//   let submitButton = document.getElementById("submit");
//   console.log("Submit button found:", submitButton);

//   if (submitButton) {
//       submitButton.addEventListener("click", function (e) {
//           console.log("Submit button clicked");
//       });
//   } else {
//       console.error("Submit button NOT found! Check if it exists in the HTML.");
//   }
// });