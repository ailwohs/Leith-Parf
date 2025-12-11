document.addEventListener('DOMContentLoaded', function() {
    const screens = document.querySelectorAll('.screen');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const backToProductsBtn = document.querySelector('.back-to-products');
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const noResults = document.querySelector('.no-results');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const exploreBtn = document.getElementById('explore-btn');
    const homeLogo = document.getElementById('home-logo');
    const footerLogo = document.getElementById('footer-logo');
    const appointmentForm = document.getElementById('appointment-form');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentScreen = localStorage.getItem('currentScreen') || 'home';
    let products = [];
    let decantProducts = [];
    
    function init() {
        loadProducts();
        setupEventListeners();
        updateCartCount();
        showScreen(currentScreen);
        
        if (currentScreen === 'product-detail') {
            const productName = localStorage.getItem('currentProduct');
            if (productName) {
                showProductDetail(productName);
            }
        }
    }
    
    function loadProducts() {
        products = [
            {
                id: 1,
                name: "Stallion 53 Linea Emper",
                category: "man",
                price: 104,
                discountedPrice: 890,
                discount: 15,
                image: "./img/stallion53.png",
                description: "Perfume masculino da linha Emper, com notas frescas e amadeiradas que transmitem força e elegância.",
                features: ["Notas de saída: Bergamota, Cardamomo", "Notas de coração: Cedro, Pimenta", "Notas de fundo: Âmbar, Couro"],
                durability: "8-10 horas"
            },
            {
                id: 2,
                name: "Fahkar Lattafa",
                category: "man",
                price: 1129,
                image: "./img/fahkar.png",
                description: "Perfume árabe intenso para homem, com notas de couro e especiarias — ideal para a noite.",
                features: ["Notas de saída: Lavanda, Bergamota", "Notas de coração: Couro, Canela", "Notas de fundo: Baunilha, Âmbar"],
                durability: "10-12 horas"
            },
            {
                id: 3,
                name: "Fahkar Gold Lattafa",
                category: "man",
                price: 949,
                image: "./img/fahkar-gold.png",
                description: "Versão premium do Fahkar, com um toque dourado na essência — mais doce e sofisticado.",
                features: ["Notas de saída: Bergamota, Limão", "Notas de coração: Canela, Rosa", "Notas de fundo: Baunilha, Âmbar, Almíscar"],
                durability: "12+ horas"
            },
            {
                id: 4,
                name: "Hayaati Gold Elixir Lattafa (Men)",
                category: "man",
                price: 849,
                image: "./img/hayaati-gold-elixir.png",
                description: "Elixir dourado masculino, com mistura de notas frescas e amadeiradas e um toque de luxo.",
                features: ["Notas de saída: Maçã, Bergamota", "Notas de coração: Baunilha, Canela", "Notas de fundo: Âmbar, Sândalo"],
                durability: "10-12 horas"
            },
            {
                id: 5,
                name: "Asad Lattafa",
                category: "man",
                price: 1049,
                image: "./img/asad.png",
                description: "Perfume árabe robusto e picante, pensado para o homem moderno e audacioso.",
                features: ["Notas de saída: Pimenta negra, Bergamota", "Notas de coração: Baunilha, Canela", "Notas de fundo: Âmbar, Tabaco"],
                durability: "8-10 horas"
            },
            {
                id: 6,
                name: "Asad Zanzibar Lattafa",
                category: "man",
                price: 1139,
                image: "./img/asad-zanzibar.png",
                description: "Versão exótica do Asad com nuances tropicais de Zanzibar — fresca e envolvente.",
                features: ["Notas de saída: Cítricos, Menta", "Notas de coração: Baunilha, Especiarias", "Notas de fundo: Âmbar, Madeiras"],
                durability: "8-10 horas"
            },
            {
                id: 7,
                name: "Qaed Al Fursan Lattafa",
                category: "man",
                price: 1029,
                image: "./img/qaed-al-fursan.png",
                description: "Fragrância para o cavalheiro moderno, com caráter frutado e amadeirado.",
                features: ["Notas de saída: Abacaxi, Bergamota", "Notas de coração: Rosa, Maçã", "Notas de fundo: Baunilha, Sândalo"],
                durability: "6-8 horas"
            },
            {
                id: 8,
                name: "Maahir Lattafa",
                category: "man",
                price: 1119,
                image: "./img/maahir.png",
                description: "Perfil fresco e aquático, ideal para homens ativos e dinâmicos.",
                features: ["Notas de saída: Maçã, Lavanda", "Notas de coração: Baunilha, Canela", "Notas de fundo: Almíscar, Âmbar"],
                durability: "6-8 horas"
            },
            {
                id: 9,
                name: "Ameerat Al Arab",
                category: "man",
                price: 899,
                image: "./img/ameerat-al-arab.png",
                description: "Perfume de luxo com presença intensa e longa duração, para ocasiões especiais.",
                features: ["Notas de saída: Bergamota, Cardamomo", "Notas de coração: Couro, Canela", "Notas de fundo: Baunilha, Âmbar"],
                durability: "12+ horas"
            },
            {
                id: 10,
                name: "Al Noble Waazer Lattafa",
                category: "man",
                price: 1149,
                image: "./img/al-noble-waazer.png",
                description: "Fragrância nobre e sofisticada, com notas amadeiradas e especiadas.",
                features: ["Notas de saída: Bergamota, Lavanda", "Notas de coração: Canela, Pimenta", "Notas de fundo: Âmbar, Sândalo"],
                durability: "8-10 horas"
            },
            {
                id: 11,
                name: "Yara Lattafa",
                category: "woman",
                price: 1149,
                discountedPrice: 919,
                discount: 20,
                image: "./img/yara.png",
                description: "Fragrância floral-frutada feminina, com notas tropicais e flores brancas — delicada e envolvente.",
                features: ["Notas de saída: Frutas tropicais", "Notas de coração: Flores brancas", "Notas de fundo: Baunilha, Almíscar"],
                durability: "6-8 horas"
            },
            {
                id: 12,
                name: "Yara Candy Lattafa",
                category: "woman",
                price: 1149,
                image: "./img/yara-candy.png",
                description: "Versão doce do Yara, com acordes de caramelo e frutas — perfeita para o dia.",
                features: ["Notas de saída: Framboesa, Caramelo", "Notas de coração: Baunilha, Jasmim", "Notas de fundo: Almíscar, Sândalo"],
                durability: "6-8 horas"
            },
            {
                id: 13,
                name: "Yara Moi Lattafa",
                category: "woman",
                price: 949,
                image: "./img/yara-moi.png",
                description: "Interpretação mais intensa e cremosa do Yara, com nuances lácteas e frutadas.",
                features: ["Notas de saída: Frutas vermelhas, Leite", "Notas de coração: Flores brancas, Baunilha", "Notas de fundo: Almíscar, Sândalo"],
                durability: "8-10 horas"
            },
            {
                id: 14,
                name: "Ana Rouge Lattafa",
                category: "woman",
                price: 1029,
                image: "./img/ana-rouge.png",
                description: "Fragrância floral-oriental com toques frutados — elegante e sofisticada.",
                features: ["Notas de saída: Pêra, Bergamota", "Notas de coração: Rosa, Jasmim", "Notas de fundo: Baunilha, Almíscar"],
                durability: "8-10 horas"
            },
            {
                id: 15,
                name: "La Vivacite Maison",
                category: "woman",
                price: 1099,
                image: "./img/la-vivacite.png",
                description: "Perfume fresco e vibrante para mulheres alegres e cheias de energia.",
                features: ["Notas de saída: Cítricos, Frutas", "Notas de coração: Flores brancas, Lírio-do-vale", "Notas de fundo: Almíscar, Baunilha"],
                durability: "6-8 horas"
            },
            {
                id: 16,
                name: "Leonie Maison Alhambra",
                category: "woman",
                price: 1149,
                image: "./img/leonie.png",
                description: "Fragrância floral suave e feminina com toque moderno e fresco.",
                features: ["Notas de saída: Bergamota, Groselha", "Notas de coração: Rosa, Peônia", "Notas de fundo: Almíscar, Baunilha"],
                durability: "6-8 horas"
            },
            {
                id: 17,
                name: "Mayar Lattafa",
                category: "woman",
                price: 1149,
                image: "./img/mayar.png",
                description: "Aroma frutal-floral com notas suculentas e um fundo cremoso.",
                features: ["Notas de saída: Frutas vermelhas, Pêra", "Notas de coração: Flores, Baunilha", "Notas de fundo: Almíscar, Sândalo"],
                durability: "8-10 horas"
            },
            {
                id: 18,
                name: "Mayar Menta Lattafa",
                category: "woman",
                price: 1149,
                image: "./img/mayar-menta.png",
                description: "Mayar com toque de menta fresca — ótima opção para dias quentes.",
                features: ["Notas de saída: Menta, Frutas cítricas", "Notas de coração: Flores, Baunilha", "Notas de fundo: Almíscar, Sândalo"],
                durability: "6-8 horas"
            },
            {
                id: 19,
                name: "Haya Lattafa",
                category: "woman",
                price: 1289,
                image: "./img/haya.png",
                description: "Fragrância floral com notas frutadas e um fundo doce e amadeirado.",
                features: ["Notas de saída: Frutas tropicais", "Notas de coração: Flores, Baunilha", "Notas de fundo: Almíscar, Sândalo"],
                durability: "6-8 horas"
            },
            {
                id: 20,
                name: "Her Confession Lattafa",
                category: "woman",
                price: 1649,
                image: "./img/her-confession.png",
                description: "Perfume oriental-floral para a mulher misteriosa e sedutora.",
                features: ["Notas de saída: Açafrão, Frutas", "Notas de coração: Flores, Baunilha", "Notas de fundo: Âmbar, Almíscar"],
                durability: "10-12 horas"
            },
            {
                id: 21,
                name: "Hayaati Gold Elixir Lattafa",
                category: "unisex",
                price: 839,
                image: "./img/hayaati-gold-elixir.png",
                description: "Elixir dourado unissex com mistura de notas frescas e amadeiradas.",
                features: ["Notas de saída: Maçã, Bergamota", "Notas de coração: Baunilha, Canela", "Notas de fundo: Âmbar, Sândalo"],
                durability: "10-12 horas"
            },
            {
                id: 22,
                name: "Khamrah Lattafa",
                category: "unisex",
                price: 1149,
                image: "./img/khamrah.png",
                description: "Fragrância gourmand com notas de baunilha, canela e licor — quente e acolhedora.",
                features: ["Notas de saída: Canela, Baunilha", "Notas de coração: Flor de laranjeira, Amêndoa", "Notas de fundo: Âmbar, Sândalo"],
                durability: "12+ horas"
            },
            {
                id: 23,
                name: "Khamrah Qawa Lattafa",
                category: "unisex",
                price: 1149,
                image: "./img/khamrah-qawa.png",
                description: "Versão intensa do Khamrah com notas de café — ideal para quem gosta de fragrâncias marcantes e doces.",
                features: ["Notas de saída: Café, Canela", "Notas de coração: Baunilha, Flor de laranjeira", "Notas de fundo: Âmbar, Sândalo"],
                durability: "12+ horas"
            },
            {
                id: 24,
                name: "La essencia de Karol G",
                category: "unisex",
                price: 1119,
                discountedPrice: 839,
                discount: 25,
                image: "./img/karol-g.png",
                description: "Fragrância inspirada em Karol G, com notas tropicais e vibrantes — moderna e cheirosa.",
                features: ["Notas de saída: Frutas tropicais, Cítricos", "Notas de coração: Flores, Baunilha", "Notas de fundo: Âmbar, Madeiras"],
                durability: "8-10 horas"
            }
        ];
        
        decantProducts = [
            products.find(p => p.name === "Fahkar Lattafa"),
            products.find(p => p.name === "Asad Lattafa"),
            products.find(p => p.name === "Yara Candy Lattafa"),
            products.find(p => p.name === "Ana Rouge Lattafa"),
            products.find(p => p.name === "Khamrah Lattafa")
        ].map(product => (product ? ({
            ...product,
            price: 350,
            name: `${product.name} (DECANT)`
        }) : null)).filter(Boolean);
        
        renderProducts(products, document.getElementById('perfumes-grid'), false);
        renderProducts(decantProducts, document.getElementById('decant-grid'), false);
        
        const featuredProducts = products.filter(p => 
            p.name === "Al Noble Waazer Lattafa" || 
            p.name === "Yara Candy Lattafa" || 
            p.name === "Khamrah Qawa Lattafa"
        );
        renderProducts(featuredProducts, document.querySelector('.products-grid'), true);
        
        const promotionProducts = products.filter(p => p.discount);
        renderProducts(promotionProducts, document.getElementById('promotions-grid'), false);
    }

    function renderProducts(productsArray, container, showBadges = false) {
        container.innerHTML = '';

        if (!productsArray || productsArray.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        productsArray.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-up';
            productCard.setAttribute('data-name', product.name);

            let badgeHTML = '';
            if (showBadges) {
                if (product.name === "Al Noble Waazer Lattafa") {
                    badgeHTML = '<div class="product-badge">Novo</div>';
                } else if (product.name === "Yara Candy Lattafa") {
                    badgeHTML = '<div class="product-badge">Mais vendido</div>';
                } else if (product.name === "Khamrah Qawa Lattafa") {
                    badgeHTML = '<div class="product-badge">Exclusivo</div>';
                }
            }

            let priceHTML;
            if (product.discount) {
                priceHTML = `
                    <div class="product-price">
                        <span class="original-price">R$ ${product.price.toLocaleString('pt-BR')}</span>
                        <span class="discount-price">R$ ${product.discountedPrice.toLocaleString('pt-BR')}</span>
                        <div class="discount-badge">-${product.discount}%</div>
                    </div>
                `;
            } else {
                priceHTML = `
                    <div class="product-price">R$ <span class="current-price">${product.price.toLocaleString('pt-BR')}</span></div>
                `;
            }

            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <div class="action-btn add-to-cart" title="Adicionar ao carrinho"><i class="fas fa-shopping-bag"></i></div>
                        <div class="action-btn view-detail-btn" title="Ver detalhes"><i class="fas fa-search"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category === 'man' ? 'Masculino' : product.category === 'woman' ? 'Feminino' : 'Unissex'}</span>
                    <h3>${product.name}</h3>
                    ${priceHTML}
                    <a href="#" class="btn view-detail">Ver detalhes</a>
                </div>
            `;

            container.appendChild(productCard);
        });
    }
    
    function setupEventListeners() {
        homeLogo.addEventListener('click', function(e) {
            e.preventDefault();
            const target = 'home';
            setCurrentScreen(target);
            showScreen(target);
            navLinks.forEach(l => l.classList.remove('nav-active'));
            const homeLink = document.querySelector('.nav-link[data-target="home"]');
            if (homeLink) homeLink.classList.add('nav-active');
        });
        
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            const target = 'home';
            setCurrentScreen(target);
            showScreen(target);
            navLinks.forEach(l => l.classList.remove('nav-active'));
            const homeLink = document.querySelector('.nav-link[data-target="home"]');
            if (homeLink) homeLink.classList.add('nav-active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                setCurrentScreen(target);
                showScreen(target);
                
                navLinks.forEach(l => l.classList.remove('nav-active'));
                this.classList.add('nav-active');
                
                if (window.innerWidth <= 992) {
                    nav.classList.remove('active');
                }
            });
        });
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
        
        cartIcon.addEventListener('click', function() {
            cartModal.classList.add('active');
            renderCartItems();
        });
        
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
        
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio');
                return;
            }

            let message = "Olá! Gostaria de realizar a seguinte compra:%0A%0A";
            let total = 0;
            let hasDecant = false;

            cart.forEach(item => {
                const product = [...products, ...decantProducts].find(p => p.name === item.name);
                const isDecant = decantProducts.some(p => p.name === item.name);
                if (isDecant) hasDecant = true;

                const itemPrice = product.discountedPrice || product.price;
                const itemTotal = itemPrice * item.quantity;
                total += itemTotal;

                message += `- ${item.name}${isDecant ? ' (DECANT)' : ''}: ${item.quantity} unidade(s) - R$ ${itemTotal.toLocaleString('pt-BR')}%0A`;
            });

            message += `%0ATotal: R$ ${total.toLocaleString('pt-BR')}%0A%0A`;
            message += "Por favor, preciso das informações para proceder com o pagamento. Obrigado.";

            if (hasDecant) {
                message += "%0A%0A*Observação: os produtos marcados com 'DECANT' são fragrâncias no formato de 30ml.*";
            }

            // número de WhatsApp permanece o mesmo que você usou
            window.open(`https://wa.me/5547988606451?text=${encodeURIComponent(message)}`, '_blank');
        });
        
        whatsappBtn.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);
        });
        
        backToProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            setCurrentScreen('perfumes');
            showScreen('perfumes');
        });
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = 'perfumes';
                setCurrentScreen(target);
                showScreen(target);
                navLinks.forEach(l => l.classList.remove('nav-active'));
                const link = document.querySelector(`.nav-link[data-target="${target}"]`);
                if (link) link.classList.add('nav-active');
            });
        }
        
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            filterProducts();
        });
        
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const productName = productCard.getAttribute('data-name');
                    addToCart(productName);
                }
            }
            
            if (e.target.classList.contains('view-detail-btn') || e.target.classList.contains('view-detail') || e.target.closest('.view-detail-btn') || e.target.closest('.view-detail')) {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const productName = productCard.getAttribute('data-name');
                    showProductDetail(productName);
                }
            }
            
            if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    const productName = cartItem.querySelector('.cart-item-title').textContent;
                    const isIncrease = e.target.textContent === '+' || (e.target.closest('.quantity-btn') && e.target.closest('.quantity-btn').textContent === '+');
                    updateCartItemQuantity(productName, isIncrease);
                }
            }
            
            if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                const cartItem = e.target.closest('.cart-item');
                if (cartItem) {
                    const productName = cartItem.querySelector('.cart-item-title').textContent;
                    removeFromCart(productName);
                }
            }
            
            if (e.target.classList.contains('detail-image')) {
                e.target.classList.toggle('zoomed');
            }
        });
        
        searchInput.addEventListener('input', function() {
            filterProducts();
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
        
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const date = document.getElementById('date').value;
                const message = document.getElementById('message').value;
                
                const whatsappMessage = `*Solicitação de Cita Privada*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A*Telefone:* ${phone}%0A*Data Preferida:* ${date}%0A*Interesse Especial:* ${message}`;
                
                window.open(`https://wa.me/5547988606451?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                this.reset();
                alert('Obrigado! Recebemos sua solicitação de citação.');
            });
        }
    }
    
    function setCurrentScreen(screen) {
        currentScreen = screen;
        localStorage.setItem('currentScreen', screen);
    }
    
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'block';
            setTimeout(() => targetScreen.classList.add('active'), 10);
        }
        
        if (screenId === 'perfumes') {
            filterProducts();
        }
        
        window.scrollTo(0, 0);
    }
    
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategoryBtn = document.querySelector('.filter-btn.active');
        const activeCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'all';
        
        let filteredProducts = products;
        
        if (activeCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === activeCategory);
        }
        
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
        }
        
        noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
        renderProducts(filteredProducts, document.getElementById('perfumes-grid'), false);
    }
    
    function showProductDetail(productName) {
        const product = [...products, ...decantProducts].find(p => p.name === productName);
        if (!product) return;
        
        localStorage.setItem('currentProduct', product.name);
        setCurrentScreen('product-detail');
        
        const detailContent = document.getElementById('detail-content');
        detailContent.innerHTML = `
            <div class="detail-image-container">
                <img src="${product.image}" alt="${product.name}" class="detail-image">
            </div>
            <div class="detail-info">
                <span class="detail-category">${product.category === 'man' ? 'Masculino' : product.category === 'woman' ? 'Feminino' : 'Unissex'}</span>
                <h2>${product.name}</h2>
                <div class="detail-price">${product.discountedPrice ? `R$ ${product.discountedPrice.toLocaleString('pt-BR')}` : `R$ ${product.price.toLocaleString('pt-BR')}`}</div>
                <p class="detail-description">${product.description}</p>
                <button class="btn add-to-cart-detail">Adicionar ao carrinho</button>
                
                <div class="detail-features">
                    <div class="feature-card">
                        <h4>Notas olfativas</h4>
                        <ul class="feature-list">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="feature-card">
                        <h4>Durabilidade</h4>
                        <ul class="feature-list">
                            <li>${product.durability}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        const addBtn = document.querySelector('.add-to-cart-detail');
        if (addBtn) {
            addBtn.addEventListener('click', () => addToCart(product.name));
        }
        showScreen('product-detail');
    }
    
    function addToCart(productName) {
        const product = [...products, ...decantProducts].find(p => p.name === productName);
        if (!product) return;
        
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: product.name,
                price: product.discountedPrice || product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCart();
        cartIcon.classList.add('pulse');
        setTimeout(() => cartIcon.classList.remove('pulse'), 500);
    }
    
    function updateCartItemQuantity(productName, isIncrease) {
        const item = cart.find(item => item.name === productName);
        if (!item) return;
        
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                removeFromCart(productName);
                return;
            }
        }
        
        updateCart();
    }
    
    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        updateCart();
    }
    
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
    
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            cartSubtotal.textContent = 'R$ 0,00';
            cartTotal.textContent = 'R$ 0,00';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toLocaleString('pt-BR')}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        cartSubtotal.textContent = `R$ ${subtotal.toLocaleString('pt-BR')}`;
        cartTotal.textContent = `R$ ${subtotal.toLocaleString('pt-BR')}`;
    }
    
    init();
});
