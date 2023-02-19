const Loggin = async () => {
  const response = await axios({
    method: "get",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    url: "http://localhost:4000",
    data: "order",
  }).then(function (response) {
    console.log(response.data);
  });
};
Loggin();
