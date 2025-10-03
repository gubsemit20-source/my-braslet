// Данные товаров

const products = [

    {

        id: 1,

        name: "Морська хвиля",

        price: 60,

        icon: "🌊",

        colors: 3,

        description: "Синьо-блакитні переливи"

    },

    {

        id: 2,

        name: "Тропічна риба", 

        price: 90,

        icon: "🐠",

        colors: 4,

        description: "Яскраві кольори рифу"

    },

    {

        id: 3,

        name: "Золота рибка",

        price: 90, 

        icon: "⭐",

        colors: 4,

        description: "Золотаві відтінки"

    },

    {

        id: 4,

        name: "Веселка",

        price: 110,

        icon: "🌈", 

        colors: 6,

        description: "Усі кольори веселки"

    },

    {

        id: 5,

        name: "Фіолетова мрія",

        price: 80,

        icon: "💜",

        colors: 3, 

        description: "Ніжні фіолетові тони"

    },

    {

        id: 6,

        name: "Смарагдове море",

        price: 100,

        icon: "💚",

        colors: 5,

        description: "Зелені відтінки моря"

    }

];

let cart = [];

let orderNumber = 1001;

// Инициализация страницы

function init() {

    renderProducts();

    updateCartBadge();

}

// Показать товары

function renderProducts() {

    const grid = document.getElementById('productsGrid');

    grid.innerHTML = products.map(product => `

        <div class="product-card">

            <div class="product-image">

                ${product.icon}

            </div>

            <div class="product-info">

                <h3 class="product-name">${product.name}</h3>

                <p>${product.description}</p>

                <p><small>${product.colors} кольори</small></p>

                <div class="product-price">${product.price} грн</div>

                <button class="add-btn" onclick="addToCart(${product.id})">

                    Додати в кошик

                </button>

            </div>

        </div>

    `).join('');

}

// Добавить в корзину

function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCartBadge();

    showNotification('✅ Товар додано в кошик!');

}

// Обновить счетчик корзины

function updateCartBadge() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('cartBadge').textContent = totalItems;

}

// Открыть корзину

function openCart() {

    renderCart();

    document.getElementById('cartModal').style.display = 'block';

}

// Закрыть корзину

function closeCart() {

    document.getElementById('cartModal').style.display = 'none';

}

// Показать корзину

function renderCart() {

    const cartBody = document.getElementById('cartBody');

    

    if (cart.length === 0) {

        cartBody.innerHTML = '<p style="text-align: center; padding: 2rem;">Кошик порожній</p>';

        return;

    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    

    cartBody.innerHTML = `

        ${cart.map(item => `

            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <br>

                    <small>${item.quantity} × ${item.price} грн</small>

                </div>

                <div>

                    <strong>${item.price * item.quantity} грн</strong>

                    <br>

                    <button onclick="removeFromCart(${item.id})" style="

                        background: #ff4757;

                        color: white;

                        border: none;

                        padding: 0.3rem 0.6rem;

                        border-radius: 5px;

                        cursor: pointer;

                        margin-top: 0.3rem;

                        font-size: 0.8rem;

                    ">Видалити</button>

                </div>

            </div>

        `).join('')}

        <div class="cart-total">

            Загальна сума: ${total} грн

        </div>

        <div style="margin-top: 1rem;">

            <input type="text" id="customerName" placeholder="Ваше ім'я" style="width: 100%; padding: 0.8rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">

            <input type="tel" id="customerPhone" placeholder="Номер телефону" style="width: 100%; padding: 0.8rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">

            <textarea id="customerAddress" placeholder="Адреса доставки" style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 5px; height: 60px;"></textarea>

        </div>

        <button class="checkout-btn" onclick="checkout()">

            📧 Надіслати замовлення на пошту

        </button>

    `;

}

// Удалить из корзины

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCartBadge();

    renderCart();

}

// Оформление заказа

function checkout() {

    if (cart.length === 0) {

        showNotification('❌ Кошик порожній!');

        return;

    }

    const customerName = document.getElementById('customerName').value;

    const customerPhone = document.getElementById('customerPhone').value;

    const customerAddress = document.getElementById('customerAddress').value;

    if (!customerName || !customerPhone || !customerAddress) {

        showNotification('❌ Заповніть всі поля!');

        return;

    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderDetails = cart.map(item => 

        `▸ ${item.name} - ${item.quantity} шт. × ${item.price} грн = ${item.quantity * item.price} грн`

    ).join('\n');

    const emailBody = `

🎣 НОВЕ ЗАМОВЛЕННЯ #${orderNumber}

📦 ДЕТАЛІ ЗАМОВЛЕННЯ:

Номер: #${orderNumber}

Дата: ${new Date().toLocaleDateString('uk-UA')}

Час: ${new Date().toLocaleTimeString('uk-UA')}

👤 ДАНІ КЛІЄНТА:

Ім'я: ${customerName}

Телефон: ${customerPhone}

Адреса: ${customerAddress}

🛒 СКЛАД ЗАМОВЛЕННЯ:

${orderDetails}

💰 ЗАГАЛЬНА СУМА: ${total} грн

---

Браслети "Рибий хвіст"

📞 +380 (67) 123-45-67

📧 Gub.Sem.IT20@gmail.com

⏰ ${new Date().toLocaleString('uk-UA')}

    `.trim();

    // Отправка на почту

    const emailLink = `mailto:Gub.Sem.IT20@gmail.com?subject=Замовлення #${orderNumber}&body=${encodeURIComponent(emailBody)}`;

    window.open(emailLink, '_blank');

    showNotification('✅ Замовлення відправлено на пошту!');

    

    // Очистка корзины

    cart = [];

    updateCartBadge();

    closeCart();

    orderNumber++;

}

// Показать уведомление

function showNotification(message) {

    // Удаляем старые уведомления

    const oldNotifications = document.querySelectorAll('.notification');

    oldNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');

    notification.className = 'notification';

    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        if (notification.parentElement) {

            notification.remove();

        }

    }, 4000);

}

// Дополнительные функции

function updateProductQuantity(productId, change) {

    const item = cart.find(item => item.id === productId);

    if (item) {

        item.quantity += change;

        if (item.quantity <= 0) {

            removeFromCart(productId);

        } else {

            updateCartBadge();

            renderCart();

        }

    }

}

// Поиск товаров

function searchProducts(query) {

    const filteredProducts = products.filter(product => 

        product.name.toLowerCase().includes(query.toLowerCase()) ||

        product.description.toLowerCase().includes(query.toLowerCase())

    );

    renderFilteredProducts(filteredProducts);

}

function renderFilteredProducts(filteredProducts) {

    const grid = document.getElementById('productsGrid');

    grid.innerHTML = filteredProducts.map(product => `

        <div class="product-card">

            <div class="product-image">

                ${product.icon}

            </div>

            <div class="product-info">

                <h3 class="product-name">${product.name}</h3>

                <p>${product.description}</p>

                <p><small>${product.colors} кольори</small></p>

                <div class="product-price">${product.price} грн</div>

                <button class="add-btn" onclick="addToCart(${product.id})">

                    Додати в кошик

                </button>

            </div>

        </div>

    `).join('');

}

// Фильтрация по цене

function filterByPrice(maxPrice) {

    const filteredProducts = products.filter(product => product.price <= maxPrice);

    renderFilteredProducts(filteredProducts);

}

// Получить статистику корзины

function getCartStats() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const uniqueItems = cart.length;

    

    return {

        totalItems,

        totalPrice,

        uniqueItems

    };

}

// Экспорт данных заказа

function exportOrder() {

    if (cart.length === 0) return;

    

    const stats = getCartStats();

    const orderData = {

        orderNumber: orderNumber,

        date: new Date().toISOString(),

        items: cart,

        total: stats.totalPrice,

        customer: {

            name: document.getElementById('customerName')?.value || 'Не вказано',

            phone: document.getElementById('customerPhone')?.value || 'Не вказано',

            address: document.getElementById('customerAddress')?.value || 'Не вказано'

        }

    };

    

    // Можно сохранить в localStorage или отправить на сервер

    console.log('Дані замовлення:', orderData);

    return orderData;

}

// Восстановление корзины из localStorage

function loadCartFromStorage() {

    const savedCart = localStorage.getItem('braceletsCart');

    if (savedCart) {

        cart = JSON.parse(savedCart);

        updateCartBadge();

    }

}

// Сохранение корзины в localStorage

function saveCartToStorage() {

    localStorage.setItem('braceletsCart', JSON.stringify(cart));

}

// Обновленная функция добавления в корзину с сохранением

function addToCartWithSave(productId) {

    addToCart(productId);

    saveCartToStorage();

}

// Закрытие корзины при клике вне ее

document.addEventListener('click', (e) => {

    if (e.target.classList.contains('cart-modal')) {

        closeCart();

    }

});

// Закрытие по ESC

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

        closeCart();

    }

});

// Запуск при загрузке страницы

document.addEventListener('DOMContentLoaded', function() {

    init();

    loadCartFromStorage(); // Загружаем сохраненную корзину

    

    // Добавляем поиск если нужно

    const searchHTML = `

        <div style="text-align: center; margin-bottom: 2rem;">

            <input type="text" id="searchInput" placeholder="🔍 Пошук браслетів..." style="

                padding: 0.8rem 1rem;

                border: 2px solid #667eea;

                border-radius: 25px;

                width: 100%;

                max-width: 400px;

                font-size: 1rem;

            " oninput="searchProducts(this.value)">

        </div>

    `;

    

    const productsSection = document.querySelector('.products .container');

    const title = productsSection.querySelector('.section-title');

    title.insertAdjacentHTML('afterend', searchHTML);

});

// Обновляем функцию добавления в корзину для сохранения

function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    updateCartBadge();

    saveCartToStorage(); // Сохраняем после изменения

    showNotification('✅ Товар додано в кошик!');

}

// Обновляем функцию удаления для сохранения

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCartBadge();

    saveCartToStorage(); // Сохраняем после изменения

    renderCart();

}