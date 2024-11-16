// Variables globales
let currentUser = null;
let profiles = JSON.parse(localStorage.getItem('perfiles.json')) || [];
let accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];

// Función para mostrar perfiles
function showProfiles() {
    const profilesContainer = document.getElementById('profiles-container');
    profilesContainer.innerHTML = ''; // Limpiar antes de agregar

    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';

        const profileImage = document.createElement('img');
        profileImage.src = profile.photo || 'default.jpg'; // Foto por defecto
        profileImage.className = 'profile-photo';
        profileCard.appendChild(profileImage);

        const profileName = document.createElement('p');
        profileName.textContent = `Usuario: ${profile.username}`;
        profileCard.appendChild(profileName);

        const discordButton = document.createElement('button');
        discordButton.textContent = 'Discord';
        discordButton.onclick = () => {
            alert(`Nombre de Discord: ${profile.discordName}`);
        };
        profileCard.appendChild(discordButton);

        profilesContainer.appendChild(profileCard);
    });
}

// Abrir popup
function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

// Cerrar popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Función de registro
function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        accounts.push({ username, password });
        localStorage.setItem('cuentas.json', JSON.stringify(accounts));
        alert('Cuenta registrada correctamente');
        closePopup('register-popup');
    } else {
        alert('Por favor, ingresa un nombre de usuario y contraseña');
    }
}

// Función de login
document.getElementById('btn-login').addEventListener('click', () => {
    const username = prompt('Ingresa tu nombre de usuario');
    const password = prompt('Ingresa tu contraseña');

    const account = accounts.find(acc => acc.username === username && acc.password === password);
    if (account) {
        currentUser = account;
        document.getElementById('btn-login').style.display = 'none';
        document.getElementById('btn-register').style.display = 'none';
        document.getElementById('login-message').textContent = 'Para Crear Perfil, pulsa en el boton "Crear Perfil"';
        document.getElementById('create-profile-btn').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Función de creación de perfil
document.getElementById('create-profile-btn').addEventListener('click', () => openPopup('create-profile-popup'));

document.getElementById('create-profile-btn').addEventListener('click', () => {
    const photoInput = document.getElementById('profile-photo');
    const photo = photoInput.files[0] ? URL.createObjectURL(photoInput.files[0]) : 'default.jpg';
    const username = document.getElementById('profile-name').value;
    const discordName = document.getElementById('discord-name').value;

    const newProfile = { username, discordName, photo };
    profiles.push(newProfile);
    localStorage.setItem('perfiles.json', JSON.stringify(profiles));

    alert('Perfil creado con éxito');
    closePopup('create-profile-popup');
    showProfiles();
});

// Mostrar perfiles al cargar
window.onload = () => {
    showProfiles();
};
