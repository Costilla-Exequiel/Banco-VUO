(function () {
  const USER = "cliente";
  const PASS = "1234";
  let saldo = 0;

  function actualizarSaldo() {
    const s = document.getElementById("saldo");
    if (s) s.innerText = saldo;
  }

  function login() {
    const user = document.getElementById("username")?.value ?? "";
    const pass = document.getElementById("password")?.value ?? "";
    const errorEl = document.getElementById("login-error");

    if (user === USER && pass === PASS) {
      document.getElementById("login-section").classList.add("hidden");
      document.getElementById("bank-section").classList.remove("hidden");
      const welcome = document.getElementById("welcome");
      if (welcome) welcome.innerText = `Hola, ${user}!`;
      if (errorEl) errorEl.innerText = "";
      actualizarSaldo();
    } else {
      if (errorEl) errorEl.innerText = "Usuario o contraseña incorrectos";
    }
  }

  function depositar() {
    const input = document.getElementById("deposito");
    const monto = parseFloat(input?.value || "0");
    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido");
      return;
    }
    saldo += monto;
    actualizarSaldo();
    if (input) input.value = "";
  }

  function retirar() {
    const input = document.getElementById("retiro");
    const monto = parseFloat(input?.value || "0");
    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido");
      return;
    }
    if (monto > saldo) {
      alert("Fondos insuficientes");
      return;
    }
    saldo -= monto;
    actualizarSaldo();
    if (input) input.value = "";
  }

  function logout() {
    document.getElementById("bank-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
  }

  // Exponer las funciones a window para que los onclick en el HTML las encuentren
window.login = login;
window.depositar = depositar;
window.retirar = retirar;
window.logout = logout;

})();


