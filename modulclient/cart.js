window.onload = async () => {
  try {
    let data = await axios.get(
      "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product"
    );
    // console.log(data.data);
    if (data) {
      shopItemData = data?.data;
    }
    generateCartItem();
    totalAmount();

    // console.log(shopItemData);
  } catch (error) {
    console.log(error);
  }
};

let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
basket = JSON.parse(localStorage.getItem("dữ liệu")) || [];

let generateCartItem = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map(x => {
        let { name, item } = x;

        let search = shopItemData.find(y => y.name === name) || [];
        return `
        <div class ="basket-item">

        <img width=100 src=${search.img} alt=""/>
        <div class="Detail-cart">
            <div className="price-ifo-x">
                <h4 class="title-price">
                <p>${search.name}</p>
                <p>$ ${search.price}</p>
                </h4>
                <i onclick ="removeItem('${name}')" class="bi bi-x-lg"></i>
            </div>

            <button class="btn-new">
          <i onclick="increment('${name}')"class="bi bi-plus"></i>
          <div id ='${name}'class="quantity">${item}</div>
          <i onclick="decrement('${name}')"class="bi bi-dash-lg"></i>
        </button>
            <h3> Tổng : $ ${item * search.price}</h3>
        </div>
        </div>
        `;
      })
      .join("")); //join xoá dấu
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2> giỏ hàng trống </h2>
    <a class="back"href="../index.html">Quay về trang</a>
    `;
  }
};

increment = name => {
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
  generateCartItem();

  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
  updates(selectItem);
};

decrement = name => {
  let selectItem = name;
  let search = basket.find(x => x.name === selectItem);

  //ko có trong basket trả về hàm luôn
  if (search === undefined) return;

  if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  updates(selectItem);
  //xoá hết dữ liệu item khi không có sp nafo
  basket = basket.filter(x => x.item !== 0);
  generateCartItem();

  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
};

updates = name => {
  let search = basket.find(x => x.name === name);

  document.getElementById(name).innerHTML = search.item;
  //khi hàm update chạy thì cho sản phẩm chạy theo
  calculation();
  totalAmount();
};

let removeItem = name => {
  let selectItem = name;
  console.log(selectItem);

  basket = basket.filter(x => x.name !== selectItem);

  generateCartItem();
  calculation();

  totalAmount();

  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map(x => {
        let { item, name } = x;
        let search = shopItemData.find(y => y.name === name) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0); // cộng dồn

    // console.log(amount);
    label.innerHTML = `<h3>tổng tiền giỏ hàng: ${amount}$ </h3>
    <button class="checkOut">Thanh Toán <i class="bi bi-wallet"></i></button>
    <button onclick="clearCart()"class="remove">Trả hàng <i class="bi bi-arrow-counterclockwise"></i></button>
    `;
  } else return;
};

let clearCart = () => {
  basket = [];
  calculation();
  generateCartItem();
  localStorage.setItem("dữ liệu", JSON.stringify(basket)); //lưu giỏ hàng vào bộ nhớ với key  là "dữ liệu",chuyển dổi thành kiểu json
};
