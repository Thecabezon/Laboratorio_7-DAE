document.addEventListener('DOMContentLoaded', function() {
    // 1. Animación de fade-in para los posts
    const posts = document.querySelectorAll('article');
    posts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // 2. Botón "Volver arriba"
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    scrollButton.style.display = 'none';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. Tiempo de lectura estimado
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const text = article.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto

        const timeElement = document.createElement('span');
        timeElement.className = 'reading-time';
        timeElement.innerHTML = `<i>Tiempo de lectura: ${readingTime} min</i>`;
        article.insertBefore(timeElement, article.firstChild);
    });

    // 4. Resaltado de código de sintaxis
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.style.backgroundColor = '#f4f4f4';
        block.style.padding = '1em';
        block.style.borderRadius = '5px';
        block.style.display = 'block';
        block.style.overflow = 'auto';
    });

    // 5. Confirmación antes de salir si hay comentarios sin enviar
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        const commentInput = commentForm.querySelector('textarea');
        if (commentInput) {
            window.addEventListener('beforeunload', (e) => {
                if (commentInput.value.length > 0) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });
        }
    }
});

// 6. Función para compartir posts
function sharePost(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        })
        .catch(console.error);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('¡Enlace copiado al portapapeles!');
    }
}

// 7. Modo oscuro
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Verificar preferencia guardada
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}