const deleteButton = document.querySelectorAll('.delete-button');
const productsContainer = document.querySelector('.container')
const cartIcon = document.querySelector('.cart-icon');

for (const button of deleteButton) {
    button.addEventListener('click', async(e) => {
        const cartId = cartIcon.dataset.id;
        console.log(typeof(cartId))
        const productId = e.target.dataset.id;
        await fetch(`/api/carrito/${cartId}/productos/${productId}`, { method: 'DELETE' })
        if (cartId == "1") {
            location.reload();
            // document.body.removeChild(document.querySelector('.checkout-container'))
            // document.body.innerHTML = noProducts;
            cartIcon.dataset.count--;
        } else {
            productsContainer.removeChild(e.target.parentNode.parentNode.parentNode.parentNode)
            cartIcon.dataset.count--;
        }
    })
}

const purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', async() => {
    window.location = '/carrito/success'
        // await fetch('/carrito/success/auth', { method: 'POST', body: JSON.stringify({ cartSubmition: true }), headers: { 'Content-type': 'application/json' } })
})