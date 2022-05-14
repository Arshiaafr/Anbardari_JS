const titleCategory = document.querySelector("#category-title");
const descriptionCategory = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#addNewCategoryBtn");
import Storage from "./Storage.js";
class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) =>
      this.addNewCategoryBtnHandler(e)
    );
    this.categories = [];
  }

  addNewCategoryBtnHandler(e) {
    e.preventDefault();
    const title = titleCategory.value;
    const description = descriptionCategory.value;

    if (!title || !description) return;
    console.log(description);

    Storage.savedCategories({ title, description });
    this.categories = Storage.getAllCategories();
    this.CreateCategoryList();
    titleCategory.value = "";
    descriptionCategory.value = "";
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }

  CreateCategoryList() {
    let result = `    <option class="bg-slate-300 text-slate-400">انتخاب کنید</option>`;

    this.categories.forEach((category) => {
      result += `<option value= ${category.id} class="bg-slate-300 text-slate-400"> ${category.title}</option>`;
    });

    const categoryItems = document.getElementById("product-category");

    categoryItems.innerHTML = result;
  }
}

export default new CategoryView();
