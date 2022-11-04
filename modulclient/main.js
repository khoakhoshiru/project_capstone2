// let product = axios
//   .get((URL = "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product"))
//   .then(function (response) {
//     // handle success
//     console.log(response);
//     shopItemData.push(product);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

/**
 * data here and push vào shopitemdata
 */
let shopItemData = [];
// let itemData = [];

window.onload = async () => {
  try {
    let data = await axios.get(
      "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product"
    );
    console.log(data.data);
    if (data) {
      shopItemData = data?.data;
    }
    generateShop();

    // console.log(shopItemData);
  } catch (error) {
    console.log(error);
  }
};

let basket = JSON.parse(localStorage.getItem("dữ liệu")) || []; //[];mảng giỏ hàng dùng để push sản phẩm vào đây

let generateShop = () => {
  let shop = document.getElementById("shop");

  let html = ""; //cộng dồn sau mỗi vòng lặp
  shopItemData.forEach(x => {
    //
    let { name, price, screen, backCamera, frontCamera, img, desc, type } = x; //ko càn x.key
    let search = basket.find(x => x.name === name) || []; //tìm trong giỏ hàng có sản phẩm nào chưa
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
        <button class="btn">
          <i onclick="increment('${name}')"class="bi bi-plus"></i>
          <div id ='${name}'class="quantity">${
      search.item === undefined ? 0 : search.item
    }</div>
          <i onclick="decrement('${name}')"class="bi bi-dash-lg"></i>
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

// generateShop();

let increment = name => {
  //tìm được sản phẩm thêm vào giỏ hàng nếu ko thì thảy vào mảng giỏ
  // có rồi thì tăng thêm 1 ;
  let selectItem = name;
  let search = basket.find(x => x.name === selectItem);
  if (search === undefined) {
    basket.push({
      name: selectItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket)
  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
  updates(selectItem);
};

let decrement = name => {
  let selectItem = name;
  let search = basket.find(x => x.name === selectItem);

  //ko có trong basket trả về hàm luôn
  if (search === undefined) return;

  if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  // console.log(basket);

  updates(selectItem);
  //xoá hết dữ liệu item khi không có sp nafo
  basket = basket.filter(x => x.item !== 0);
  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
};

let updates = name => {
  let search = basket.find(x => x.name === name);

  document.getElementById(name).innerHTML = search.item;
  //khi hàm update chạy thì cho sản phẩm chạy theo
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmout");

  cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0);

  // .reduce((x, y) =x+y ,0)); //ùng hàm each dể lấy ra sản phẩm
  //reduce dể cộng dồn bắt đàu từ số 0
};
calculation();
// gior hàng

// th1 có sp , th2 ko có sản phảm
