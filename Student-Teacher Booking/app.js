const firebaseConfig = {
    apiKey: "AIzaSyCj8Mw-A60kyDx9Gv77zAxgBeolDv_IU1s",
    authDomain: "student-82e43.firebaseapp.com",
    projectId: "student-82e43",
    storageBucket: "student-82e43.appspot.com",
    messagingSenderId: "831226226947",
    appId: "1:831226226947:web:26152a50270c6916f52136",
    measurementId: "G-T0ZGJGD2NG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to load subjects based on selected department
function loadSubjects() {
    const departmentAdd = document.getElementById('departmentAdd').value;
    const subjectAddSelect = document.getElementById('subjectAdd');
    
    // Clear existing options
    subjectAddSelect.innerHTML = '';

    // Add subjects based on department
    switch (departmentAdd) {
        case 'Computer Science':
            addSubjectOptions(['Algorithm', 'Database Management', 'Web Development', 'Artificial Intelligence', 'Networking', 'Cybersecurity']);
            break;
        case 'Internet of Things':
            addSubjectOptions(['IoT Foundations', 'Sensor Networks', 'Embedded Systems', 'Cloud Computing', 'Data Analytics', 'Wireless Communication']);
            break;
        case 'Pharmacy':
            addSubjectOptions(['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutical Analysis', 'Pharmacy Practice', 'Pharmaceutics', 'Clinical Pharmacy']);
            break;
        case 'Agriculture':
            addSubjectOptions(['Crop Science', 'Soil Science', 'Agricultural Economics', 'Agronomy', 'Horticulture', 'Animal Science']);
            break;
        default:
            break;
    }
}

// Helper function to add subject options
function addSubjectOptions(subjects) {
    const subjectAddSelect = document.getElementById('subjectAdd');
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectAddSelect.appendChild(option);
    });
}

// Function to add a teacher
function addTeacher() {
    const teacherNameAdd = document.getElementById('teacherNameAdd').value;
    const departmentAdd = document.getElementById('departmentAdd').value;
    const subjectAdd = document.getElementById('subjectAdd').value;

    // Add the teacher to Firestore
    db.collection('teachers').add({
        teacherName: teacherNameAdd,
        department: departmentAdd,
        subject: subjectAdd
    });

    // Clear the form fields
    document.getElementById('teacherNameAdd').value = '';
    document.getElementById('departmentAdd').
