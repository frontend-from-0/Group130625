const products = {
  apples: {
    quantity: 1,
    price: 1,
  },
  bananas: {
    quantity: 2,
    price: 5,
  },
  bread: {
    quantity: 1,
    price: 5,
  },
  eggs: {
    quantity: 1,
    price: 5,
  },
};
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
  for (let product in products) {
    const productQuantity = document.getElementById(`${product}_quantity`);
    productQuantity.textContent = products[product].quantity;
    totalPrice += products[product].quantity * products[product].price;
    const addToCartButton = document.getElementById(`${product}_add`);
    addToCartButton.addEventListener('click', () =>
      addToCart(product, productQuantity),
    );
    const removeProduct = document.getElementById(`${product}_remove`);
    removeProduct.addEventListener('click', () => removeFromCart(product));

    const decrementButton = document.getElementById(`${product}_decrement`);
    decrementButton.addEventListener('click', () =>
      decrement(product, productQuantity),
    );
  }

  document.getElementById('total_price').textContent = totalPrice;
});

function addToCart(product, productQuantity) {
  console.log('Clicked add to cart button.');
  products[product].quantity++;
  productQuantity.textContent = products[product].quantity;
  totalPrice += products[product].price;
  document.getElementById('total_price').textContent = totalPrice;

  document.getElementById(`${product}_cart`).classList.remove('hidden');
}

function removeFromCart(product) {
  console.log('Clicked remove to cart button.');
  totalPrice -= products[product].quantity * products[product].price;
  products[product].quantity = 0;
  document.getElementById('total_price').textContent = totalPrice;
  document.getElementById(`${product}_cart`).classList.add('hidden');
}

function decrement(product, productQuantity) {
  console.log('Clicked decrement by one.');

  if (products[product].quantity > 1) {
    products[product].quantity--;
    productQuantity.textContent = products[product].quantity;
    totalPrice -= products[product].price;
    document.getElementById('total_price').textContent = totalPrice;
  } else {
    removeFromCart(product);
  }
}
