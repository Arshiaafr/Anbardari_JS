const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#addNewProductBtn");
import Storage from "./Storage.js";

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) =>
      this.addNewProductBtnHandler(e)
    );
    this.products = [];
  }

  addNewProductBtnHandler(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;

    if (!title || !quantity || !category) return;
    Storage.savedProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductList();
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductList() {
    let result = ``;

    this.products.forEach((product) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id === product.category
      );

      result += `<div class="flex flex-col gap-y-4 bg-slate-700 rounded-xl p-4 mb-3">
      <div class="flex justify-center items-center">
        <span class="flex-1">${product.title}</span>
      
        <div class="flex justify-between items-center gap-x-2">
          <span>1401/02/21</span>
          <span class="border-2 border-slate-400 p-1 rounded-xl hover:bg-slate-900 text-slate-300">
            ${product.category}
          </span>
          <span class="bg-slate-500 flex justify-center items-center w-7 h-7 rounded-full border-2 border-slate-400 text-slate-300 font-bold">
            ${product.quantity}
          </span>
          <button class="bg-red-500 rounded p-1" data-id=${product.id}>
            حذف
          </button>
        </div>
      </div>
      </div>`;
    });

    const ProductDOM = document.getElementById("products-list");

    ProductDOM.innerHTML = result;
  }
}

export default new ProductView();
