let productItemData = [];

window.onload = async () => {
  try {
    let data = await axios.get(
      "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product"
    );
    console.log(data.data);
    if (data) {
      productItemData = data?.data;
    }
    generateShop();

    // console.log(shopItemData);
  } catch (error) {
    console.log(error);
  }
};
let getProductData = () => {
  promise = axios({
    url: "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product",
    method: "GET",
  });

  promise
    .then(function (response) {
      productItemData = response.data;
      generateShop();
    })
    .catch(function (err) {
      console.log(err);
    });
};
//ham tao

//tạo
let createProduct = () => {
  let isFormValid = validateForm();
  // console.log(isFormValid);
  if (isFormValid === false) {
    return;
  }
  console.log("dd");
  //lưu vào ở đay
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;
  //chack mã
  for (var i = 0; i < productItemData.length; i++) {
    if (productItemData[i].id === id) {
      alert("mã  đã tồn tại ");
      return;
    }
  }

  let newProduct = new product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  axios({
    url: "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product",
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      console.log(res);
      getProductData();
    })
    .catch(function (err) {
      console.log(err);
    });
};

let generateShop = () => {
  let shop = document.getElementById("shop");

  let html = ""; //cộng dồn sau mỗi vòng lặp
  productItemData.forEach(x => {
    //var currentStudent = data[i];

    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
      x;
    //ko càn x.key
    html += ` 
    <div type ="${type}" id="product-id-${name}"class="item">
    <img
      width="200"
      src="${img}"s
      alt=""
    />
    <h3>${name}</h3>
    <div class="detail">
      <p>
        ${frontCamera} 
        ${screen}
        ${backCamera}
        ${frontCamera} 
        <br>
        ${desc}
      </p>
      <div class="price-quantity">
        <h3>$ ${price} </h3>
        <button onclick= "deleteProduct('${id}')"class="btn btn btn-warning">
        xoá
        </button>
        <button onclick= "update('${id}')"class="btn btn btn-warning">
        sửa
        </button>
      </div>
    </div>
  </div>
    `;
  });

  console.log(html);
  //sau này đổi chổ khác thì lên trên đổi
  shop.innerHTML = html;
};

let deleteProduct = id => {
  let selectItem = id;
  console.log(selectItem);

  productItemData = productItemData.filter(x => x.id !== selectItem);

  generateShop();

  axios({
    url: "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      console.log(res);
      generateShop();
    })
    .catch(function (err) {
      console.log(err);
    });
};

function validateForm() {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;

  isValid = true;
  isValid = required(id, "id-pr");
  isValid = required(name, "name-pr");
  return isValid;
}
let required = (val, id) => {
  if (val.length === 0) {
    document.getElementById(id).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }

  document.getElementById(id).innerHTML = "";
  return true;
};
