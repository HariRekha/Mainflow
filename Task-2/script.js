document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const container = document.getElementById('content');

    function loadComponent(component) {
        container.innerHTML = component;
    }

    const components = {
        "/": `
            <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 3rem;">Home</h1>
                <div>
                    <p style="font-size: 2rem;">Welcome to Home</p>
                </div>
            </div>
        `,
        "/pricing": `
            <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 3rem;">Pricing</h1>
                <div>
                    <p style="font-size: 2rem;">Pricing details go here.</p>
                </div>
            </div>
        `,
        "/about": `
            <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 3rem;">About</h1>
                <div>
                    <p style="font-size: 2rem;">About us information goes here.</p>
                </div>
            </div>
        `,
        "/signinout": `
            <div style="text-align: center; padding: 20px;">
                <h1 style="font-size: 3rem;">Signin</h1>
                <div>
                    <p style="font-size: 2rem;">Signin form goes here.</p>
                </div>
            </div>
        `
    };

    if (components[path]) {
        loadComponent(components[path]);
    }

    // Highlight the active link
    document.querySelectorAll('.custom-link').forEach(link => {
        if (link.querySelector('a').getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
});
