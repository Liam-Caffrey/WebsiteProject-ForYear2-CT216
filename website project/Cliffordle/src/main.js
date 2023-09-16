
import { createApp } from 'vue'
import App from './App.vue'

import { collection, query, where,getFirestore } from "firebase/firestore";



import './assets/main.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiunfcRK7x-KF3rFgWESohCyKeDISzsw4",
    authDomain: "cliffordle.firebaseapp.com",
    databaseURL: "https://cliffordle-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cliffordle",
    storageBucket: "cliffordle.appspot.com",
    messagingSenderId: "607168236195",
    appId: "1:607168236195:web:9815b1803c0ec6266ccd16",
    measurementId: "G-EJBYSLQ7TG"
};
initializeApp(firebaseConfig);


const app = createApp(App)
const firestore = getFirestore();
app.mount('#app');

export default app;

function autocomplete(inp, arr)
{
    var currentFocus;
    if (inp)
    {
        inp.addEventListener("input", function (e)
        {
            var a, b, i, val = this.value;
            closeAllLists();
            if(!val) {return false;}
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length && a.childElementCount < 5; i++)
            {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase())
                {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    b.innerHTML += "<input type = 'hidden' value = '" + arr[i] + "'>";
                    b.addEventListener("click", function(e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
    }
    if (inp)
    {
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40)
            {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38)
            {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13)
            {
                e.preventDefault();
                if (currentFocus > -1)
                {
                    if (x) x[currentFocus].click();
                }
            }
        });
    }
    function addActive(x)
    {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x)
    {
        for (var i = 0; i < x.length; i++)
        {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt)
    {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++)
        {
            if (elmnt != x[i] && elmnt != inp)
            {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e)
    {
        closeAllLists(e.target);
    });
}

var players = ["Cillian O Connor", "Aidan O Shea", "Ryan O Donoghue", "Tommy Conroy", "Matthew Ruane", "Shane Walsh", "Damien Comer", "Cillian McDaid", "Sean Kelly", "Paul Conroy", "Brian Fenton", "Paul Mannion", "Con O Callaghan", "Ciaran Kilkenny", "John Small", "David Clifford", "Sean O Shea", "Paudie Clifford", "Gavin White", "Tom O Sullivan", "Rory Grugan", "Rian O'Neill", "Stefan Campbell", "Ethan Rafferty", "Jarlath Og Burns", "Enda Smith", "Niall Daly", "Brian Stack", "Ciaran Murtagh", "Ben O Carroll", "Cathal McShane", "Darren McCurry", "Kieran McGeary", "Peter Harte", "Mattie Donnelly", "John Heslin", "Luke Loughlin", "Ronan O Toole", "Ronan Wallace", "Ray Connellan", "Darragh McGurn", "Sean Quigley", "Conor McManus", "Keith Beirne", "Sam Mulroy", "Daniel Flynn", "Eoghan McCabe", "Patrick McBrearty", "Darragh Canavan", "Eoin Murchan", "Rory Beggan", "Dean Rock", "Enda Hession", "Jordan Flynn", "Paul Kelly"];
autocomplete(document.getElementById("myInput"), players);
