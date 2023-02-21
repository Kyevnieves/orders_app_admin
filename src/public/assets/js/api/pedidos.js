const btnProcesarPedidos = document.querySelectorAll(".btn-process");
const btnEnviarPedidos = document.querySelectorAll(".btn-enviado");

function startDownloadCsv(input) {
  const blob = new Blob([input], { type: "application/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = "test-csv.csv";
  a.href = url;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const procesarPedido = async (id) => {
  const thisUrl = window.location.origin;
  try {
    const response = await axios.post(`${thisUrl}/procesar/pedido/${id}`);
    const resultadoCsv = response.data;
    startDownloadCsv(resultadoCsv);
  } catch (error) {
    console.log(error);
  }
};

btnProcesarPedidos.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName == "I") {
      const pedido =
        e.target.parentElement.parentElement.parentElement.parentElement;
      let strgPedido = e.target.parentElement.parentElement.dataset.pedido;
      let jsonPedido = JSON.parse(strgPedido);
      let status = pedido.querySelector(".status-procesado");
      if ((status.textContent = "En espera")) {
        status.innerText = "Correcto";
        status.classList.add("bg-success");
      }
    } else if (e.target.tagName == "A") {
      const pedido = e.target.parentElement.parentElement.parentElement;
      let strgPedido = e.target.parentElement.dataset.pedido;
      let jsonPedido = JSON.parse(strgPedido);
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

const marcarEnviadoPedido = async (id) => {
  const thisUrl = window.location.origin;
  try {
    const response = await axios.post(`${thisUrl}/enviado/pedido/${id}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

btnEnviarPedidos.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.tagName == "I") {
      const pedido =
        e.target.parentElement.parentElement.parentElement.parentElement;
      let status = pedido.querySelector(".status-enviado");
      if ((status.textContent = "En espera")) {
        status.innerText = "Correcto";
        status.classList.add("bg-success");
      }
    } else if (e.target.tagName == "A") {
      const pedido = e.target.parentElement.parentElement.parentElement;
      let status = pedido.querySelector(".status-enviado");
      if ((status.textContent = "En espera")) {
        status.innerText = "Correcto";
        status.classList.add("bg-success");
      }
    }
    let id = e.target.dataset.id;
    marcarEnviadoPedido(id);
  });
});
