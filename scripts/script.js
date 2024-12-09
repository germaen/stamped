// Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC-77X2IA49llHE6DMZKN4w5VlNhJTum70",
    authDomain: "stamped-54c03.firebaseapp.com",
    projectId: "stamped-54c03",
    storageBucket: "stamped-54c03.firebasestorage.app",
    messagingSenderId: "906374457778",
    appId: "1:906374457778:web:a048747118a5ad4dc05cab",
    measurementId: "G-HT2KY3X27D"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const stampsRef = database.ref('stamps');


const container = document.querySelector('.stamps-container');
const submitButton = document.getElementById('submit-stamp-btn');
const nameInput = document.getElementById('name-input');
const locationInput = document.getElementById('location-input');
const dateInput = document.getElementById('date-input');

function getRandomClass() {
    const classes = ['dog-tag', 'rectangular', 'solid'];
    return classes[Math.floor(Math.random() * classes.length)];
}
function createStampElement(data) {
    const stamp = document.createElement('div');
    stamp.classList.add('stamp', getRandomClass());

    stamp.style.top = `${Math.random() * 80}vh`;

    stamp.style.left = `${Math.random() * 90}vw`;

    stamp.innerHTML = `
        <div>${data.name}</div>
        <div>${data.location}</div>
        <div>${data.date}</div>
    `;

    return stamp;
}
function loadStamps() {
    stampsRef.on('child_added', (snapshot) => {
        const stampData = snapshot.val();
        const stampElement = createStampElement(stampData);
        container.appendChild(stampElement);
    });
}


function addStamp(name, location, date) {
    if (!name || !location || !date) {
        alert('Please fill out all fields.');
        return;
    }

    const newStampRef = stampsRef.push();
    newStampRef.set({ name, location, date });

    nameInput.value = '';
    locationInput.value = '';
    dateInput.value = '';
}

submitButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const location = locationInput.value.trim();
    const date = dateInput.value.trim();
    addStamp(name, location, date);
});

document.addEventListener('DOMContentLoaded', loadStamps);
