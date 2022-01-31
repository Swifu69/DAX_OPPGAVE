import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "./firestore.js";

const FORM = document.getElementById("form");
let input = document.getElementById("input");
const table = document.getElementById("table");
const feedback = document.getElementById("greeting");
const MODAL = document.getElementById("myModal");
const SPAN = document.getElementsByClassName("close")[0];

window.onload = () => {
  MODAL.style.display = "block";

  let sessionName = sessionStorage.getItem("Name");

  if (sessionName) {
    feedback.textContent = `Thank you for joining the server ${sessionName}`;
  }
};

SPAN.onclick = function () {
  MODAL.style.display = "none";
};

async function getNames(db) {
  const NAMES = collection(db, "Names");
  const NAMES_SNAPSHOT = await getDocs(NAMES);
  return NAMES_SNAPSHOT.docs.map((doc) => doc.data().name);
}

const q = query(collection(db, "Names"));
const unsubscribe = onSnapshot(q, async (querySnapshot) => {
  table.innerHTML = `<th>Takk til alle som la til navnet sitt</th> <tr><tr>`;
  const names = await getNames(db);
  names.forEach((name) => {
    table.innerHTML += `<tr>${name}<tr>`;
  });

  let localSafe = JSON.stringify(names);

  localStorage.setItem("Names", localSafe);

  sessionStorage.setItem("Name", input.value);
});

FORM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const DOC_REF = await addDoc(collection(db, "Names"), {
    name: input.value,
  });

  feedback.textContent = `Thank you for joining the server ${input.value}`;
  input.value = "";
});

const luckyForm = document.getElementById("lucky");
const luckyInput = document.getElementById("luckyNumber");
const luckyField = document.getElementById("luckyField");
const fart = new Audio("fart.mp3");
const amongus = new Audio("amongus.mp3");

let RANDOM = Math.ceil(Math.random() * 49);

luckyField.textContent = RANDOM;

const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  amongus.play();
};

let userInput = "";

luckyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userInput = luckyInput.value;
  luckyInput.value = "";
});

function callToRandomNumber() {
  let RANDOM_AFTER = Math.ceil(Math.random() * 49);
  fart.play().catch((err) => {
    if (err instanceof DOMException) {
      // user hasn't touched the site
    } else throw err;
  });
  if (userInput == RANDOM_AFTER) {
    setBg();
  } else {
    console.log();
  }
  luckyField.textContent = RANDOM_AFTER;
  userInput = "";
  luckyInput.value = "";
}

setTimeout(() => {
  callToRandomNumber();
  setInterval(() => {
    callToRandomNumber();
  }, 60 * 1000);
}, (60 - new Date().getSeconds()) * 1000);
