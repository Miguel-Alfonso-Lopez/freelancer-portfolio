document.addEventListener('DOMContentLoaded', function () {
    anime({
        targets: '.anime-title',
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(300)
    });

    const proyectos = [
        {
            "nombre": "Consultoría Empresarial",
            "descripcion": "Sitio web para una consultora, enfocado en la presentación de servicios y captación de clientes.",
            "url": "./proyectos/consultoria-empresarial/index.html"
        },
        {
            "nombre": "Dashboard Interactivo",
            "descripcion": "Dashboard de análisis de datos con visualizaciones interactivas y métricas en tiempo real.",
            "url": "./proyectos/dashboard-interactivo/index.html"
        },
        {
            "nombre": "Galería de Arte",
            "descripcion": "Plataforma digital para la exhibición y venta de obras de arte, con un diseño moderno y elegante.",
            "url": "./proyectos/galeria-arte/index.html"
        },
        {
            "nombre": "Juego de Memoria",
            "descripcion": "Juego interactivo para poner a prueba la memoria, con diferentes niveles de dificultad.",
            "url": "./proyectos/juego-memoria/index.html"
        },
        {
            "nombre": "Landing Page Moderna",
            "descripcion": "Landing page para un producto tecnológico, diseñada para maximizar la conversión de usuarios.",
            "url": "./proyectos/landing-page-moderna/index.html"
        }
    ];

    const proyectosGrid = document.getElementById('proyectos-grid');

    proyectos.forEach(proyecto => {
        const proyectoCol = document.createElement('div');
        proyectoCol.className = 'col-md-6 col-lg-4';

        proyectoCol.innerHTML = `
            <div class="card proyecto-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${proyecto.nombre}</h5>
                    <p class="card-text">${proyecto.descripcion}</p>
                    <a href="${proyecto.url}" class="btn btn-primary" target="_blank">Ver Proyecto</a>
                </div>
            </div>
        `;
        proyectosGrid.appendChild(proyectoCol);
    });
});