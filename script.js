// Smooth transition for button clicks
document.querySelector('.animated-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    setTimeout(() => {
        window.location.href = 'Myproject.html'; // Redirect after a delay
    }, 300); // 300ms delay for animation
});