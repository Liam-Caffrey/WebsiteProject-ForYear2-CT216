import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import db from  './api/firebase'
import {collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore';



const app = createApp(App)

app.mount('#app');
let guessRef;
/*rulesButton.addEventListener('click', () => {
    console.log("Button pressed. Opening modal");
    rulesModal.classList.add('open');
});

rulesModal.addEventListener('click', (e) => {
    rulesModal.classList.remove('open');
});*/
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
            for (i = 0; i < arr.length && a.childElementCount < 4; i++)
            {
                if (arr[i].toUpperCase().indexOf(val.toUpperCase()) !== -1)
                {
                    b = document.createElement("DIV");
                    b.innerHTML = arr[i].replace(new RegExp(val, "gi"), "<strong>$&</strong>");
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

    function checkGuess(e)
    {
        /* const query = db.collection("player").where("Name", "==", e.innerText);
         return query.get()
             .then((querySnapshot) => {
                 const results = [];
                 querySnapshot.forEach((doc) => {
                     results.push(doc.data());
                 });
                 return results;
             })
             .catch((error) => {
                 console.error("Error searching Firestore:", error);
             });*/
        return e.innerText === rightGuess && e !== inp;
    }

    function displayAnswer()
    {
        let table = document.getElementById('myTable');
        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);

        c1.innerText = targName;
        c2.innerText = targAge;
        c3.innerText = targCounty;
        c4.innerText = targClub;
        c5.innerText = targPosition;

        c1.classList.add('green');
        c2.classList.add('green');
        c3.classList.add('green');
        c4.classList.add('green');
        c5.classList.add('green');
    }
    async function displayGuess(e) {

        guessRef = doc(db, "player", e.innerText);
        const guessSnap = await getDoc(guessRef);
        const guessName = guessSnap.data().Name;
        console.log(guessName);
        const guessAge = guessSnap.data().Age;
        const guessPosition = guessSnap.data().Position;
        const guessClub = guessSnap.data().Club;
        const guessCounty = guessSnap.data().County;
        const guessProvince = guessSnap.data().Province;
        console.log("Guess name: " + guessName +
            "\nGuess Age: " + guessAge +
            "\nGuess Position: " + guessPosition +
            "\nGuess Club: " + guessClub +
            "\nGuess County: " + guessCounty +
            "\nGuess Province: " + guessProvince);

        /* var a, b;
        a = document.createElement("LI");
        document.getElementById("defaultguess").appendChild(a);
        if (correct) {
             a.classList.add('green');
        } else a.classList.add('red');
        a.innerText += e.innerText;*/
        let table = document.getElementById("myTable");
        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        let c2 = row.insertCell(1);
        let c3 = row.insertCell(2);
        let c4 = row.insertCell(3);
        let c5 = row.insertCell(4);

        c1.innerText = guessName;
        c2.innerText = guessAge;
        c3.innerText = guessCounty;
        c4.innerText = guessClub;
        c5.innerText = guessPosition;

        c1.classList.add(checkName(guessName, targName));
        c2.classList.add(checkAge(guessAge, targAge));
        c3.classList.add(checkCounty(guessCounty, targCounty, guessProvince, targProvince));
        c4.classList.add(checkClub(guessClub, targClub));
        c5.classList.add(checkPosition(guessPosition, targPosition));

    }

    document.addEventListener("click", function(e)
    {
        closeAllLists(e.target);
        if (e.target.parentNode.classList.contains('autocomplete-items')) {
            displayGuess(e.target);
            if (checkGuess(e.target)) {
                window.alert('Well Done! You were correct!\nPress OK to view results and refresh the page to play again');
                document.getElementById('myInput').classList.add('hide');
            } else {
                guessesRemaining--;
                console.log("Remaining guesses: " + guessesRemaining);
            }
            if (guessesRemaining === 0) {
                window.alert('Unlucky! You were unable to guess the player!\nPress OK to view results and refresh the page to play again ');
                document.getElementById('myInput').classList.add('hide');
                displayAnswer();
            }
            document.getElementById('myInput').placeholder = "Guess " + (NUMBER_OF_GUESSES - guessesRemaining + 1) + " out of 8...";
        }
        inp.value = null;
    });

    function checkName(guessName, ansName)
    {
        if (guessName === ansName) return 'green';
        return 'red';
    }

    function checkAge(guessAge, ansAge)
    {
        if (guessAge === ansAge) return 'green';
        if ((guessAge - ansAge) <= 2 && (guessAge - ansAge) >= -2 ) return 'yellow';
        return 'red';
    }

    function checkCounty(guessCounty, ansCounty, guessProvince, ansProvince)
    {
        if (guessCounty === ansCounty) return 'green';
        if (guessProvince === ansProvince) return 'yellow';
        return 'red';
    }

    function checkClub(guessClub, ansClub)
    {
        if (guessClub === ansClub) return 'green';
        return 'red';
    }

    function checkPosition(guessPosition, ansPosition)
    {
        if (guessPosition === ansPosition) return 'green';
        return 'red';
    }
}

var players = ["Cillian O Connor", "James Madden", "Patrick Gavin", "Niall Morgan", "Senan Baker", "Patrick McBrearty", "Rory Beggan", "Dean Rock", "Aidan O Shea", "Ryan O Donoghue", "Tommy Conroy", "Matthew Ruane", "Shane Walsh", "Damien Comer", "Cillian McDaid", "Sean Kelly", "Paul Conroy", "Brian Fenton", "Paul Mannion", "Con O Callaghan", "Ciaran Kilkenny", "John Small", "David Clifford", "Sean O Shea", "Paudie Clifford", "Gavin White", "Tom O Sullivan", "Rory Grugan", "Rian O Neill", "Stefan Campbell", "Ethan Rafferty", "Jarlath Og Burns", "Enda Smith", "Niall Daly", "Brian Stack", "Ciaran Murtagh", "Ben O Carroll", "Cathal McShane", "Darren McCurry", "Kieran McGeary", "Peter Harte", "Mattie Donnelly", "John Heslin", "Luke Loughlin", "Ronan O Toole", "Ronan Wallace", "Ray Connellan", "Darragh McGurn", "Sean Quigley", "Conor McManus", "Eoghan McCabe", "Fionnan Henry"];
const NUMBER_OF_GUESSES = 8;
let guessesRemaining = NUMBER_OF_GUESSES;
let rightGuess = players[Math.floor(Math.random()*players.length)];
const ansRef = doc(db, "player", rightGuess);
const ansSnap = await getDoc(ansRef);
const targName = ansSnap.data().Name;
const targPosition = ansSnap.data().Position;
const targAge = ansSnap.data().Age;
const targClub = ansSnap.data().Club;
const targCounty = ansSnap.data().County;
const targProvince = ansSnap.data().Province;
console.log("Player name: " + targName +
    "\nPlayer age: " + targAge +
    "\nPlayer position: " + targPosition +
    "\nPlayer club: " + targClub +
    "\nPlayer county: " + targCounty +
    "\nPlayer province: " + targProvince);
autocomplete(document.getElementById("myInput"), players);