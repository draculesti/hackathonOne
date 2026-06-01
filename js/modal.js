const loginForm = document.getElementById("loginForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const termsCheck = document.getElementById("termsCheck");
const userDisplay = document.getElementById("userDisplay");
const authModal = document.getElementById('authModal');
const modalTitle = document.getElementById('authModalTitle');

authModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const title = button.getAttribute('data-bs-title');
    if (title) modalTitle.textContent = title;
});

if (localStorage.getItem("userName")) {
    userDisplay.textContent = `👤 ${localStorage.getItem("userName")}`;
}

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelectorAll(".alert").forEach(el => el.classList.add("d-none"));
    
    const nombre = userName.value.trim();
    const correo = userEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (nombre.length < 4) {
        document.getElementById("nameAlert").textContent = "Introduce un nombre válido de al menos 4 letras";
        document.getElementById("nameAlert").classList.remove("d-none");
        isValid = false;
    }

    if (!emailRegex.test(correo)) {
        document.getElementById("emailAlert").textContent = "Introduce un correo válido";
        document.getElementById("emailAlert").classList.remove("d-none");
        isValid = false;
    }

    if (!termsCheck.checked) {
        document.getElementById("termsAlert").textContent = "Debes aceptar los términos y condiciones";
        document.getElementById("termsAlert").classList.remove("d-none");
        isValid = false;
    }

    if (isValid) {
        localStorage.setItem("userName", nombre);
        userDisplay.textContent = `👤 ${nombre}`;
        
        bootstrap.Modal.getInstance(authModal).hide();
        loginForm.reset();
    }
});