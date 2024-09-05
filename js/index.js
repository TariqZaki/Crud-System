let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let productImage = document.getElementById("productImage");
let addBtn = document.getElementById("addBtn");
let updateProduct = document.getElementById("updateProduct");
let deleteBtn = document.querySelector(".deleteBtn");
let updateBtn = document.querySelector(".updateBtn");
let searchInput = document.querySelector(".searchInput");
let rowData = document.getElementById("rowData");

let productContainer = [];
if (localStorage.getItem("products") !== null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

addBtn.addEventListener("click", function () {
  addProduct();
});

function addProduct() {
  if ( validateInputs(productName) &&
    validateInputs(productPrice) &&
    validateInputs(productCategory) &&
    validateInputs(productDesc) &&
    validateInputs(productImage) ) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
      image: `images/${productImage.files[0]?.name}`, //===> optional chaining... ?.
    };
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearForm();
    displayProducts();
    //   console.log(productContainer);
  }
}

function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDesc.value = null;
  productImage.value = null;

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
  productImage.classList.remove("is-valid");
}

function displayProducts() {
  let cartona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    cartona += `
             <div class="col-md-2">
                    <div class="product text-center text-white">
                        <img src="${productContainer[i].image}" class="w-100" alt="product Image">
                        <h2 class="h4 mt-3">${productContainer[i].name}</h2>
                        <p class="text-bg-secondary mb-2">${productContainer[i].desc}</p>
                        <h3 class="h5"><span class="fw-bolder">price : </span>${productContainer[i].price}</h3>
                        <h3 class="h5"><span class="fw-bolder">category : </span>${productContainer[i].category}</h3>
                        <button onclick="deleteProducts(${i})" class="deleteBtn btn btn-danger w-75 my-2">Delete <i class="fas fa-trash-alt"></i></button>
                        <button onclick="setFormForUpdate(${i})" class="updateBtn btn btn-warning w-75">Update <i class="fas fa-pen-alt"></i></button>
                    </div>
                </div>
        `;
  }
  rowData.innerHTML = cartona;
}
// deleteBtn.addEventListener('click' , function(){
//   deleteProducts(i)
// })
function deleteProducts(deletedIndex) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        productContainer.splice(deletedIndex, 1);
        localStorage.setItem("products", JSON.stringify(productContainer));
        displayProducts();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

searchInput.addEventListener("input", function () {
  searchProducts();
});

function searchProducts() {
  let term = searchInput.value;
  let cartona = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      cartona = `
                <div class="col-md-2">
                    <div class="product text-center text-white">
                        <img src="${productContainer[i].image}" class="w-100" alt="product Image">
                        <h2 class="h4 mt-3">${productContainer[i].name}</h2>
                        <p class="text-bg-secondary mb-2">${productContainer[i].desc}</p>
                        <h3 class="h5"><span class="fw-bolder">price : </span>${productContainer[i].price}</h3>
                        <h3 class="h5"><span class="fw-bolder">category : </span>${productContainer[i].category}</h3>
                        <button onclick="deleteProducts(${i})" class="deleteBtn btn btn-danger w-75 my-2">Delete <i class="fas fa-trash-alt"></i></button>
                        <button onclick="setFormForUpdate(${i})" class="updateBtn btn btn-warning w-75">Update <i class="fas fa-pen-alt"></i></button>
                    </div>
                </div>
`;
    }
  }
  rowData.innerHTML = cartona;
}

let updatedIndex;
function setFormForUpdate(i) {
  addBtn.classList.add("d-none");
  updateProduct.classList.remove("d-none");
  updatedIndex = i;
  productName.value = productContainer[i].name;
  productPrice.value = productContainer[i].price;
  productCategory.value = productContainer[i].category;
  productDesc.value = productContainer[i].desc;
}

updateProduct.addEventListener("click", function () {
  updateProducts();
});

function updateProducts() {
  addBtn.classList.remove("d-none");
  updateProduct.classList.add("d-none");
  if (
    validateInputs(productName) &&
    validateInputs(productPrice) &&
    validateInputs(productCategory) &&
    validateInputs(productDesc) &&
    validateInputs(productImage)
  ) {
    productContainer[updatedIndex].name = productName.value;
    productContainer[updatedIndex].price = productPrice.value;
    productContainer[updatedIndex].desc = productDesc.value;
    productContainer[updatedIndex].category = productCategory.value;
    productContainer[updatedIndex].image = productImage.value;
    displayProducts();
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearForm();
  }
  Swal.fire({
    position: "center-center",
    icon: "success",
    title: "Your work has been updated",
    showConfirmButton: false,
    timer: 1500,
  });
}

function validateInputs(element) {
  let regex = {
    productName: /^[A-Z][a-z]{3,8}$/,
    productPrice: /^[1-9][0-9]{3,5}$/,
    productCategory: /^(Tv|Mobile|Screens|Electronics)$/i,
    productDesc: /^.{3,}$/m,
    productImage: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

productName.addEventListener("input", function () {
  validateInputs(this);
});
productPrice.addEventListener("input", function () {
  validateInputs(this);
});
productCategory.addEventListener("input", function () {
  validateInputs(this);
});
productDesc.addEventListener("input", function () {
  validateInputs(this);
});
productImage.addEventListener("input", function () {
  validateInputs(this);
});
