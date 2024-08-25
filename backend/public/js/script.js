
const apiUrl = '/products';

// Fetch products on load
function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${product.name}</strong> - $${product.price}
                    <p>${product.description}</p>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productList.appendChild(li);
            });
        });
}

// Create a new product
document.getElementById('create-product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    }).then(response => {
        if (response.ok) {
            fetchProducts();
            this.reset();
        }
    });
});

// Delete a product
function deleteProduct(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            fetchProducts();
        }
    });
}

// Initial fetch
fetchProducts();
