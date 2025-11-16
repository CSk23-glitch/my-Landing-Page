document.addEventListener('DOMContentLoaded', () => {
    // 1. Skill Tabs Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillContents = document.querySelectorAll('.skill-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));

            // Add active state to clicked button
            button.classList.add('active');

            // Show corresponding content
            const targetSkill = button.getAttribute('data-skill');
            document.getElementById(`${targetSkill}-content`).classList.add('active');
        });
    });

    // Initialize: Show the first tab content on load
    if (tabButtons.length > 0) {
        document.getElementById(tabButtons[0].getAttribute('data-skill') + '-content').classList.add('active');
    }

    // 2. Navigation Active State (Simple Scroll Logic)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if user is past the top of the section, minus a small offset
            if (window.scrollY >= sectionTop - 70) { 
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
});
