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
const cardsProduct = document.querySelectorAll(".card-product");
let indice = 1;
const listarProductos = () => {
  let inputPedido = document.querySelector(".inputPedido");
  cardsProduct.forEach((card) => {
    let companyname = document.querySelector(".company-name").textContent;
    let companyrif = document.querySelector(".company-rif").textContent;
    let producto = card.querySelector(".producto").textContent;
    let precioString = card.querySelector(".precio").textContent;
    let precio = precioString.slice(0, -1);
    let codigo = card.querySelector(".codigo").textContent;
    let cantidad = card.querySelector(".cantidad").value;
    if (cantidad == 0) {
      return;
    }
    let json = {
      fecha,
      companyname,
      companyrif,
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
      pedido,
    },
  ];

  const string = JSON.stringify(orderInfo);
  inputPedido.value = string;
};

/// SCRIPTS PRODUCTOS CREAR PRODUCTO
const products = document.querySelectorAll(".product");
const inputProducts = document.querySelector(".inputProducts");
let resultado = [];
if (products !== undefined) {
  products.forEach((p) => {
    p.addEventListener("click", (e) => {
      if (e.target.tagName == "IMG") {
        e.target.parentElement.classList.toggle("selected");
        let seleccionados = document.querySelectorAll(".selected");
        setTimeout(() => {
          resultado = "";
          seleccionados.forEach((card) => {
            resultado += `${card.dataset.id},`;
          });
          let result = resultado.substr(0, resultado.length - 1);
          let inputValue = `(${result})`;
          inputProducts.value = inputValue;
        }, 500);
      }
    });
  });
}
