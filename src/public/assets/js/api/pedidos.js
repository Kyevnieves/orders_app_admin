const btnProcesarPedidos = document.querySelectorAll(".btn-process");

const procesarPedido = async (id) => {
  const thisUrl = window.location.origin
  try {
    const response = await axios.post(
      `${thisUrl}/procesar/pedido/${id}`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

btnProcesarPedidos.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName == "I") {
      const pedido = e.target.parentElement.parentElement.parentElement;
      let status = pedido.querySelector(".status-procesado");
      if ((status.textContent = "En espera")) {
        status.innerText = "Correcto";
        status.classList.add("bg-success");
      }
    } else if (e.target.tagName == "A") {
      const pedido = e.target.parentElement.parentElement;
      let status = pedido.querySelector(".status-procesado");
      if ((status.textContent = "En espera")) {
        status.innerText = "Correcto";
        status.classList.add("bg-success");
      }
    }
    let id = e.target.dataset.id;
    procesarPedido(id);
  });
});
