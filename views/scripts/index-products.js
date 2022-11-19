const isProductCardLoaded = () => {
    while (document.querySelectorAll('.product-card') == null) {
        console.log('waiting...');
    }
    const productCard = document.querySelectorAll('.product-card');
    for (const item of productCard) {
        item.addEventListener('click', (e) => {
            let productCode = item.querySelector('.product-id').textContent;
            productCode = productCode.match(/(\d+)/);
            fetch(`/producto/${productCode[0]}`);
            window.location = `/producto/${productCode[0]}`
        })
    }
}

isProductCardLoaded();