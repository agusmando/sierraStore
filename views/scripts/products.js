const addToCartButton = document.querySelector('#add-to-cart');


addToCartButton.addEventListener('click', async() => {
    await addProductToCart();
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.dataset.count = await fetch(`/api/carrito/${cartIcon.dataset.id}/productos`)
        .then((res) => res.json())
        .then((data) => { return data.result.length })

})

const buyProductButton = document.querySelector('#buy-product');

buyProductButton.addEventListener('click', async() => {
    await addProductToCart();
    window.location = '/carrito';
})

const addProductToCart = async() => {
    const cartId = document.querySelector('.cart-icon').dataset.id;
    const productCode = document.querySelector('.product-info').dataset.code;
    const amount = document.querySelector('.amount-input').value;
    await fetch(`/api/carrito/${cartId}/productos/${productCode}`, { method: 'POST', body: JSON.stringify({ amount }), headers: { 'Content-type': 'application/json' } })
}