/**
 * 1 tạo lớp đối tượng sản phảm
 * 2 hàm tạo sản phâmr {
 *    - lưu sản phầm
 *   - in sản phẩm
 * tạo ra 2 button xoá xửa
 *
 * }
 * 3 tạo khu vực search sản phẩm
 * 4 hàm xoá , sửa {
 * xoá =>lưu
 * sửa =>lưu
 * in ra màn hình lại
 *
 * }
 */

let ProductList = [];
//call axios
async function getData() {
  try {
    let Data = await axios.get(
      "https://634cd9bdf5d2cc648e95e7c8.mockapi.io/product"
    );
    ProductList = Data.data;
    console.log(ProductList);
  } catch (error) {
    console.log("err");
  }
}

function renderProduct() {
  ProductList.map(value => {
    let div = +`<div class="product-info col-3 text-center bg-light">
    <div class="product-img">
      <img src="${value.hinhAnh}" alt="" />
      <div class="title text-start">
        <h5>${value.name}</h5>
        <p>
          ${value.moTa}
        </p>
        <div class="p-2">${value.price}</div>

        <button class="btn btn-info">sửa</button
        ><button class="btn btn-info">xoá</button>
      </div>
    </div>
  </div>
    `;
  });
}

