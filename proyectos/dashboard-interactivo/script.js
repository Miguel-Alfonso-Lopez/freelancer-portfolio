// Global variables
let charts = {};
let currentSection = 'dashboard';
let sampleData = {
    revenue: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 78000, 82000, 89000, 95000],
    orders: [120, 145, 132, 178, 156, 189, 203, 187, 234, 245, 267, 289],
    users: [1250, 1340, 1420, 1580, 1650, 1780, 1890, 1950, 2100, 2250, 2380, 2500],
    conversion: [3.2, 3.8, 3.5, 4.1, 3.9, 4.3, 4.6, 4.2, 4.8, 5.1, 5.3, 5.6]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeCharts();
    loadDashboardData();
    setupEventListeners();
    loadSampleData();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggleTop');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');

    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // Navigation handling
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                switchSection(section);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Close sidebar on mobile
                if (window.innerWidth < 1024) {
                    sidebar.classList.remove('show');
                }
            }
        });
    });
}

// Section switching
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
}

// Load section-specific data
function loadSectionData(section) {
    switch(section) {
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'sales':
            loadSalesData();
            break;
        case 'users':
            loadUsersData();
            break;
        default:
            break;
    }
}

// Initialize charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        charts.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ingresos',
                    data: sampleData.revenue,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Sales Distribution Chart
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        charts.sales = new Chart(salesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        charts.traffic = new Chart(trafficCtx, {
            type: 'bar',
            data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Visitantes',
                    data: [1200, 1900, 1500, 2100, 1800, 900, 700],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Devices Chart
    const devicesCtx = document.getElementById('devicesChart');
    if (devicesCtx) {
        charts.devices = new Chart(devicesCtx, {
            type: 'pie',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [45, 40, 15],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Load dashboard data
function loadDashboardData() {
    // Animate KPI values
    animateValue('totalRevenue', 0, 847500, 2000, '$');
    animateValue('totalOrders', 0, 2156, 2000);
    animateValue('totalUsers', 0, 18750, 2000);
    animateValue('conversionRate', 0, 4.8, 2000, '', '%');
    
    // Update change indicators
    updateChangeIndicator('revenueChange', 12.5, true);
    updateChangeIndicator('ordersChange', 8.3, true);
    updateChangeIndicator('usersChange', 15.7, true);
    updateChangeIndicator('conversionChange', -2.1, false);
    
    // Load recent activities
    loadRecentActivities();
    
    // Load top products
    loadTopProducts();
}

// Animate counter values
function animateValue(elementId, start, end, duration, prefix = '', suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        
        if (suffix === '%') {
            element.textContent = prefix + current.toFixed(1) + suffix;
        } else if (prefix === '$') {
            element.textContent = prefix + Math.floor(current).toLocaleString();
        } else {
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Update change indicators
function updateChangeIndicator(elementId, value, isPositive) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = (isPositive ? '+' : '') + value.toFixed(1) + '%';
    element.className = 'kpi-change ' + (isPositive ? 'positive' : 'negative');
}

// Load recent activities
function loadRecentActivities() {
    const activities = [
        {
            icon: '💰',
            title: 'Nueva venta registrada',
            description: 'Pedido #1234 por $450',
            time: 'Hace 5 min',
            color: '#10b981'
        },
        {
            icon: '👤',
            title: 'Nuevo usuario registrado',
            description: 'Juan Pérez se unió a la plataforma',
            time: 'Hace 15 min',
            color: '#3b82f6'
        },
        {
            icon: '📦',
            title: 'Producto actualizado',
            description: 'Inventario de Producto A actualizado',
            time: 'Hace 30 min',
            color: '#f59e0b'
        },
        {
            icon: '🔔',
            title: 'Alerta de stock bajo',
            description: 'Producto B tiene stock bajo',
            time: 'Hace 1 hora',
            color: '#ef4444'
        }
    ];
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.color}">
                    ${activity.icon}
                </div>
                <div class="activity-content">
                    <h6>${activity.title}</h6>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }
}

// Load top products
function loadTopProducts() {
    const products = [
        {
            name: 'Producto Premium A',
            category: 'Electrónicos',
            sales: 156,
            revenue: '$23,400',
            icon: '📱'
        },
        {
            name: 'Producto Estándar B',
            category: 'Hogar',
            sales: 134,
            revenue: '$18,760',
            icon: '🏠'
        },
        {
            name: 'Producto Especial C',
            category: 'Deportes',
            sales: 98,
            revenue: '$14,700',
            icon: '⚽'
        },
        {
            name: 'Producto Básico D',
            category: 'Oficina',
            sales: 87,
            revenue: '$10,440',
            icon: '💼'
        }
    ];
    
    const productsList = document.getElementById('topProductsList');
    if (productsList) {
        productsList.innerHTML = products.map(product => `
            <div class="product-item">
                <div class="product-image">
                    ${product.icon}
                </div>
                <div class="product-info">
                    <h6>${product.name}</h6>
                    <p>${product.category}</p>
                </div>
                <div class="product-sales">
                    <div class="sales-count">${product.sales} ventas</div>
                    <div class="sales-revenue">${product.revenue}</div>
                </div>
            </div>
        `).join('');
    }
}

// Load analytics data
function loadAnalyticsData() {
    // This would typically fetch data from an API
    console.log('Loading analytics data...');
}

// Load sales data
function loadSalesData() {
    const salesData = [
        {
            id: '#1001',
            customer: 'María García',
            product: 'Producto Premium A',
            date: '2024-01-15',
            amount: '$450',
            status: 'completed'
        },
        {
            id: '#1002',
            customer: 'Carlos López',
            product: 'Producto Estándar B',
            date: '2024-01-14',
            amount: '$320',
            status: 'pending'
        },
        {
            id: '#1003',
            customer: 'Ana Rodríguez',
            product: 'Producto Especial C',
            date: '2024-01-14',
            amount: '$275',
            status: 'completed'
        },
        {
            id: '#1004',
            customer: 'Luis Martínez',
            product: 'Producto Básico D',
            date: '2024-01-13',
            amount: '$180',
            status: 'cancelled'
        },
        {
            id: '#1005',
            customer: 'Elena Fernández',
            product: 'Producto Premium A',
            date: '2024-01-13',
            amount: '$450',
            status: 'completed'
        }
    ];
    
    const tableBody = document.getElementById('salesTableBody');
    if (tableBody) {
        tableBody.innerHTML = salesData.map(sale => `
            <tr>
                <td><strong>${sale.id}</strong></td>
                <td>${sale.customer}</td>
                <td>${sale.product}</td>
                <td>${sale.date}</td>
                <td><strong>${sale.amount}</strong></td>
                <td><span class="status-badge ${sale.status}">${getStatusText(sale.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1">Ver</button>
                    <button class="btn btn-sm btn-outline-secondary">Editar</button>
                </td>
            </tr>
        `).join('');
    }
}

// Get status text
function getStatusText(status) {
    const statusMap = {
        completed: 'Completado',
        pending: 'Pendiente',
        cancelled: 'Cancelado'
    };
    return statusMap[status] || status;
}

// Load users data
function loadUsersData() {
    const users = [
        {
            name: 'María García',
            email: 'maria@email.com',
            role: 'Administrador',
            avatar: '👩‍💼',
            status: 'Activo'
        },
        {
            name: 'Carlos López',
            email: 'carlos@email.com',
            role: 'Gerente',
            avatar: '👨‍💼',
            status: 'Activo'
        },
        {
            name: 'Ana Rodríguez',
            email: 'ana@email.com',
            role: 'Usuario',
            avatar: '👩‍💻',
            status: 'Inactivo'
        },
        {
            name: 'Luis Martínez',
            email: 'luis@email.com',
            role: 'Usuario',
            avatar: '👨‍💻',
            status: 'Activo'
        },
        {
            name: 'Elena Fernández',
            email: 'elena@email.com',
            role: 'Gerente',
            avatar: '👩‍🔬',
            status: 'Activo'
        },
        {
            name: 'Roberto Silva',
            email: 'roberto@email.com',
            role: 'Usuario',
            avatar: '👨‍🎨',
            status: 'Activo'
        }
    ];
    
    const usersGrid = document.getElementById('usersGrid');
    if (usersGrid) {
        usersGrid.innerHTML = users.map(user => `
            <div class="user-card">
                <div class="user-avatar">
                    ${user.avatar}
                </div>
                <h5>${user.name}</h5>
                <p>${user.email}</p>
                <p><strong>Rol:</strong> ${user.role}</p>
                <p><strong>Estado:</strong> <span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></p>
                <div class="user-actions">
                    <button class="btn btn-sm btn-outline-primary">Editar</button>
                    <button class="btn btn-sm btn-outline-danger">Eliminar</button>
                </div>
            </div>
        `).join('');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Refresh data button
    const refreshBtn = document.getElementById('refreshData');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Actualizando...';
            
            setTimeout(() => {
                loadDashboardData();
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar';
                showNotification('Datos actualizados correctamente', 'success');
            }, 1500);
        });
    }
    
    // Time range selector
    const timeRange = document.getElementById('timeRange');
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            updateChartsData(this.value);
        });
    }
    
    // Chart controls
    const chartControls = document.querySelectorAll('[data-chart]');
    chartControls.forEach(control => {
        control.addEventListener('click', function() {
            const chartType = this.getAttribute('data-chart');
            
            // Update active button
            chartControls.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart
            updateChart(chartType);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
    
    // Sales search and filter
    const salesSearch = document.getElementById('salesSearch');
    const salesFilter = document.getElementById('salesFilter');
    
    if (salesSearch) {
        salesSearch.addEventListener('input', function() {
            filterSalesTable();
        });
    }
    
    if (salesFilter) {
        salesFilter.addEventListener('change', function() {
            filterSalesTable();
        });
    }
    
    // Add user form
    const saveUserBtn = document.getElementById('saveUser');
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', function() {
            const form = document.getElementById('addUserForm');
            const formData = new FormData(form);
            
            // Simulate saving user
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            
            setTimeout(() => {
                showNotification('Usuario agregado correctamente', 'success');
                form.reset();
                this.innerHTML = 'Guardar Usuario';
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
                modal.hide();
                
                // Reload users
                loadUsersData();
            }, 1000);
        });
    }
}

// Update charts data based on time range
function updateChartsData(days) {
    // This would typically fetch new data from an API
    console.log(`Updating charts for last ${days} days`);
    
    // Simulate data update
    if (charts.revenue) {
        const newData = generateRandomData(12, 30000, 100000);
        charts.revenue.data.datasets[0].data = newData;
        charts.revenue.update();
    }
}

// Update specific chart
function updateChart(chartType) {
    if (chartType === 'revenue' && charts.revenue) {
        charts.revenue.data.datasets[0].data = sampleData.revenue;
        charts.revenue.data.datasets[0].label = 'Ingresos';
        charts.revenue.update();
    } else if (chartType === 'orders' && charts.revenue) {
        charts.revenue.data.datasets[0].data = sampleData.orders;
        charts.revenue.data.datasets[0].label = 'Pedidos';
        charts.revenue.update();
    }
}

// Generate random data
function generateRandomData(length, min, max) {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Filter sales table
function filterSalesTable() {
    const searchTerm = document.getElementById('salesSearch')?.value.toLowerCase() || '';
    const filterValue = document.getElementById('salesFilter')?.value || 'all';
    
    const rows = document.querySelectorAll('#salesTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const statusElement = row.querySelector('.status-badge');
        const status = statusElement ? statusElement.className.split(' ').pop() : '';
        
        const matchesSearch = text.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || status === filterValue;
        
        row.style.display = matchesSearch && matchesFilter ? '' : 'none';
    });
}

// Load sample data
function loadSampleData() {
    // This function loads initial sample data
    console.log('Sample data loaded');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Responsive handling
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        document.getElementById('sidebar').classList.remove('show');
    }
    
    // Resize charts
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
});

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});