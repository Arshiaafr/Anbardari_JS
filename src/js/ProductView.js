const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#addNewProductBtn");
const inputSearch = document.querySelector("#search-input");
const sortInput = document.querySelector("#sort-input");

import Storage from "./Storage.js";

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) =>
      this.addNewProductBtnHandler(e)
    );

    inputSearch.addEventListener("input", (e) => this.searchInputHandler(e));

    sortInput.addEventListener("change", (e) => this.sortInputHandler(e));
    this.products = [];
  }

  searchInputHandler(e) {
    const value = e.target.value;
    const filteredProduct = this.products.filter((p) =>
      p.title.includes(value)
    );
    // this.products = filteredProduct;
    this.createProductList(filteredProduct);
  }

  sortInputHandler(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductList(this.products);
  }

  addNewProductBtnHandler(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;

    if (!title || !quantity || !category) return;
    Storage.savedProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
    productQuantity.value = "";
    productCategory.value = "";
    productTitle.value = "";
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductList(products) {
    let result = ``;

    products.forEach((product) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == product.category
      );

      result += `<div class="flex flex-col gap-y-4 bg-slate-700 rounded-xl p-4 mb-3">
      <div class="flex justify-center items-center">
        <span class="flex-1">${product.title}</span>
      
        <div class="flex justify-between items-center gap-x-2">
          <span>${new Date().toLocaleDateString("fa-IR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
          <span class="border-2 border-slate-400 p-1 rounded-xl hover:bg-slate-900 text-slate-300">
            ${selectedCategory.title}
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
