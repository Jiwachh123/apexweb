document.addEventListener('DOMContentLoaded', () => {

    // --- To-Do List App Logic ---
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');
            li.textContent = taskText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                removeTask(index);
            };
            
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    // Save tasks to Local Storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return; // Don't add empty tasks

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        saveTasks(tasks);
        loadTasks();
        taskInput.value = '';
    };

    // Remove a task
    const removeTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };
    
    // Event listeners for the To-Do App
    if(addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
        // Initial load
        loadTasks();
    }


    // --- Product Listing App Logic ---
    const productListContainer = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortButtons = document.querySelectorAll('.sort-btn');

    const products = [
        { name: 'Wireless Mouse', category: 'electronics', price: 25.99, rating: 4.5 },
        { name: 'Classic T-Shirt', category: 'apparel', price: 15.00, rating: 4.2 },
        { name: 'JavaScript Guide', category: 'books', price: 35.50, rating: 4.9 },
        { name: 'Bluetooth Headphones', category: 'electronics', price: 79.99, rating: 4.7 },
        { name: 'Denim Jeans', category: 'apparel', price: 45.00, rating: 4.0 },
        { name: 'Laptop Stand', category: 'electronics', price: 30.00, rating: 4.6 },
        { name: 'CSS Secrets', category: 'books', price: 29.99, rating: 4.8 },
        { name: 'Hoodie', category: 'apparel', price: 55.25, rating: 4.4 },
    ];
    
    let currentProducts = [...products];

    // Render products to the DOM
    const renderProducts = (productsToRender) => {
        if (!productListContainer) return;
        productListContainer.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <h4>${product.name}</h4>
                    <span class="product-category">${product.category}</span>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-rating">Rating: ${'&#9733;'.repeat(Math.round(product.rating))} ${product.rating}</p>
                </div>
            `;
            productListContainer.innerHTML += productCard;
        });
    };
    
    // Apply all filters and sorting
    const applyFiltersAndSort = () => {
        let filteredProducts = [...products];
        
        // Category filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }
        
        currentProducts = filteredProducts;
        renderProducts(currentProducts);
    }
    
    // Sort logic
    const handleSort = (sortType) => {
        if (sortType === 'price') {
            currentProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'rating') {
            currentProducts.sort((a, b) => b.rating - a.rating);
        }
        renderProducts(currentProducts);
    }

    // Event listeners for the Product App
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFiltersAndSort);
    }
    
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleSort(button.dataset.sort);
        });
    });

    // Initial render for products
    renderProducts(products);
});