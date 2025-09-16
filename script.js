// Usuarios de prueba
const USERS = [
  { user: "cliente", pass: "1234", saldo: 1000 },
  { user: "juan", pass: "abcd", saldo: 500 },
  { user: "maria", pass: "qwerty", saldo: 2000 }
];

let currentUser = null;

// --- Función de Login ---
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = USERS.find(u => u.user === username && u.pass === password);

  if (user) {
    currentUser = user;
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("bankSection").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = currentUser.user;
    document.getElementById("saldo").innerText = currentUser.saldo;
    cargarDestinos();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// --- Depositar ---
function depositar() {
  const monto = parseFloat(document.getElementById("monto").value);
  if (monto > 0) {
    currentUser.saldo += monto;
    actualizarSaldo();
    agregarHistorial(`Depósito de $${monto}`);
    document.getElementById("monto").value = "";
  } else {
    alert("Ingrese un monto válido");
  }
}

// --- Retirar ---
function retirar() {
  const monto = parseFloat(document.getElementById("monto").value);
  if (monto > 0 && monto <= currentUser.saldo) {
    currentUser.saldo -= monto;
    actualizarSaldo();
    agregarHistorial(`Retiro de $${monto}`);
    document.getElementById("monto").value = "";
  } else {
    alert("Monto inválido o saldo insuficiente");
  }
}

// --- Transferir ---
function transferir() {
  const destino = document.getElementById("destino").value;
  const monto = parseFloat(document.getElementById("montoTransfer").value);

  if (!destino || isNaN(monto) || monto <= 0) {
    alert("Seleccione un destino válido e ingrese un monto");
    return;
  }

  if (monto > currentUser.saldo) {
    alert("Saldo insuficiente para transferir");
    return;
  }

  // Restar al usuario actual
  currentUser.saldo -= monto;

  // Sumar al usuario destino
  const userDestino = USERS.find(u => u.user === destino);
  if (userDestino) {
    userDestino.saldo += monto;
  }

  actualizarSaldo();
  agregarHistorial(`Transferencia de $${monto} a ${destino}`);
  document.getElementById("montoTransfer").value = "";
}

// --- Actualizar Saldo ---
function actualizarSaldo() {
  document.getElementById("saldo").innerText = currentUser.saldo;
}

// --- Historial ---
function agregarHistorial(movimiento) {
  const li = document.createElement("li");
  li.innerText = movimiento;
  document.getElementById("historial").appendChild(li);
}

// --- Cargar usuarios para transferir ---
function cargarDestinos() {
  const select = document.getElementById("destino");
  select.innerHTML = "";

  USERS.forEach(u => {
    if (u.user !== currentUser.user) {
      const option = document.createElement("option");
      option.value = u.user;
      option.innerText = u.user;
      select.appendChild(option);
    }
  });
}

// --- Logout ---
function logout() {
  currentUser = null;
  document.getElementById("bankSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("historial").innerHTML = "";
}

// Exponer funciones al HTML
window.login = login;
window.depositar = depositar;
window.retirar = retirar;
window.transferir = transferir;
window.logout = logout;




