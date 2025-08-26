// Extracted from index.html <script>
function navigateToProjects() {
    window.location.href = 'MyProject.html';
}

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
