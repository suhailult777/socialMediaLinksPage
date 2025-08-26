// Extracted from MyProject.html <script>
// Function for the back button (in-page)
function goBack() {
    const transition = document.createElement('div');
    transition.className = 'page-transition active';
    document.body.appendChild(transition);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Intercept browser back button navigation
window.onpopstate = function (event) {
    const transition = document.createElement('div');
    transition.className = 'page-transition active';
    document.body.appendChild(transition);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
};

history.pushState(null, null, window.location.href);

document.querySelectorAll('.animated-button').forEach(button => {
    button.addEventListener('click', function (e) {
        const hrefMatch = this.getAttribute('onclick').match(/'([^']+)'/);
        if (hrefMatch && hrefMatch[1].includes('MyProject.html')) {
            e.preventDefault();
            const transition = document.createElement('div');
            transition.className = 'page-transition active';
            document.body.appendChild(transition);
            setTimeout(() => {
                window.location.href = hrefMatch[1];
            }, 500);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Function to apply the saved theme on page load
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    };

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // Apply the saved theme when the page loads
    applySavedTheme();
});
