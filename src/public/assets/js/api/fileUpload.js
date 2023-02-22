const form = document.querySelector(".form-agregar-producto");
const inputFile = document.querySelector(".inputFile");
const productImgURL = document.querySelector(".product-img-url");
const btnSubmitProduct = document.querySelector(".btn-submit-product");
const hostCDN = `https://cdn.kyev.online`;
inputFile.addEventListener("change", () => {
  const formData = new FormData(form);
  axios
    .post("http://localhost:3000/guardar/imagen", formData, {
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
