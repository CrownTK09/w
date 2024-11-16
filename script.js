let loggedIn = false;
let currentUser = null;
let profiles = JSON.parse(localStorage.getItem('perfiles.json')) || [];
let accounts = JSON.parse(localStorage.getItem('cuentas.json')) || [];

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

  if (!username || !discordName) {
    alert("Por favor complete todos los campos.");
    return;
  }

  // Si no se selecciona una imagen, asignar una imagen por defecto
  const picUrl = pic ? URL.createObjectURL(pic) : 'default-avatar.png';  // La imagen por defecto

  const profile = {
    username,
    discordName,
    picUrl,
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
  document.getElementById(popupId).style
