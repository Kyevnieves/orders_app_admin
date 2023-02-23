const form = document.querySelector(".form-producto");
const inputFile = document.querySelector(".inputFile");
const productImgURL = document.querySelector(".product-img-url");
const btnSubmitProduct = document.querySelector(".btn-submit-product");
const hostCDN = `https://cdn.kyev.online`;
// FUNCION PARA CARGAR IMAGENES DE PRODUCTOS AL CDN
if (inputFile !== null) {
  if (productImgURL.value !== "") {
    console.log("Si hay una imagen");
  } else {
    btnSubmitProduct.disabled = true;
  }

  inputFile.addEventListener("change", () => {
    const formData = new FormData(form);
    axios
      .post(`${hostCDN}/guardar/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const fileName = res.data;
        productImgURL.value = `${hostCDN}/images/products/${fileName}`;
        btnSubmitProduct.disabled = false;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// FUNCION PARA CARGAR IMAGENES DE USUARIOS EN CDN
const formUser = document.querySelector(".form-usuario");
const inputFileUser = document.querySelector(".inputFileUser");
const userImgURL = document.querySelector(".user-img-url");
const btnSubmitUser = document.querySelector(".btn-submit-user");

if (inputFileUser !== null) {
  if (userImgURL.value !== "") {
    console.log("Si hay una imagen");
  } else {
    btnSubmitUser.disabled = true;
  }

  inputFileUser.addEventListener("change", () => {
    const formData = new FormData(formUser);
    axios
      .post(`${hostCDN}/guardar/imagen`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        const fileName = res.data;
        userImgURL.value = `${hostCDN}/images/users/${fileName}`;
        btnSubmitUser.disabled = false;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
