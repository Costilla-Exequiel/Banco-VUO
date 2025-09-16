let usuario = "";
let usuarios = {
  "admin": { password: "1234", saldo: 1000, historial: [] },
  "exequiel": { password: "4321", saldo: 500, historial: [] },
  "maria": { password: "1111", saldo: 2000, historial: [] }
};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (usuarios[user] && usuarios[user].password === pass) {
    usuario = user;
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("bankSection").classList.remove("hidden");
    document.getElementById("userDisplay").innerText = usuario;
    actualizarSaldo();
    cargarUsuariosDestino();
    mostrarHistorial();
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}


function depositar() {
  let monto = parseFloat(document.getElementById("monto").value);
  if (monto > 0) {
    usuarios[usuario].saldo += monto;
    registrarMovimiento(usuario, `Depósito de $${monto}`);
    actualizarSaldo();
    mostrarHistorial();
  } else {
    alert("Ingrese un monto válido.");
  }
}

function retirar() {
  let monto = parseFloat(document.getElementById("monto").value);
  if (monto > 0 && monto <= usuarios[usuario].saldo) {
    usuarios[usuario].saldo -= monto;
    registrarMovimiento(usuario, `Retiro de $${monto}`);
    actualizarSaldo();
    mostrarHistorial();
  } else {
    alert("Fondos insuficientes o monto inválido.");
  }
}

function transferir() {
  let destino = document.getElementById("destino").value;
  let monto = parseFloat(document.getElementById("montoTransfer").value);

  if (destino && destino !== usuario && monto > 0 && monto <= usuarios[usuario].saldo) {
    usuarios[usuario].saldo -= monto;
    usuarios[destino].saldo += monto;
    registrarMovimiento(usuario, `Transferencia de $${monto} a ${destino}`);
    registrarMovimiento(destino, `Transferencia recibida de $${monto} de ${usuario}`);
    actualizarSaldo();
    mostrarHistorial();
    alert(`Transferencia de $${monto} realizada a ${destino}`);
  } else {
    alert("Datos incorrectos o fondos insuficientes.");
  }
}

function registrarMovimiento(user, descripcion) {
  let fecha = new Date().toLocaleString();
  usuarios[user].historial.push(`[${fecha}] ${descripcion}`);
}

function actualizarSaldo() {
  document.getElementById("saldo").innerText = usuarios[usuario].saldo;
  document.getElementById("monto").value = "";
  document.getElementById("montoTransfer").value = "";
}

function mostrarHistorial() {
  let lista = document.getElementById("historial");
  lista.innerHTML = "";
  usuarios[usuario].historial.forEach(mov => {
    let li = document.createElement("li");
    li.textContent = mov;
    lista.appendChild(li);
  });
}

function cargarUsuariosDestino() {
  let select = document.getElementById("destino");
  select.innerHTML = "";
  for (let user in usuarios) {
    if (user !== usuario) {
      let option = document.createElement("option");
      option.value = user;
      option.textContent = user;
      select.appendChild(option);
    }
  }
}

function logout() {
  usuario = "";
  document.getElementById("bankSection").classList.add("hidden");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
