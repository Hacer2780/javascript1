document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("btn-menu");
    const closeButton = document.getElementById("close-sidebar");
    const sidebar = document.getElementById("sidebar");

    menuButton.addEventListener("click", function () {
        sidebar.classList.add("active"); 
    });

    closeButton.addEventListener("click", function () {
        sidebar.classList.remove("active"); 
    });

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});
