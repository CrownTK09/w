// Variables
let currentUser = null; // Usuario actualmente autenticado

// Función para abrir un popup
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

// Función para cerrar el popup
function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.style.display = 'none');
}

// Función para manejar el registro
function register() {
    const username = document.getElementById('register-name').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        const accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];
        accounts.push({ username, password });
        localStorage.setItem('cuentas.json', JSON.stringify(accounts));
        login(username, password);
        closePopup();
    } else {
        alert("Por favor complete todos los campos.");
    }
}

// Función para manejar el inicio de sesión
function login(username, password) {
    const accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];
    const account = accounts.find(acc => acc.username === username && acc.password === password);

    if (account) {
        currentUser = account;
        updateMessage();
        closePopup();
        showProfiles();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// Función para actualizar el mensaje en la página
function updateMessage() {
    const messageElement = document.getElementById('message');
    if (currentUser) {
        messageElement.innerHTML = `Para Crear Perfil, pulsa en el botón "Crear Perfil"`;
        document.getElementById('btn-login').style.display = 'none';
        document.getElementById('btn-register').style.display = 'none';
        document.getElementById('create-profile-btn').style.display = 'block';
    } else {
        messageElement.innerHTML = `Para Crear Perfil, inicia sesión o regístrate`;
        document.getElementById('btn-login').style.display = 'inline-block';
        document.getElementById('btn-register').style.display = 'inline-block';
    }
}

// Función para mostrar los perfiles creados
function showProfiles() {
    const profilesContainer = document.getElementById('profiles-container');
    const profiles = JSON.parse(localStorage.getItem('perfiles.json')) || [];

    profilesContainer.innerHTML = '';
    profiles.forEach(profile => {
        const profileElement = document.createElement('div');
        profileElement.classList.add('profile');
        profileElement.innerHTML = `
            <img src="${profile.photo || 'default.jpg'}" alt="Foto de perfil">
            <p>${profile.username}</p>
            <button onclick="copyDiscord('${profile.discord}')">Discord</button>
        `;
        profilesContainer.appendChild(profileElement);
    });
}

// Función para copiar el nombre de Discord
function copyDiscord(discordName) {
    navigator.clipboard.writeText(discordName).then(() => {
        alert("Nombre de Discord copiado: " + discordName);
    });
}

// Función para crear un perfil
function createProfile() {
    const photoInput = document.getElementById('photo-input');
    const photo = photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : 'default.jpg';
    const username = document.getElementById('profile-name').value;
    const discordName = document.getElementById('discord-name').value;

    if (username && discordName) {
        const profiles = JSON.parse(localStorage.getItem('perfiles.json')) || [];
        profiles.push({ username, discord: discordName, photo });
        localStorage.setItem('perfiles.json', JSON.stringify(profiles));
        showProfiles();
        closePopup();
    } else {
        alert("Por favor complete todos los campos.");
    }
}

// Función para previsualizar perfil
document.getElementById('preview-profile-btn').addEventListener('click', function() {
    const photoInput = document.getElementById('photo-input');
    const photo = photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : 'default.jpg';
    const username = document.getElementById('profile-name').value;
    const discordName = document.getElementById('discord-name').value;

    alert(`Previsualización: \nFoto: ${photo}\nNombre: ${username}\nDiscord: ${discordName}`);
});

// Añadir eventos a los botones
document.getElementById('btn-login').addEventListener('click', () => openPopup('login-popup'));
document.getElementById('btn-register').addEventListener('click', () => openPopup('register-popup'));
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('create-profile-btn').addEventListener('click', createProfile);

// Mostrar los perfiles al cargar
document.addEventListener('DOMContentLoaded', showProfiles);
