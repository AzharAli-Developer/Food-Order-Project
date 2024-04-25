// cart.js

// Initialize the cart array from local storage or an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add an item to the cart
function addToCart(id, name, price) {
    const item = {
        id: id,
        name: name,
        price: price,
        quantity: 1
    };

    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} has been added to your cart!`);


    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Call the function to render cart items on the page
    renderCartItems();

    // Update the total price
    updateTotalPrice();
}

// Function to render cart items on the page
function renderCartItems() {
    const cartSection = document.querySelector('.cart');

    // Check if cartSection is null
    if (!cartSection) {
        return;
    }

    // Clear existing content in the cart section
    cartSection.innerHTML = '';

    // Check if the cart is not empty
    if (cart.length > 0) {
        // Iterate through the cart items and create HTML elements
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
            <div class="cart-item-details">
            <p>${item.name} </p>
            <img src="./images/${item.id}.jpg" width="100" height="100"/>
            <p>Price: $${item.price.toFixed(2)}</p>
            <div class="quantity-buttons">
            <div>
                <p>Quantity:</p>
            </div>
                <button onclick="decreaseQuantity('${item.id}')">-</button>
                <span id="quantity-${item.id}">${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')">+</button>
                <button onclick="removeItem('${item.id}')">Remove</button>

            </div>
        </div>
            `;

            cartSection.appendChild(cartItemElement);
        });
    } else {
        // If the cart is empty, display a message
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        emptyCartMessage.classList.add('empty-cart-message'); // Add the class
        cartSection.appendChild(emptyCartMessage);
    }
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');

    if (totalPriceElement) {
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
}

function updateItemizedList() {
    const itemizedListElement = document.getElementById('itemized-list');

    if (itemizedListElement) {
        itemizedListElement.innerHTML = '';

        // Iterate through the cart items and create HTML elements
        cart.forEach(item => {
            const itemizedItemElement = document.createElement('div');
            itemizedItemElement.classList.add('itemized-item');
            itemizedItemElement.innerHTML = `
                <p>${item.name} (Quantity: ${item.quantity}): $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            itemizedListElement.appendChild(itemizedItemElement);
        });
    }
}

function removeItem(itemId) {
    const updatedCart = cart.filter(item => item.id !== itemId);
    cart = updatedCart;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateItemizedList();
}

// Function to handle checkout
function checkout() {
    // Add logic for checkout, e.g., redirect to a checkout page
    // For now, we'll clear the cart and itemized list, and show an alert
    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    updateCartDisplay(); // Update the cart display

    const itemizedListElement = document.getElementById('itemized-list');
    if (itemizedListElement) {
        itemizedListElement.innerHTML = ''; // Clear the itemized list
    }

    alert('Your order has been placed!'); // Show an alert
}



function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1 && cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateTotalPrice(); // Update total price
        updateItemizedList(); // Update itemized list
    }
}

// Function to increase quantity
function increaseQuantity(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateTotalPrice(); // Update total price
        updateItemizedList(); // Update itemized list
    }
}


// Call the initial render when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Call the initial render when the page loads
    updateCartDisplay();
    updateItemizedList();
});
