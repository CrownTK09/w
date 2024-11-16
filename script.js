let loggedIn = false;
let currentUser = null;
let profiles = JSON.parse(localStorage.getItem('perfiles.json')) || [];

// Función para mostrar los perfiles
function showProfiles() {
  const profilesContainer = document.getElementById('profiles-list');
  profilesContainer.innerHTML = ''; // Limpiar la lista de perfiles
  profiles.forEach(profile => {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');
    profileDiv.innerHTML = `
      <img src="${profile.picUrl}" alt="Foto de perfil">
      <p>${profile.username}</p>
      <button onclick="openDiscordPopup('${profile.discordName}')">Discord</button>
    `;
    profilesContainer.appendChild(profileDiv);
  });
}

// Función para mostrar el mensaje dependiendo del estado de login
function updateMessage() {
  const messageText = document.getElementById('message-text');
  if (loggedIn) {
    messageText.textContent = 'Para crear perfil, pulsa en el botón "Crear Perfil"';
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('btn-register').style.display = 'none';
    document.getElementById('create-profile-popup').style.display = 'block';
  } else {
    messageText.textContent = 'Para crear perfil, inicia sesión o regístrate.';
    document.getElementById('btn-login').style.display = 'block';
    document.getElementById('btn-register').style.display = 'block';
  }
}

// Función de login
function login() {
  const name = prompt("Ingrese su nombre de usuario:");
  const password = prompt("Ingrese su contraseña:");
  const accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];

  const account = accounts.find(acc => acc.name === name && acc.password === password);
  if (account) {
    loggedIn = true;
    currentUser = account.name;
    updateMessage();
    showProfiles();
  } else {
    alert('Credenciales incorrectas');
  }
}

// Función de registro
function register() {
  const name = document.getElementById('register-name').value;
  const password = document.getElementById('register-password').value;

  if (!name || !password) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const newAccount = { name, password };
  let accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];
  accounts.push(newAccount);
  localStorage.setItem('cuentas.json', JSON.stringify(accounts));

  loggedIn = true;
  currentUser = name;
  updateMessage();
  showProfiles();
  closePopup();
}

// Función de crear perfil
function createProfile() {
  const pic = document.getElementById('profile-pic').files[0];
  const username = document.getElementById('username').value;
  const discordName = document.getElementById('discord-name').value;

  if (!pic || !username || !discordName) {
    alert("Por favor complete todos los campos.");
    return;
  }

  const profile = {
    username,
    discordName,
    picUrl: URL.createObjectURL(pic),
    createdBy: currentUser
  };

  profiles.push(profile);
  localStorage.setItem('perfiles.json', JSON.stringify(profiles));
  showProfiles();
  closePopup();
}

// Función para abrir el popup de Discord
function openDiscordPopup(discordName) {
  const discordText = document.getElementById('discord-text');
  discordText.textContent = discordName;
  openPopup('discord-popup');
}

// Función para copiar Discord
function copyDiscord() {
  const discordText = document.getElementById('discord-text');
  navigator.clipboard.writeText(discordText.textContent);
}

// Función de apertura y cierre de popups
function openPopup(popupId) {
  document.getElementById(popupId).style.display = 'flex';
}

function closePopup() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.style.display = 'none');
}

// Agregar event listeners
document.getElementById('btn-login').addEventListener('click', login);
document.getElementById('btn-register').addEventListener('click', () => openPopup('register-popup'));
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('create-profile-btn').addEventListener('click', createProfile);
document.getElementById('copy-btn').addEventListener('click', copyDiscord);

// Inicializar
updateMessage();
