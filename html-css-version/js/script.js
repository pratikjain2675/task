document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Product data
    const products = [
        {
            id: 1,
            name: 'Nordic Lounge Chair',
            price: 349.99,
            category: 'furniture',
            material: 'wood',
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: true,
            isPopular: true
        },
        {
            id: 2,
            name: 'Minimalist Coffee Table',
            price: 199.99,
            category: 'furniture',
            material: 'wood',
            rating: 4.2,
            image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: false,
            isPopular: true
        },
        {
            id: 3,
            name: 'Ceramic Table Lamp',
            price: 89.99,
            category: 'lighting',
            material: 'ceramic',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: true,
            isPopular: false
        },
        {
            id: 4,
            name: 'Abstract Wall Art',
            price: 149.99,
            category: 'art',
            material: 'canvas',
            rating: 4.0,
            image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: false,
            isPopular: true
        },
        {
            id: 5,
            name: 'Fiddle Leaf Fig Tree',
            price: 59.99,
            category: 'plants',
            material: 'plant',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: false,
            isPopular: true
        },
        {
            id: 6,
            name: 'Industrial Bookshelf',
            price: 279.99,
            category: 'furniture',
            material: 'metal',
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: true,
            isPopular: false
        },
        {
            id: 7,
            name: 'Geometric Pendant Light',
            price: 129.99,
            category: 'lighting',
            material: 'metal',
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: false,
            isPopular: true
        },
        {
            id: 8,
            name: 'Modern Floor Mirror',
            price: 229.99,
            category: 'furniture',
            material: 'glass',
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            isNew: true,
            isPopular: true
        }
    ];
    
    // Shopping cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    
    // Display products on home page
    const featuredGrid = document.querySelector('.featured .product-grid');
    if (featuredGrid) {
        const bestSellers = products.filter(product => product.isPopular);
        displayProducts(bestSellers, featuredGrid);
    }
    
    // Display products on shop page
    const shopGrid = document.querySelector('.shop-products .product-grid');
    if (shopGrid) {
        displayProducts(products, shopGrid);
        
        // Filter and sort functionality
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const materialFilter = document.getElementById('material-filter');
        const sortBy = document.getElementById('sort-by');
        
        [categoryFilter, priceFilter, materialFilter, sortBy].forEach(filter => {
            filter.addEventListener('change', filterAndSortProducts);
        });
        
        // Check for category parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            categoryFilter.value = categoryParam;
            filterAndSortProducts();
        }
    }
    
    // Product detail page functionality
    if (document.querySelector('.product-detail')) {
        // Thumbnail image click
        document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelector('.thumbnail-images img.active').classList.remove('active');
                this.classList.add('active');
                document.getElementById('main-image').src = this.src;
            });
        });
        
        // Quantity controls
        document.querySelector('.qty-minus').addEventListener('click', function() {
            const input = document.querySelector('.quantity input');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
        
        document.querySelector('.qty-plus').addEventListener('click', function() {
            const input = document.querySelector('.quantity input');
            input.value = parseInt(input.value) + 1;
        });
        
        // Add to cart button
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(document.querySelector('.quantity input').value);
            addToCart(1, quantity); // Using product ID 1 for the demo
            alert('Product added to cart!');
        });
        
        // Buy now button
        document.querySelector('.buy-now').addEventListener('click', function() {
            const quantity = parseInt(document.querySelector('.quantity input').value);
            addToCart(1, quantity); // Using product ID 1 for the demo
            alert('Proceeding to checkout!');
            // In a real app, redirect to checkout page
        });
        
        // Display related products
        const relatedGrid = document.querySelector('.related-products .product-grid');
        const relatedProducts = products.filter(product => product.category === 'furniture' && product.id !== 1);
        displayProducts(relatedProducts, relatedGrid);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Helper functions
    function displayProducts(productsToDisplay, container) {
        container.innerHTML = '';
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            container.appendChild(productCard);
        });
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId, 1);
                alert('Product added to cart!');
            });
        });
    }
    
    function getRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    function addToCart(productId, quantity) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCartCount();
        saveCartToLocalStorage();
    }
    
    function updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        countElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function filterAndSortProducts() {
        const category = document.getElementById('category-filter').value;
        const priceRange = document.getElementById('price-filter').value;
        const material = document.getElementById('material-filter').value;
        const sortBy = document.getElementById('sort-by').value;
        
        let filteredProducts = [...products];
        
        // Filter by category
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        // Filter by price range
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            if (priceRange.endsWith('+')) {
                filteredProducts = filteredProducts.filter(product => product.price >= min);
            } else {
                filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
            }
        }
        
        // Filter by material
        if (material !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.material === material);
        }
        
        // Sort products
        switch (sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filteredProducts.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default:
                // Default sorting (original order)
                break;
        }
        
        displayProducts(filteredProducts, shopGrid);
    }
});