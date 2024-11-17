

function displayCartItems() {
    const cartContainer = document.querySelector('.cards-container-cart');
    console.log(window.cart)
    if (window.cart.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'Your cart is empty!';
        cartContainer.appendChild(noItemsMessage);
        return;
    }

    cartContainer.innerHTML = ''; 

    window.cart.forEach((cartItem, index) => {
        const cartCard = document.createElement('div');
        cartCard.classList.add('card');
        cartCard.id = `cart-item-${index + 1}`;

        // Product Image
        const cartImage = document.createElement('img');
        cartImage.src = cartItem.imageUrl;
        cartImage.alt = cartItem.name;

        // Product Name
        const cartName = document.createElement('h2');
        cartName.textContent = cartItem.name;

        // Product Price
        const cartPrice = document.createElement('p');
        cartPrice.textContent = `Price: $${cartItem.price.toFixed(2)}`;

        // Quantity Input
        const quantityLabel = document.createElement('label');
        quantityLabel.setAttribute('for', `quantity-${index}`);
        quantityLabel.textContent = 'Quantity:';

        const quantityInput = document.createElement('label');
        quantityInput.id = `quantity-${index}`;
        quantityInput.textContent = cartItem.count;
       
        // Remove Button
        const removeButton = document.createElement('button');
        removeButton.classList.add('button');
        removeButton.textContent = 'Remove';
        
        removeButton.addEventListener('click', () => {
            removeCartItem(index);
        });

        // Append all elements to cart card
        cartCard.appendChild(cartImage);
        cartCard.appendChild(cartName);
        cartCard.appendChild(cartPrice);
        cartCard.appendChild(quantityLabel);
        cartCard.appendChild(quantityInput);
        cartCard.appendChild(removeButton);

        // Append the cart card to the cart container
        cartContainer.appendChild(cartCard);
    });
}

/**
 * Removes a cart item by index and updates the display
 * @param {number} index - Index of the cart item to remove
 */
function removeCartItem(index) {
    window.cart.splice(index, 1); // Remove the item from the cart array
    displayCartItems(); // Re-render the cart items
}

/**
 * Function to initialize the page
 */
function initPage() {
    displayCartItems(); // Show cart items on the cart page
}

initPage();
