const btnAumnt = document.querySelectorAll(".btn-mas");
const btnDecre = document.querySelectorAll(".btn-min");
const btnPedido = document.querySelector(".btn-realizar-pedido");
btnAumnt.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = e.target.parentElement;
    const input = product.querySelector(".cantidad");
    input.value++;
    // CONVERSION Y AUMENTO
  });
});

btnDecre.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const product = e.target.parentElement;
    const input = product.querySelector(".cantidad");
    if (input.value == 0) {
      console.log("No se puede disminuir");
    } else {
      input.value--;
    }
    // CONVERSION Y AUMENTO
  });
});

btnPedido == undefined
  ? console.log("")
  : btnPedido.addEventListener("click", () => {
      let alert = document.querySelector(".alert-pedido");
      alert.classList.toggle("show");
      btnPedido.classList.add("display-none");
      listarProductos();
    });

const pedido = [];
let fecha = Date.now();
let companyname = document.querySelector(".company-name").textContent;
let companyrif = document.querySelector(".company-rif").textContent;
let companyInfo = {
  fecha,
  companyname,
  companyrif,
};
const cardsProduct = document.querySelectorAll(".card-product");
let indice = 1;
const listarProductos = () => {
  let inputPedido = document.querySelector(".inputPedido");
  cardsProduct.forEach((card) => {
    let producto = card.querySelector(".producto").textContent;
    let precioString = card.querySelector(".precio").textContent;
    let precio = precioString.slice(0, -1);
    let codigo = card.querySelector(".codigo").textContent;
    let cantidad = card.querySelector(".cantidad").value;
    if (cantidad == 0) {
      return;
    }
    let json = {
      indice,
      producto,
      codigo,
      precio,
      cantidad,
    };
    indice++;
    pedido.push(json);
  });

  const orderInfo = [
    {
      companyInfo,
      pedido,
    },
  ];

  const string = JSON.stringify(orderInfo);
  inputPedido.value = string;
};
