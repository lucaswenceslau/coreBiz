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
function menuMobileActive(){
    const menuMobile = document.querySelector('.menu--mobile');
    const menuItens = document.querySelector('.menu');
    menuMobile.addEventListener('click',function(){
        menuMobile.classList.toggle('active');
        menuItens.classList.toggle('active');
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
function verifyMobile(){
    const menu = document.querySelector('.menu');

    if(window.innerWidth < 1020){
        menu.classList.add('is--mobile');
    }
    else{
        menu.classList.remove('is--mobile');
    }   

}
function createShelves(){
    const url = '../../products.json';
    fetch(url)
        .then(res => res.json())
        .then((data)=>{
            console.log('data: ',data)
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
    clickActive('.header__container--cart');
    verifyMobile();
    menuMobileActive();
});

