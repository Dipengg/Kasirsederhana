// Data Produk (Kode Produk, Nama Produk, Harga) menggunakan array
let products = [
  { code: "P001", name: "Kaos", price: 50000 },
  { code: "P002", name: "Celana", price: 75000 },
  { code: "P003", name: "Topi", price: 25000 },
  // tambahkan produk lain di sini
];

let cart = []; // Keranjang Belanja

// Fungsi untuk mencari produk berdasarkan kode
function findProduct() {
  let productCode = document.getElementById("productCode").value;
  let product = products.find(prod => prod.code === productCode);
  if (product) {
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = product.price;
      document.getElementById("productDetails").style.display = "block";
  } else {
      alert("Produk tidak ditemukan.");
  }
}

// Fungsi untuk menambah produk ke keranjang
function addToCart() {
  let productCode = document.getElementById("productCode").value;
  let product = products.find(prod => prod.code === productCode);
  let quantity = parseInt(document.getElementById("quantity").value);
  if (product) {
      let itemIndex = cart.findIndex(item => item.code === product.code);
      if (itemIndex !== -1) {
          cart[itemIndex].quantity += quantity;
      } else {
          cart.push({ code: product.code, name: product.name, price: product.price, quantity: quantity });
      }
      updateCartView();
      resetForm();
  } else {
      alert("Produk tidak ditemukan.");
  }
}

// Fungsi untuk menampilkan isi keranjang belanja
function updateCartView() {
  let cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
      let listItem = document.createElement("li");
      listItem.textContent = `${item.name} x ${item.quantity} = ${item.price * item.quantity}`;
      cartList.appendChild(listItem);
      total += item.price * item.quantity;
  });
  cartList.innerHTML += `<li><strong>Total Belanja:</strong> ${total}</li>`;
}

// Fungsi untuk melakukan checkout
function checkout() {
  if (cart.length > 0) {
      let confirmation = confirm("Apakah Anda yakin ingin checkout?");
      if (confirmation) {
          alert("Terima kasih telah berbelanja!");
          cart = [];
          updateCartView();
      }
  } else {
      alert("Keranjang belanja kosong.");
  }
}

// Fungsi untuk mereset form setelah produk ditambahkan ke keranjang
function resetForm() {
  document.getElementById("productCode").value = "";
  document.getElementById("productName").textContent = "";
  document.getElementById("productPrice").textContent = "";
  document.getElementById("quantity").value = 1;
  document.getElementById("productDetails").style.display = "none";
}
