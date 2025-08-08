**Texto:** "Organiza, prioriza y colabora: Todo en un solo lugar con TaskHive."  


"Bienvenido a TaskHive, la solución definitiva para gestionar tus proyectos y tareas diarias. Diseñada para equipos y personas que buscan eficiencia, TaskHive combina simplicidad con potentes herramientas para mantener todo bajo control."  

**Elementos visuales:**  
- Fondo moderno con gradiente suave entre **#6E48AA (morado)** y **#6A11CB (violeta oscuro)**.  
- Logo de TaskHive (placeholder: [https://placehold.co/150x50?text=TaskHive&font=roboto](https://placehold.co/150x50?text=TaskHive&font=roboto)).  


**Texto:**  
1. **Sincronización en Tiempo Real**  
   "Colabora con tu equipo sin demoras. Los cambios se actualizan al instante en todos los dispositivos."  
2. **Personalización Flexible**  
   "Etiquetas, colores y recordatorios adaptables a tu flujo de trabajo."  
3. **Integraciones Inteligentes**  
   "Conecta TaskHive con Google Calendar, Slack y más para un flujo continuo."  

**Diseño:**  
- Tarjetas con iconos minimalistas (usar [Font Awesome](https://cdnjs.com/libraries/font-awesome)).  
- Fondos de tarjetas en blanco (#FFFFFF) con sombras sutiles.  


**Imágenes (placeholders):**  
1. **Pantalla de Inicio:**  
   [https://placehold.co/400x700?text=TaskHive+Home+Screen](https://placehold.co/400x700?text=TaskHive+Home+Screen)  
   *Alt:* "Interfaz principal de TaskHive mostrando lista de tareas y barra de búsqueda."  

2. **Vista de Proyecto:**  
   [https://placehold.co/400x700?text=Project+View](https://placehold.co/400x700?text=Project+View)  
   *Alt:* "Tablero Kanban con tarjetas de tareas organizadas por etapas."  

3. **Configuración:**  
   [https://placehold.co/400x700?text=Settings](https://placehold.co/400x700?text=Settings)  
   *Alt:* "Menú de personalización con opciones de temas y notificaciones."  

**Funcionalidad:**  
- Carrusel automático con controles manuales (puntos de navegación).  
- Transición suave (duración: 500ms).  


**Texto:**  
"¡Empieza hoy mismo! Descarga TaskHive en:"  

**Botones:**  
- **iOS:**  
  Icono de Apple + "Disponible en App Store".  
  *Color:* #000000 (negro mate).  
- **Android:**  
  Icono de Google Play + "Descargar en Google Play".  
  *Color:* #4CAF50 (verde brillante).  

**Fondo:**  
- Patrón geométrico sutil en tonos claros (#F9F9F9).  

---

### **Colores de la Marca**  
- **Primario:** `#6E48AA` (morado claro).  
- **Secundario:** `#6A11CB` (violeta intenso).  
- **Texto:** `#333333` (gris oscuro) para cuerpo, `#000000` para títulos.  

### **Tipografía**  
- **Títulos:** *Poppins* (bold).  
- **Cuerpo:** *Open Sans* (regular).  

 

`index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="TaskHive simplifica la gestión de tareas para individuos y equipos.">
    <title>TaskHive - Organiza tus tareas</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    
    <!-- Typed.js for animated text -->
    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
    
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            color: #333333;
        }
        
        h1, h2, h3 {
            font-family: 'Poppins', sans-serif;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #6E48AA 0%, #6A11CB 100%);
        }
        
        .card-shadow {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .btn-ios:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-android:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white py-4 px-6 shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
            <img src="https://placehold.co/150x50?text=TaskHive&font=roboto" alt="Logo de TaskHive con tipografía moderna en color morado" class="h-8">
            <div>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Inicio</a>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Características</a>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Descarga</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20 px-6">
        <div class="container mx-auto text-center max-w-4xl">
            <h1 id="typed-text" class="text-4xl md:text-6xl font-bold mb-6"></h1>
            <p class="text-xl mb-8">Bienvenido a TaskHive, la solución definitiva para gestionar tus proyectos y tareas diarias. Diseñada para equipos y personas que buscan eficiencia.</p>
            <div class="flex justify-center space-x-4">
                <a href="#download" class="bg-white text-purple-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">Empezar ahora</a>
                <a href="#features" class="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-800 transition duration-300">Saber más</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 px-6 bg-white">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-3xl font-bold text-center mb-12">Potentes características para tu productividad</h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Sincronización en Tiempo Real</h3>
                    <p class="text-gray-600">Colabora con tu equipo sin demoras. Los cambios se actualizan al instante en todos los dispositivos.</p>
                </div>
                
                <!-- Feature 2 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Personalización Flexible</h3>
                    <p class="text-gray-600">Etiquetas, colores y recordatorios adaptables a tu flujo de trabajo.</p>
                </div>
                
                <!-- Feature 3 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-plug"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Integraciones Inteligentes</h3>
                    <p class="text-gray-600">Conecta TaskHive con Google Calendar, Slack y más para un flujo continuo.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Screenshot Carousel -->
    <section class="py-16 px-6 bg-gray-50">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-3xl font-bold text-center mb-12">Descubre TaskHive en acción</h2>
            
            <div class="relative overflow-hidden rounded-xl bg-white p-6 card-shadow">
                <div class="flex flex-nowrap overflow-x-auto space-x-4 pb-4 scroll-smooth" id="carousel">
                    <!-- Screenshot 1 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://placehold.co/400x700?text=TaskHive+Home+Screen" 
                             alt="Interfaz principal de TaskHive mostrando lista de tareas con diseño limpio, barra de búsqueda en la parte superior y menú lateral"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                    
                    <!-- Screenshot 2 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://placehold.co/400x700?text=Project+View" 
                             alt="Tablero Kanban con tarjetas de tareas organizadas en columnas 'Por hacer', 'En progreso' y 'Completado'"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                    
                    <!-- Screenshot 3 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://placehold.co/400x700?text=Settings" 
                             alt="Pantalla de configuración con opciones de temas claros/oscuros, ajustes de notificaciones y preferencias"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                </div>
                
                <div class="flex justify-center mt-6 space-x-2" id="carousel-dots">
                    <button onclick="goToSlide(0)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                    <button onclick="goToSlide(1)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                    <button onclick="goToSlide(2)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                </div>
            </div>
        </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="py-20 px-6 bg-white">
        <div class="container mx-auto max-w-4xl text-center">
            <h2 class="text-3xl font-bold mb-6">¡Empieza hoy mismo!</h2>
            <p class="text-xl text-gray-600 mb-10">Descarga TaskHive y transforma tu productividad</p>
            
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <!-- iOS Button -->
                <a href="#" class="btn-ios bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center transition duration-300">
                    <i class="fab fa-apple text-3xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Disponible en</div>
                        <div class="text-xl font-bold">App Store</div>
                    </div>
                </a>
                
                <!-- Android Button -->
                <a href="#" class="btn-android bg-[#4CAF50] text-white px-8 py-4 rounded-lg flex items-center justify-center transition duration-300">
                    <i class="fab fa-google-play text-3xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Descargar en</div>
                        <div class="text-xl font-bold">Google Play</div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 px-6">
        <div class="container mx-auto max-w-6xl">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <img src="https://placehold.co/150x50?text=TaskHive&font=roboto" alt="Logo de TaskHive en versión blanca para el pie de página" class="h-8 mb-4">
                    <p class="text-gray-400">La solución definitiva para la gestión de tareas y proyectos.</p>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Producto</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Características</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Precios</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Actualizaciones</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Compañía</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Acerca de</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Trabajos</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Noticias</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Soporte</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Centro de ayuda</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Contacto</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Seguridad</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2023 TaskHive. Todos los derechos reservados.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Typed.js Animation
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed('#typed-text', {
                strings: ["Organiza tus tareas.", "Prioriza tu trabajo.", "Colabora con tu equipo."],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true
            });
            
            // Carousel functionality
            let currentSlide = 0;
            const slides = document.getElementById('carousel').children;
            const dots = document.getElementById('carousel-dots').children;
            
            function updateCarousel() {
                // Update dots
                for (let i = 0; i < dots.length; i++) {
                    if (i === currentSlide) {
                        dots[i].classList.remove('bg-purple-200');
                        dots[i].classList.add('bg-purple-600');
                    } else {
                        dots[i].classList.remove('bg-purple-600');
                        dots[i].classList.add('bg-purple-200');
                    }
                }
                
                // Auto slide
                currentSlide = (currentSlide + 1) % slides.length;
                setTimeout(updateCarousel, 3000);
            }
            
            function goToSlide(index) {
                currentSlide = index;
                const carousel = document.getElementById('carousel');
                carousel.scrollTo({
                    left: slides[index].offsetLeft,
                    behavior: 'smooth'
                });
                updateCarousel();
            }
            
            // Initialize carousel
            updateCarousel();
        });
    </script>
</body>
</html>

```


`index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="TaskHive simplifica la gestión de tareas para individuos y equipos.">
    <title>TaskHive - Organiza tus tareas</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    
    <!-- Typed.js for animated text -->
    <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
    
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            color: #333333;
        }
        
        h1, h2, h3 {
            font-family: 'Poppins', sans-serif;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #6E48AA 0%, #6A11CB 100%);
        }
        
        .card-shadow {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .btn-ios:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .btn-android:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white py-4 px-6 shadow-sm">
        <div class="container mx-auto flex justify-between items-center">
            <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/618dbaf4-e198-4d26-859c-3bacd798a958.png" alt="Logo de TaskHive con tipografía moderna en color morado" class="h-8">
            <div>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Inicio</a>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Características</a>
                <a href="#" class="px-4 py-2 text-gray-600 hover:text-purple-600">Descarga</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg text-white py-20 px-6">
        <div class="container mx-auto text-center max-w-4xl">
            <h1 id="typed-text" class="text-4xl md:text-6xl font-bold mb-6"></h1>
            <p class="text-xl mb-8">Bienvenido a TaskHive, la solución definitiva para gestionar tus proyectos y tareas diarias. Diseñada para equipos y personas que buscan eficiencia.</p>
            <div class="flex justify-center space-x-4">
                <a href="#download" class="bg-white text-purple-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">Empezar ahora</a>
                <a href="#features" class="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-800 transition duration-300">Saber más</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16 px-6 bg-white">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-3xl font-bold text-center mb-12">Potentes características para tu productividad</h2>
            
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Sincronización en Tiempo Real</h3>
                    <p class="text-gray-600">Colabora con tu equipo sin demoras. Los cambios se actualizan al instante en todos los dispositivos.</p>
                </div>
                
                <!-- Feature 2 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-sliders-h"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Personalización Flexible</h3>
                    <p class="text-gray-600">Etiquetas, colores y recordatorios adaptables a tu flujo de trabajo.</p>
                </div>
                
                <!-- Feature 3 -->
                <div class="bg-white p-8 rounded-xl card-shadow">
                    <div class="text-purple-600 text-4xl mb-4">
                        <i class="fas fa-plug"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Integraciones Inteligentes</h3>
                    <p class="text-gray-600">Conecta TaskHive con Google Calendar, Slack y más para un flujo continuo.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Screenshot Carousel -->
    <section class="py-16 px-6 bg-gray-50">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-3xl font-bold text-center mb-12">Descubre TaskHive en acción</h2>
            
            <div class="relative overflow-hidden rounded-xl bg-white p-6 card-shadow">
                <div class="flex flex-nowrap overflow-x-auto space-x-4 pb-4 scroll-smooth" id="carousel">
                    <!-- Screenshot 1 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0c431078-65bd-417a-b125-635b8d872e0c.png" 
                             alt="Interfaz principal de TaskHive mostrando lista de tareas con diseño limpio, barra de búsqueda en la parte superior y menú lateral"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                    
                    <!-- Screenshot 2 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/26592b90-248b-4f28-a9bd-d46dc2ed8a93.png" 
                             alt="Tablero Kanban con tarjetas de tareas organizadas en columnas 'Por hacer', 'En progreso' y 'Completado'"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                    
                    <!-- Screenshot 3 -->
                    <div class="flex-shrink-0 w-80">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c46258d-fe4f-4d9a-b4ac-142f19df495e.png" 
                             alt="Pantalla de configuración con opciones de temas claros/oscuros, ajustes de notificaciones y preferencias"
                             class="rounded-lg border border-gray-200 w-full h-auto">
                    </div>
                </div>
                
                <div class="flex justify-center mt-6 space-x-2" id="carousel-dots">
                    <button onclick="goToSlide(0)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                    <button onclick="goToSlide(1)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                    <button onclick="goToSlide(2)" class="w-3 h-3 rounded-full bg-purple-200"></button>
                </div>
            </div>
        </div>
    </section>

    <!-- Download Section -->
    <section id="download" class="py-20 px-6 bg-white">
        <div class="container mx-auto max-w-4xl text-center">
            <h2 class="text-3xl font-bold mb-6">¡Empieza hoy mismo!</h2>
            <p class="text-xl text-gray-600 mb-10">Descarga TaskHive y transforma tu productividad</p>
            
            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <!-- iOS Button -->
                <a href="#" class="btn-ios bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center transition duration-300">
                    <i class="fab fa-apple text-3xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Disponible en</div>
                        <div class="text-xl font-bold">App Store</div>
                    </div>
                </a>
                
                <!-- Android Button -->
                <a href="#" class="btn-android bg-[#4CAF50] text-white px-8 py-4 rounded-lg flex items-center justify-center transition duration-300">
                    <i class="fab fa-google-play text-3xl mr-3"></i>
                    <div class="text-left">
                        <div class="text-xs">Descargar en</div>
                        <div class="text-xl font-bold">Google Play</div>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 px-6">
        <div class="container mx-auto max-w-6xl">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d24b919-7a99-486c-abfe-1350e3c2f8c5.png" alt="Logo de TaskHive en versión blanca para el pie de página" class="h-8 mb-4">
                    <p class="text-gray-400">La solución definitiva para la gestión de tareas y proyectos.</p>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Producto</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Características</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Precios</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Actualizaciones</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Compañía</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Acerca de</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Trabajos</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Noticias</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="font-bold mb-4">Soporte</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Centro de ayuda</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Contacto</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Seguridad</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm mb-4 md:mb-0">© 2023 TaskHive. Todos los derechos reservados.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Typed.js Animation
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed('#typed-text', {
                strings: ["Organiza tus tareas.", "Prioriza tu trabajo.", "Colabora con tu equipo."],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true
            });
            
            // Carousel functionality
            let currentSlide = 0;
            const slides = document.getElementById('carousel').children;
            const dots = document.getElementById('carousel-dots').children;
            
            function updateCarousel() {
                // Update dots
                for (let i = 0; i < dots.length; i++) {
                    if (i === currentSlide) {
                        dots[i].classList.remove('bg-purple-200');
                        dots[i].classList.add('bg-purple-600');
                    } else {
                        dots[i].classList.remove('bg-purple-600');
                        dots[i].classList.add('bg-purple-200');
                    }
                }
                
                // Auto slide
                currentSlide = (currentSlide + 1) % slides.length;
                setTimeout(updateCarousel, 3000);
            }
            
            function goToSlide(index) {
                currentSlide = index;
                const carousel = document.getElementById('carousel');
                carousel.scrollTo({
                    left: slides[index].offsetLeft,
                    behavior: 'smooth'
                });
                updateCarousel();
            }
            
            // Initialize carousel
            updateCarousel();
        });
    </script>
</body>
</html>

```
