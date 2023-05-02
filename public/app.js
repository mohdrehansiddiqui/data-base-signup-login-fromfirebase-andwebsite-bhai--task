const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, set,ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyByr7hbKqFg0Zl0TylGfojU1LLg3hKymPM",
  authDomain: "bhai-task.firebaseapp.com",
  databaseURL: "https://bhai-task-default-rtdb.firebaseio.com",
  projectId: "bhai-task",
  storageBucket: "bhai-task.appspot.com",
  messagingSenderId: "812412181194",
  appId: "1:812412181194:web:43828465485a9420c5f233",
  measurementId: "G-ZY4JSKWSJH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});

const sign_up_submit = document.getElementById('signup-btn')
sign_up_submit.addEventListener('click',()=>{
    const email = document.getElementById('semail').value
    const password = document.getElementById('spass').value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      saveUserToDatabase(user.email,user.uid)
      container.classList.remove("sign-up-mode");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });
});

function saveUserToDatabase(email,userId){
  set(ref(database, 'users/' + userId), {
    email: email
  })
}

const sign_in_submit = document.getElementById('signin-btn')
sign_in_submit.addEventListener('click',()=>{
    const email = document.getElementById('lemail').value
    const password = document.getElementById('lpass').value
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user.email)
    window.location.href = 'welcome.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage)
  });

})