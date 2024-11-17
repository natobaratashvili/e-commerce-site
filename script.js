const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise-canceling feature.",
        price: 99.99,
        imageUrl: "imgs/img1.jfif",
        count: 1
    },
    {
        id: 2,
        name: "Smartphone",
        description: "A sleek smartphone with a large display and powerful camera.",
        price: 699.99,
        imageUrl: "imgs/img2.jfif",
        count: 1
    },
    {
        id: 3,
        name: "Laptop",
        description: "A lightweight laptop with a long-lasting battery and fast processor.",
        price: 1299.99,
        imageUrl: "imgs/img3.jfif",
        count: 1
    },
    {
        id: 4,
        name: "Smartwatch",
        description: "A smart and stylish watch with fitness tracking and notifications.",
        price: 199.99,
        imageUrl: "imgs/img6.webp",
        count: 1
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable sensitivity.",
        price: 29.99,
        imageUrl: "imgs/img5.jpg",
        count: 1
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
        price: 49.99,
        imageUrl: "imgs/img6.webp",
        count: 1
     }
];
 let cart = []


console.log(products);
const productsContainer = document.getElementById('cards-container');

displayProducts(products);
attachAddToCartListeners(products);
displayCartItems();
updateCartSummary();

function displayProducts(products) {
    try {
        productsContainer.innerHTML = ''; 

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
    
            const productImage = document.createElement('img');
            productImage.src = product.imageUrl;
            productImage.alt = product.name;
           
            const productName = document.createElement('p');
            productName.classList.add('product-name');
            const productNameStrong = document.createElement('strong');
            productNameStrong.textContent = product.name;
            productName.appendChild(productNameStrong);
    
    
            const description = document.createElement('p');
            description.classList.add('text');
            description.textContent = product.description;
            
            const productPrice = document.createElement('p');
            const productPriceBold = document.createElement('b');
            productPriceBold.textContent = `$${product.price.toFixed(2)}`;
            productPrice.appendChild(productPriceBold);
    
            const buttonElement = document.createElement('button');
    
        
            buttonElement.type = 'button';
            buttonElement.id = product.id; 
            buttonElement.classList.add('button');
            buttonElement.textContent = 'Add to Cart';
           
            card.appendChild(productImage);
            card.appendChild(productName);
            card.appendChild(description);
            card.appendChild(productPrice);
            card.appendChild(buttonElement)
    
            productsContainer.appendChild(card);
        });
    
    } catch (error) {
        
    }
}

function attachAddToCartListeners(products) {
    try {
    products.forEach(product => {
        console.log("event added")
        const buttonElement = document.getElementById(product.id);
        console.log(buttonElement)
        if (buttonElement) {
            buttonElement.addEventListener('click', () => {
                addToCart(product);
            });
        }
    });
} catch(error){

}
}



function filterProductsByName(products, searchQuery) {
    return products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
}


function saveCartToStorage() {
    // Save the cart array as a JSON string
    sessionStorage.setItem('cart', JSON.stringify(cart));
}


try {
    const filterInput = document.getElementById('product-filter-input');
console.log(filterInput);

filterInput.addEventListener('input', () => {
    console.log("event")
    
    const filterText = filterInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {

        return product.name.toLowerCase().includes(filterText) 
              
    });
    displayProducts(filteredProducts); 
});

} catch (error) {
    
}




function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].count += 1;
    } else {
        product.count = 1;
        cart.push(product);
    }
    updateCartSummary();
    saveCartToStorage(); 
    console.log(cart);
}


function displayCartItems() {
    try{
    const cartContainer = document.querySelector('.cards-container-cart');
    console.log(cart)
    if (cart.length === 0) {
        const noItemsMessage = document.createElement('p');
        noItemsMessage.textContent = 'Your cart is empty!';
        cartContainer.appendChild(noItemsMessage);
        return;
    }

    cartContainer.innerHTML = ''; 

    cart.forEach((cartItem, index) => {
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
    }); }
    catch (error) {

    }
}

function removeCartItem(index) {
    cart.splice(index, 1); // Remove the item from the cart array
    displayCartItems(); // Re-render the cart items
    saveCartToStorage(); 
    updateCartSummary();
}




function updateCartSummary() {
    try {
        let totalPrice = 0;

        cart.forEach(product => {
            totalPrice += product.price * product.count;
        });
    
        // Update the total price in the cart summary
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = totalPrice.toFixed(2);  // Format to 2 decimal places
    } catch(error){

    }
   
}


function loadCartFromStorage() {
    const savedCart = sessionStorage.getItem('cart');
    
    if (savedCart) {
        // Parse the saved cart JSON string back into an array
        cart = JSON.parse(savedCart);
    } else {
        cart = [];  // Initialize as empty if no saved cart exists
    }
    
    updateCartSummary();  // Update the cart summary based on the loaded cart
}

// Load the cart when the page loads
loadCartFromStorage();
