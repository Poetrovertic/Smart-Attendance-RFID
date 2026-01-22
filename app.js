
// 🔥 Firebase Configuration (REPLACE WITH YOUR OWN)
const firebaseConfig = {
  apiKey: "AIzaSyD30esZ4y3DNt7yR_NttHQD4Hrv-rGvC3o",
  authDomain: "smart-attendance-by-rfid.firebaseapp.com",
  databaseURL: "https://smart-attendance-by-rfid-default-rtdb.firebaseio.com",
  projectId: "smart-attendance-by-rfid",
  storageBucket: "smart-attendance-by-rfid.firebasestorage.app",
  messagingSenderId: "139623558995",
  appId: "1:139623558995:web:19b9cca2670d161cd43ba6",
  measurementId: "G-F10Q8XJZNM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const tableBody = document.querySelector("#attendanceTable tbody");
const searchInput = document.getElementById("searchInput");

let attendanceData = [];

// Fetch attendance data in real-time
database.ref("attendance").on("value", snapshot => {
  attendanceData = [];
  snapshot.forEach(child => {
    attendanceData.push(child.val());
  });
  renderTable(attendanceData);
});

// Render table
function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach((record, index) => {
    const [date, time] = record.timestamp.split(" ");

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${record.name}</td>
        <td>${record.matricNumber}</td>
        <td>${date}</td>
        <td>${time}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Search functionality
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  const filteredData = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchValue) ||
    record.maticNumber.toLowerCase().includes(searchValue)
  );

  renderTable(filteredData);
});


