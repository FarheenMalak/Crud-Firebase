import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, update, remove, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP83LxQMF9Rdug3TLXnvMAhrQTA_sJ4D0",
  authDomain: "crud-app-26bff.firebaseapp.com",
  databaseURL: "https://crud-app-26bff-default-rtdb.firebaseio.com",
  projectId: "crud-app-26bff",
  storageBucket: "crud-app-26bff.appspot.com",
  messagingSenderId: "513982266297",
  appId: "1:513982266297:web:9fbf218c17a1165a8d9468"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('roll-no').value = '';
  document.getElementById('class').value = '';
}

// Create Record
function writeUserData() {
  const name = document.getElementById('name').value;
  const rollNum = document.getElementById('roll-no').value;
  const grade = document.getElementById('class').value;

  if (!name || !rollNum || !grade) {
    Swal.fire("Error", "All fields are required!", "error");
    return;
  }

  set(ref(db, 'students/' + rollNum), {
    studentName: name,
    studentRollNum: rollNum,
    studentClass: grade
  })
    .then(() => {
      Swal.fire("Success", "Student record created successfully!", "success");
      clearInputs();
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// Edit Record
function editUserData() {
  const name = document.getElementById('name').value;
  const rollNum = document.getElementById('roll-no').value;
  const grade = document.getElementById('class').value;

  if (!rollNum) {
    Swal.fire("Error", "Roll number is required to edit data!", "error");
    return;
  }

  const updates = {};
  if (name) updates.studentName = name;
  if (grade) updates.studentClass = grade;

  update(ref(db, 'students/' + rollNum), updates)
    .then(() => {
      Swal.fire("Success", "Student record updated successfully!", "success");
      clearInputs();
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// Delete Record
function deleteUserData() {
  const rollNum = document.getElementById('roll-no').value;

  if (!rollNum) {
    Swal.fire("Error", "Roll number is required to delete data!", "error");
    return;
  }

  remove(ref(db, 'students/' + rollNum))
    .then(() => {
      Swal.fire("Success", "Student record deleted successfully!", "success");
      clearInputs();
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// Read Records and Display
function readUserData() {
  const dbRef = ref(db);

  get(child(dbRef, 'students'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const recordsBody = document.getElementById('records-body');
        recordsBody.innerHTML = ''; // Clear previous records

        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          const row = `
            <tr>
              <td class="border border-gray-300 px-4 py-2">${data.studentRollNum}</td>
              <td class="border border-gray-300 px-4 py-2">${data.studentName}</td>
              <td class="border border-gray-300 px-4 py-2">${data.studentClass}</td>
            </tr>`;
          recordsBody.innerHTML += row;
        });

        document.getElementById('student-records').classList.remove('hidden');
      } else {
        Swal.fire("Info", "No records found!", "info");
      }
    })
    .catch((error) => {
      Swal.fire("Error", error.message, "error");
    });
}

// Add event listeners
document.getElementById('create').addEventListener('click', (e) => {
  e.preventDefault();
  writeUserData();
});

document.getElementById('edit').addEventListener('click', (e) => {
  e.preventDefault();
  editUserData();
});

document.getElementById('delete').addEventListener('click', (e) => {
  e.preventDefault();
  deleteUserData();
});

document.getElementById('read').addEventListener('click', (e) => {
  e.preventDefault();
  readUserData();
});

