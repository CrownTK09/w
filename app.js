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
        alert('Cuenta registrada con éxito');
        closePopup('register-popup');
        currentUser = { username };
        showProfiles();
        toggleLoginButtons();
    } else {
        alert('Por favor, ingrese un nombre de usuario y una contraseña');
    }
}

// Función para cambiar entre iniciar sesión/registrar
function toggleLoginButtons() {
    const loginButton = document.getElementById('btn-login');
    const registerButton = document.getElementById('btn-register');
    const createProfileButton = document.createElement('button');
    createProfileButton.textContent = 'Crear Perfil';
    createProfileButton.className = 'header-btn';
    createProfileButton.onclick = () => openPopup('create-profile-popup');
    document.querySelector('.header-container').appendChild(createProfileButton);
    
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    document.getElementById('login-message').textContent = 'Para Crear Perfil, pulsa en el boton "Crear Perfil"';
}

// Crear perfil
function createProfile() {
    const photo = document.getElementById('profile-photo').files[0];
    const username = document.getElementById('profile-name').value;
    const discordName = document.getElementById('discord-name').value;

    const profile = {
        photo: photo ? URL.createObjectURL(photo) : 'default.jpg', // Si no se selecciona foto, usar la foto por defecto
        username,
        discordName
    };

    profiles.push(profile);
    localStorage.setItem('perfiles.json', JSON.stringify(profiles));
    alert('Perfil creado con éxito');
    closePopup('create-profile-popup');
    showProfiles();
}

document.getElementById('register-btn').onclick = register;
document.getElementById('create-profile-btn').onclick = createProfile;
document.getElementById('btn-login').onclick = () => alert('Funcionalidad de iniciar sesión pendiente');
document.getElementById('btn-register').onclick = () => openPopup('register-popup');

// Mostrar los perfiles al cargar la página
window.onload = () => {
    showProfiles();
};
