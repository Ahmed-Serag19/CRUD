let productNameInput = document.querySelector("#productName");
let productPriceInput = document.querySelector("#productPrice");
let productCategoryInput = document.querySelector("#productCategory");
let productDescInput = document.querySelector("#productDesc");
let addProductButton = document.querySelector("#addButton");
let updateProductButton = document.querySelector("#updateButton");
let tableBody = document.querySelector("#table-body");
let searchBar = document.querySelector("#searchBar");
let productContainer = [];
let currentIndex = 0;

if (localStorage.getItem("ourProducts") !== null) {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  displayProduct();
}

addProductButton.addEventListener("click", addProduct);
updateProductButton.addEventListener("click", addUpdated);

function addProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    describtion: productDescInput.value,
  };

  productContainer.push(product);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
  clearForm();
  console.log(productContainer);
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
}

function displayProduct() {
  let productDisplayViewer = ``;

  productContainer.map((product, index) => {
    productDisplayViewer += `
    <tr>
    <td>${index}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.category}</td>
    <td>${product.describtion}</td>
    <td><button onclick="updateProduct(${index})"  class="btn btn-outline-info">
    Update Product
  </button></td>
    <td><button onclick="deleteProduct(${index})"  class="btn btn-outline-danger">
    Delete Product
  </button></td>
    </tr>`;
  });
  tableBody.innerHTML = productDisplayViewer;
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  displayProduct();
}

function searchProduct(productName) {
  let productDisplayViewer = ``;
  productContainer.map((product, index) => {
    if (product.name.toLowerCase().includes(productName.toLowerCase())) {
      productDisplayViewer += `
        <tr>
        <td>${index}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
        <td>${product.describtion}</td>
        <td><button onclick="updateProduct(${index})" id="updateButton" class="btn btn-outline-secondary">
        Update Product
      </button></td>
        <td><button onclick="deleteProduct(${index})" id="deleteButton" class="btn btn-outline-danger">
        Delete Product
      </button></td>
        </tr>`;
    }
    tableBody.innerHTML = productDisplayViewer;
  });
}

function updateProduct(i) {
  currentIndex = i;
  productNameInput.value = productContainer[i].name;
  productPriceInput.value = productContainer[i].price;
  productCategoryInput.value = productContainer[i].category;
  productDescInput.value = productContainer[i].describtion;

  addProductButton.style.display = "none";
  updateProductButton.style.display = "inline-block";
}

function addUpdated() {
  productContainer[currentIndex].name = productNameInput.value;
  productContainer[currentIndex].price = productPriceInput.value;
  productContainer[currentIndex].category = productCategoryInput.value;
  productContainer[currentIndex].describtion = productDescInput.value;
  displayProduct();
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));

  clearForm();
  addProductButton.style.display = "inline-block";
  updateProductButton.style.display = "none";
}
