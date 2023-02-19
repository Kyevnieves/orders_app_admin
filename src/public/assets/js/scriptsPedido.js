const filas = document.querySelectorAll(".fila");

filas.forEach((e) => {
  let strgPrecio = e.querySelector(".precio").textContent;
  let strgCantidad = e.querySelector(".cantidad").textContent;
  let subtotal = e.querySelector(".subtotal");
  let precio = Number(strgPrecio.slice(0, -1));
  let cantidad = Number(strgCantidad);
  let total = cantidad * precio;
  subtotal.innerHTML = `${total}$`;
});

const subtotales = document.querySelectorAll(".subtotal");
const total = document.querySelector(".total");
let T = 0;
subtotales.forEach((num) => {
  let strgPrecio = num.textContent;
  let price = strgPrecio.slice(0, -1);
  let n = Number(price);
  T += n;
});

total == undefined ? console.log("") : (total.innerHTML = `${T}$`);
