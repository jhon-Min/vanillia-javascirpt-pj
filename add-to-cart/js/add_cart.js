const products = document.getElementById('products-list');
const categories = document.getElementById('categories');
const search = document.querySelector('#searchForm input');
const carts = document.getElementById('carts');
const cartQt = document.getElementById('cart-qt');
const total = document.getElementById('total');

let itemsArr = [];

// ================= Create UI Function =================
const cutTxt = (str, num = 50) => {
    if (str.length > num) {
        return str.substring(0, num) + ' . . . . . ';
    }

};

const createProduct = (items) => {
    $('#products-list').empty();
    items.map(item => {
        let template =
            `
            <div class="card product-card p-1 py-0 my-3">
                <img src="${item.image}" alt="" class="card-img-top product-img">
                 <div class="card-body border rounded product-detail shadow-sm mt-3">
                    <h4 class="text-primary text-nowrap overflow-hidden mb-3 mt-4">${item.title}</h4>
                    <small">
                       ${cutTxt(item.description, 50)}
                    </small>

                    <div class="d-flex justify-content-between align-items-end mt-4">
                        <h5>$${item.price}</h5>
                        <button class="btn btn-sm btn-outline-dark" data-id="${item.id}">
                            <i class="fas fa-cart-plus add-item"></i>
                            Add
                        </button>
                    </div>
                </div>
            </div>
            `;

        products.innerHTML += template;
    });
};

const createCart = (item) => {
    carts.innerHTML +=
        `
        <div class="card cart-card" data-id=${item.id}>
            <div class="card-body cart-detail">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <img src="${item.image}" alt="" class="cart-img">
                    <button class="btn h-50 btn-outline-danger del-item">
                        <i class="fas fa-trash-alt remove-item"></i>
                    </button>
                </div>

                <p class="font-weight-bold text-muted" style="font-size: 18px;">${item.title}</p>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="form-row">
                        <button class="btn btn-outline-success q-minus">
                            <i class="fas fa-minus"></i>
                        </button>

                        <input type="number" class="form-control w-25 mx-1 quantity" value="1" min="1" unitPrice="${item.price}">

                        <button class="btn btn-outline-success q-plus">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>

                    <h5 class="mr-1">$<span class="item-cost">${item.price}</span></h5>
                </div>
            </div>  
        </div>
        `;
};

// ================= Get Api Process =================
const getProducts = async () => {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json()
    return data;
};

const getCate = async () => {
    let response = await fetch('https://fakestoreapi.com/products/categories');
    let data = await response.json();
    return data;
};

getProducts()
    .then(data => {
        itemsArr = data;
        createProduct(itemsArr);
    })
    .catch(err => console.log(err.message));

getCate()
    .then(data => {
        data.map(category => {
            let template = `<option>${category}</option>`;
            categories.innerHTML += template;
        });
    })
    .catch(err => console.log(err.message));


// ================= Search & Category Process =================
search.addEventListener('keyup', (e) => {
    e.preventDefault();
    let input = search.value.trim().toLowerCase();
    if (input.length) {
        let filterItems = itemsArr.filter(item => {
            if (item.title.toLowerCase().includes(input) || item.price == input || item.description.toLowerCase().includes(input)) {
                return item;
            }
        });
        createProduct(filterItems);
    }
});

categories.addEventListener('change', () => {
    let selectCate = categories.value;
    if (selectCate != 0) {
        let filterCate = itemsArr.filter(item => item.category === selectCate);
        createProduct(filterCate);
    } else {
        createProduct(itemsArr);
    }
});


// ==================== Add to Cart Process =======================
const cartTotal = () => {
    let qt = Array.from(carts.children).length;
    cartQt.innerText = qt;

    if (qt > 0) {
        let currentCost = Array.from(carts.children)
            .map(item => Number(item.firstElementChild.lastElementChild.childNodes[3].firstElementChild.innerText))
            .reduce((x, y) => x + y);

        let tp =
            `
            <div class="d-flex justify-content-between my-4 text-dark align-items-center px-2">
                <h4>Total</h4>
                <h3>$${currentCost}</h3>
            </div>  
            `;

        total.innerHTML = tp;
    } else {
        total.innerHTML = `<h3 class="text-center text-muted mt-5">Empty Cart<h3>`;
    }
};

// Check Current Item, if it item have in the cart cannot put or don't have to put it
products.addEventListener('click', e => {
    e.preventDefault();

    let selectItem = e.target.dataset.id;

    if (selectItem) {
        let productInfo = itemsArr.filter(item => item.id == selectItem)[0];
        if (!Array.from(carts.children).map(item => item.dataset.id).includes(selectItem)) {
            createCart(productInfo);
        } else {
            alert('This item has been added');
        }
    }
    cartTotal();
});

// Remove item from cart
carts.addEventListener('click', e => {
    e.preventDefault();

    let delItem = e.target.classList.contains('del-item');
    let remvoeItem = e.target.classList.contains('remove-item');

    if (delItem) {
        if (confirm('Do you wanna remove item from the cart?')) {
            e.srcElement.offsetParent.remove(); // Select Card's Element and Remove it
        }
    } else if (remvoeItem) {
        if (confirm('Do you wanna remove item from the cart?')) {
            e.srcElement.offsetParent.remove();
        }
    }

    cartTotal();
});

// ========================= Add & Minus Cart Process with JQuery ============================
$('#carts').delegate('.q-plus', 'click', function () {
    let quantity = $(this).siblings('.quantity').val();
    let price = $(this).siblings('.quantity').attr('unitPrice');
    let currentQt = Number(quantity) + 1;
    let currentPrice = price * currentQt;

    $(this).siblings('.quantity').val(currentQt);
    $(this).parent().siblings('h5').find('.item-cost').html(currentPrice);
    cartTotal();
});

$('#carts').delegate('.q-minus', 'click', function () {
    let quantity = $(this).siblings('.quantity').val();
    let price = $(this).siblings('.quantity').attr('unitPrice');

    if (quantity > 1) {
        let currentQt = Number(quantity) - 1;
        let currentPrice = price * currentQt;

        $(this).siblings('.quantity').val(currentQt);
        $(this).parent().siblings('h5').find('.item-cost').html(currentPrice);
        cartTotal();
    }
});

$('#carts').delegate('.quantity', 'keyup change', function () {
    let quantity = $(this).val();
    let price = $(this).attr('unitPrice');

    if (quantity > 1) {
        let currentQt = Number(quantity);
        let currentPrice = price * currentQt;

        $(this).val(currentQt);
        $(this).parent().siblings('h5').find('.item-cost').html(currentPrice);
        cartTotal();
    } else {
        alert('Type more than one item');
    }
});