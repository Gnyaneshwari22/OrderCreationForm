let productForm = document.getElementById("productForm");

// Event listener for form submission
productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productDetails = {
    name: document.getElementById("productname").value,
    price: document.getElementById("productPrice").value,
    category: document.getElementById("categeory").value,
  };

  axios
    .post(
      "https://crudcrud.com/api/c08a3900fa44451686806d77972fccb8/products",
      productDetails
    )
    .then(() => {
      alert("Order Created successfully!");
      getAllProducts(); // Refresh product list
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
  productForm.reset();

  // axios.post(
  //   "https://6794661aaad755a134e96aa2.mockapi.io/api/v1/:products",
  //   productDetails
  // );
});

// Function to get and display all products
function getAllProducts() {
  axios
    .get("https://crudcrud.com/api/c08a3900fa44451686806d77972fccb8/products")
    .then((res) => {
      // Clear previous content
      // console.log("The orders are " + res.data);
      res.data.map((item) => {
        console.log(item);
      });
      document.getElementById("Electronics Items").innerHTML = "";
      document.getElementById("SkinCare Items").innerHTML = "";
      document.getElementById("Food Items").innerHTML = "";

      const products = res.data;
      //console.log("The orders are " + products);
      products.forEach((product) => {
        // Select the appropriate container

        const container = document.getElementById(product.category);

        // Create a Bootstrap-styled card with the delete button inside
        const productCard = document.createElement("div");
        productCard.className = "col-md-4";
        productCard.innerHTML = `
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: ₹${product.price}</p>
              <button class="btn btn-danger btn-sm delete-btn">Delete Order</button>
            </div>
          </div>
        `;

        // Add event listener for the delete button
        const deleteButton = productCard.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
          deleteProduct(product._id, productCard);
        });

        container.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Function to delete a product
function deleteProduct(productId, productCard) {
  axios
    .delete(
      `https://crudcrud.com/api/c08a3900fa44451686806d77972fccb8/products/${productId}`
    )
    .then(() => {
      // Remove the product card from the UI
      productCard.remove();
      alert(`Order with ID ${productId} deleted Successfully`);
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
}

// Load products on page load
window.onload = getAllProducts;
