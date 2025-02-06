// ----select---counters--section--on--scroll----------
console.log("main.js is running!");
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



// -----------------------owl carousel-----------------------------------------------

// $(".testmonial_slider_area").owlCarousel({
//   autoplay: true,
//   slideSpeed: 1000,
//   items: 4,
//   loop: true,
//   nav: true,
//   navText: [
//     '<i class="fa fa-arrow-left fa-2x"></i>',
//     '<i class="fa fa-arrow-right fa-2x"></i>'
//   ],
//   margin: 30,
//   dots: true,
//   responsive: {
//     320: {
//       items: 1
//     },
//     767: {
//       items: 2
//     },
//     600: {
//       items: 2
//     },
//     1000: {
//       items: 4
//     }
//   }
// });


// Vanilla JavaScript version
// window.addEventListener('scroll', function () {
//   const navbar = document.querySelector('.navbar');
//   if (window.scrollY > 100) {
//       navbar.classList.add('nav-sticky');
//   } else {
//       navbar.classList.remove('nav-sticky');
//   }
// });

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


//-----------pupup modal--------------------

const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});


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








// --------------------------sliders-------------------------


  const myslides = document.querySelectorAll('.myslide'); // Selecting all elements with class 'myslide'
const dots = document.querySelectorAll('.dot');
let counter = 0; // Initialize counter to 0 for the first slide
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

slidefun(counter);

let timer = setInterval(autoSlide, 7000);

// Loop through slides
function autoSlide() {
    counter = (counter + 1) % myslides.length; 
    slidefun(counter);
}

function plusSlides(n) {
    counter = (counter + n + myslides.length) % myslides.length; // Loop through slides
    slidefun(counter);
    resetTimer();
}

function currentSlide(n) {
    counter = n - 1; // Adjust counter to match array index
    slidefun(counter);
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 7000);
}

function slidefun(n) {
    for (let i = 0; i < myslides.length; i++) {
        myslides[i].classList.remove('active');
        myslides[i].classList.add('fade');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    myslides[n].classList.add('active');
    myslides[n].classList.add('fade');
    dots[n].classList.add('active');
}

const slideshowContainer = document.querySelector('.slider');

slideshowContainer.addEventListener('mouseover', () => {
    clearInterval(timer); // Pause slideshow on hover
});

let resumeTimeout;
slideshowContainer.addEventListener('mouseleave', () => {
    clearTimeout(resumeTimeout); // Clear any existing timeout to avoid multiple timers
    resumeTimeout = setTimeout(() => {
        autoSlide(); // Advance to the next slide immediately
        resetTimer(); // Resume the regular 7-second interval timer
    }, 2000);
});

const playButton = document.querySelector('.play-btn');
const pauseButton = document.querySelector('.pause-btn');

playButton.addEventListener('click', () => {
    timer = setInterval(autoSlide, 7000); // Start slideshow
});

pauseButton.addEventListener('click', () => {
    clearInterval(timer); // Pause slideshow
});
  




//--------------------------original------------------------------ slider-----

  // const myslides = document.querySelectorAll('.myslide'); // Selecting all elements with class 'myslide'
  //   const dots = document.querySelectorAll('.dot');
  //   let counter = 0; // Initialize counter to 0 for the first slide
  //   let isDragging = false;
  //   let startPos = 0;
  //   let currentTranslate = 0;
  //   let prevTranslate = 0;
  //   let animationID;
    
  //   slidefun(counter);
    
  //   let timer = setInterval(autoSlide, 7000);
    

  //   // Loop through slides
  //   function autoSlide() {
  //       counter = (counter + 1) % myslides.length; 
  //       slidefun(counter);
  //   }

  // //   function autoSlide() {
  // //     counter = (counter + 1) % myslides.length;
  // //     slidefun(counter);
  // //     currentTranslate = -counter * slideshowContainer.offsetWidth;
  // //     applyTransform();
  // //     resetTimer();
  // // }
    
  //   function plusSlides(n) {
  //       counter = (counter + n + myslides.length) % myslides.length; // Loop through slides
  //       slidefun(counter);
  //       resetTimer();
  //   }
    
  //   function currentSlide(n) {
  //       counter = n - 1; // Adjust counter to match array index
  //       slidefun(counter);
  //       resetTimer();
  //   }
    
  //   function resetTimer() {
  //       clearInterval(timer);
  //       timer = setInterval(autoSlide, 7000);
  //   }
    
  //   function slidefun(n) {
  //       for (let i = 0; i < myslides.length; i++) {
  //           myslides[i].classList.remove('active');
  //           myslides[i].classList.add('fade');
  //       }
  //       for (let i = 0; i < dots.length; i++) {
  //           dots[i].classList.remove('active');
  //       }
  //       myslides[n].classList.add('active');
  //       myslides[n].classList.add('fade');
  //       dots[n].classList.add('active');
  //   }
    
  //   const slideshowContainer = document.querySelector('.slider');
    
  //   slideshowContainer.addEventListener('mouseover', () => {
  //       clearInterval(timer); // Pause slideshow on hover
  //   });
    
  //   slideshowContainer.addEventListener('mouseleave', () => {
  //       resetTimer(); // Resume slideshow on mouse leave
  //   });
    
  //   const playButton = document.querySelector('.play-btn');
  //   const pauseButton = document.querySelector('.pause-btn');
    
  //   playButton.addEventListener('click', () => {
  //       timer = setInterval(autoSlide, 7000); // Start slideshow
  //   });
    
  //   pauseButton.addEventListener('click', () => {
  //       clearInterval(timer); // Pause slideshow
  //   });
    


















// Adding swiper functionality


// document.addEventListener("DOMContentLoaded", function() {
//   var swiper = new Swiper(".hero-slider", {
//       loop: true,
//       autoplay: {
//           delay: 7000 
//       },
//       navigation: {
//           nextEl: ".next",
//           prevEl: ".prev"
//       },
//       pagination: {
//           el: ".dotsbox",
//           clickable: true
//       },
//       on: {
//           slideChange: function() {
//               resetTimer(); 
//           }
//       }
//   });

  
//   swiper.on("mouseenter", function() {
//       swiper.autoplay.stop();
//   });

  
//   swiper.on("mouseleave", function() {
//       swiper.autoplay.start();
//   });

//   const playButton = document.querySelector(".play-btn");
//   const pauseButton = document.querySelector(".pause-btn");

//   playButton.addEventListener("click", function() {
//       swiper.autoplay.start(); 
//   });

//   pauseButton.addEventListener("click", function() {
//       swiper.autoplay.stop(); 
//   });

//   function resetTimer() {
//       swiper.autoplay.stop();
//       swiper.autoplay.start();
//   }
// });




// swipers--------------------------------

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      520: {
          slidesPerView: 2,
      },
      950: {
          slidesPerView: 3,
      },
  },
});












// ----polyfill popup loaded-google docs---
    // const dialog = document.querySelector('dialog');
    // dialogPolyfill.registerDialog(dialog);





// -----popup loaded---goggle docs---
  // document.addEventListener("DOMContentLoaded", function () {
  //     const modal = document.getElementById("modal");
  //     const openButton = document.querySelector(".open-button");
  //     const closeButton = document.querySelector(".close-button");

  //     if (openButton) {
  //         openButton.addEventListener("click", () => {
  //             modal.showModal();
  //         });
  //     }

  //     if (closeButton) {
  //         closeButton.addEventListener("click", () => {
  //             modal.close();
  //         });
  //     }
  // });





  document.addEventListener("DOMContentLoaded", function () {
    let submitButton = document.getElementById("submit");
    console.log("Submit button found:", submitButton);

    if (submitButton) {
        submitButton.addEventListener("click", function (e) {
            console.log("Submit button clicked");
        });
    } else {
        console.error("Submit button NOT found! Check if it exists in the HTML.");
    }
});