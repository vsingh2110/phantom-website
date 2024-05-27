// ----select---counters--section--on--scroll----------

window.addEventListener("scroll", function () {
  var element = document.querySelector(".counters");
  var position = element.getBoundingClientRect();

  // checking whether fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    let valueDisplays = document.querySelectorAll(".num");
    let interval = 2000;
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue === endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }

  // checking for partial visibility
  if (position.top < window.innerHeight && position.bottom >= 0) {
    console.log("Element is partially visible in screen");
  }
});

// ------------running-----counters----jscode---------

// let valueDisplays = document.querySelectorAll(".num");
// let interval = 4000;
// valueDisplays.forEach((valueDisplay) => {
//   let startValue = 0;
//   let endValue = parseInt(valueDisplay.getAttribute("data-val"));
//   let duration = Math.floor(interval / endValue);
//   let counter = setInterval(function () {
//     startValue += 1;
//     valueDisplay.textContent = startValue;
//     if (startValue === endValue) {
//       clearInterval(counter);
//     }
//   }, duration);
// });

// -------------------------------navbar- sticky -code---------------------------------
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".navbar").addClass("nav-sticky");
  } else {
    $(".navbar").removeClass("nav-sticky");
  }
});

// -----------------------owl carousel-----------------------------------------------

$(".testmonial_slider_area").owlCarousel({
  autoplay: true,
  slideSpeed: 1000,
  items: 3,
  loop: true,
  nav: true,
  navText: [
    '<i class="fa fa-arrow-left fa-2x"></i>',
    '<i class="fa fa-arrow-right fa-2x"></i>'
  ],
  margin: 30,
  dots: true,
  responsive: {
    320: {
      items: 1
    },
    767: {
      items: 2
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
});

// ---------------------------Owl carousle code --ends-------------------------------

// --------------pop-up-------------form-------------------------
// Validating Empty Field

// ---------------------------------------------------
// -----------------------------------------------
// function check_empty() {
//   if (
//     document.getElementById("name").value === "" ||
//     document.getElementById("phone").value === ""
//     // || document.getElementById("msg").value == ""
//   ) {
//     alert("Fill All Fields !");
//   } else {
//     document.getElementById("form").submit();
//     alert("Form Submitted Successfully...");
//   }
// }

// --------------------------------
//Function To Display Popup
function div_show() {
  document.getElementById("abc").style.display = "block";
}
//Function to Hide Popup
function div_hide() {
  document.getElementById("abc").style.display = "none";
}

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

// -----------------------------------------------

//Get Submit Form---popup--
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  if (
    document.getElementById("name").value == "" ||
    document.getElementById("phone").value == ""||
    document.getElementById("country").value == ""
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
    let Name = document.getElementById("name").value;
    let Phone = document.getElementById("phone").value;
    let Email = document.getElementById("email").value;
    let Enquiry = document.getElementById("enquiry").value;
    let Country = document.getElementById("country").value;
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
        country:Country,
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
      document.getElementById("clearFrom").reset();
    }
    clearForm();
  }
});

// ------------------------------------------------------------
// ------------------------------------------------------------------------
// -----for realtime db-----------------
// ------for--realtime-database------------------------------------
// -------------------------
// var messagesRef = firebase.database().ref("newForm-database");

// // Listen for form submit
// document.getElementById("clearFrom").addEventListener("submit", submitForm);

// // Submit form
// function submitForm(e) {
//   e.preventDefault();

//   // Get values
//   var name = getInputVal("name");
//   var phone = getInputVal("phone");
//   var email = getInputVal("email");
//   // var phone = getInputVal('phone');
//   var enquiry = getInputVal("enquiry");

//   // Save message
//   saveMessage(name, phone, email, enquiry);

//   // Show alert
//   document.querySelector(".form-alert").style.display = "block";

//   // Hide alert after 3 seconds
//   setTimeout(function () {
//     document.querySelector(".form-alert").style.display = "none";
//   }, 3000);

//   // Clear form
//   document.getElementById("clearFrom").reset();
// }

// // Function to get get form values
// function getInputVal(id) {
//   return document.getElementById(id).value;
// }

// // Save message to firebase
// function saveMessage(name, phone, email, enquiry) {
//   var newMessageRef = messagesRef.push();
//   newMessageRef.set({
//     name: name,
//     phone: phone,
//     email: email,
//     // phone:phone,
//     enquiry: enquiry
//   });
// }



    const modal = document.querySelector("#modal");
    const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector(".close-button");

    openModal.addEventListener("click", () => {
      modal.showModal();
    });

    closeModal.addEventListener("click", () => {
      modal.close();
    });








    // --------------------------sliders-------------------------


    const myslide = document.querySelectorAll('.myslide'),
	  dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
	
	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
}