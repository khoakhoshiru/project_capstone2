//tao mang
let productItemData = [];

//ham tao

let createProduct = () => {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;

  let newProduct = new product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productItemData.push(newProduct);
  console.log(productItemData);

  axios
    .post("https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product", {
      product,
    })
    .then(result => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
