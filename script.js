// Carrega lista de produtos na pagina
const products = document.getElementById("products");
function carregarProdutos() {
  for (const product of productsList) {
    products.innerHTML += `
    <div class="product">
    <img class="capaProd" src="${product.capaProduto}" alt="${
      product.descricao
    }"/>
    <p class="title">${product.nome}</p>
    <p class="price priceP">$${product.preco.toFixed(2)}</p>
    <button class="buyBtn" type="button">Comprar</button>
    </div>`;
  }
}
carregarProdutos();

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeBtn = document.getElementsByClassName("remove-Btn");
  for (let i = 0; i < removeBtn.length; i++) {
    let button = removeBtn[i];
    button.addEventListener("click", removerItem);
  }

  let quantityInput = document.getElementsByClassName("quantity");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", mudarQuantidade);
  }

  let buyButtons = document.getElementsByClassName("buyBtn");
  for (let i = 0; i < buyButtons.length; i++) {
    let button = buyButtons[i];
    button.addEventListener("click", clicouComprar);
  }

  document
    .getElementsByClassName("checkout")[0]
    .addEventListener("click", finalizarCompra);
}

function finalizarCompra() {
  alert("Obrigado pela compra!");
}

function removerItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  atualizarTotal();
}

function mudarQuantidade(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  atualizarTotal();
}

function clicouComprar(event) {
  let button = event.target;
  let shopItem = button.parentElement;
  let title = shopItem.getElementsByClassName("title")[0].innerText;
  let price = shopItem.getElementsByClassName("priceP")[0].innerText;
  let image = shopItem.getElementsByClassName("capaProd")[0].src;
  addItemCarrinho(title, price, image);
  atualizarTotal();
}

function addItemCarrinho(title, price, image) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Este item ja esta no carrinho!");
      return;
    }
  }
  let cartRowContents = `
  <div class="info-manga">
    <img class="cover" src="${image}" width="80" height="100" />
    <span class="title">${title}</span>
  </div>
  <span class="price">${price}</span>
  <div class="prodQuantity">
    <input class="quantity" type="number" value="1" />
    <button class="remove-Btn" type="button">Remover</button>
  </div>
  `;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("remove-Btn")[0]
    .addEventListener("click", removerItem);
  cartRow
    .getElementsByClassName("quantity")[0]
    .addEventListener("change", mudarQuantidade);
}

function atualizarTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("price")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = total.toFixed(2);
  document.getElementsByClassName("total-price")[0].innerText = "$ " + total;
}
