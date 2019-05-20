function createNode(element) {
    return document.createElement(element);
};

function append(parent, el) {
    return parent.appendChild(el);
};
function clickActive(active){
    const element = document.querySelector(active);
    element.addEventListener('click', function(){
    element.classList.toggle('active');
    })
}
function addToCartCreate(parent,classe){
    const span = createNode('span');
    span.setAttribute('class',classe);
    append(parent,span);
}
function addToCartValue(){
    let valueCart = parseFloat(document.querySelector('.header__container--cart .value').textContent);
    let valueText = document.querySelector('.header__container--cart .value');
    const cart = document.querySelectorAll('.product__list__container--cart');
    cart.forEach(el => {
        el.addEventListener('click',function(){
           valueCart += parseFloat(getSinblings(el));
           valueText.textContent = 'R$'+valueCart.toLocaleString();
           console.log(valueCart)
        })
    });
}
function getSinblings(el){
    var siblings = [];
    var sibling = el.parentNode.firstChild;
    
    while (sibling) {
		if (sibling.nodeType === 1 && sibling !== el) {
			siblings.push(sibling);
        }
        sibling = sibling.nextSibling
	}
    return parseFloat(siblings[2].textContent);
}

function createShelves(){
    const url = 'https://github.com/meetrodrigues/coreBiz/blob/master/products.json';
    fetch(url)
        .then(res => res.json())
        .then((data)=>{
            const shelve = document.querySelector('.product__list');
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    const el = data[i];
                    const srcImage = el.images[0].imageUrl;
                    const product = createNode('li');
                    
                    product.setAttribute('class','product__list__container')
                    product.innerHTML = 
                    `
                    <img class="product__list__container--img" src="${srcImage}">
                    <p class="product__list__container--title">${el.name}</p>
                    <p class="product__list__container--value"> ${el.Value} </p>
                    <button class="product__list__container--buy"> Comprar </button>
                    `
                    append(shelve,product)
                    addToCartCreate(product,'product__list__container--cart');
                }
            }
            addToCartValue();
        })
        .catch((err)=>{
            console.log('error: ' ,err)
        })
}

window.addEventListener('DOMContentLoaded',function(){
    createShelves();
    clickActive('.menu--mobile');
    clickActive('.header__container--cart');
});
