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

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillContents = document.querySelectorAll('.skill-content');
    let currentIndex = 0; // Start at the first skill (ETL)
    const intervalTime = 2000; // 2 seconds

    /**
     * Toggles the active state for the clicked/current skill.
     * @param {number} index The index of the skill to make active.
     */
    function showSkill(index) {
        // 1. Remove active class from all tabs and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        skillContents.forEach(content => content.classList.remove('active'));

        // 2. Get the specific tab and content to activate
        const activeTab = tabButtons[index];
        const skillName = activeTab.getAttribute('data-skill');
        const activeContent = document.getElementById(skillName + '-content');

        // 3. Add active class
        activeTab.classList.add('active');
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // 4. Update the index for the next cycle
        currentIndex = index;
    }

    /**
     * Cycles to the next skill, looping back to the first when done.
     */
    function nextSkill() {
        // Calculate the next index (0 -> 1 -> 2 -> ... -> last -> 0)
        const nextIndex = (currentIndex + 1) % tabButtons.length;
        showSkill(nextIndex);
    }

    // --- Event Listeners for Manual Click ---
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Stop the auto-scroll when a user manually clicks a tab
            clearInterval(autoScrollInterval); 
            showSkill(index);
            
            // Optionally, restart the auto-scroll after a short delay
            autoScrollInterval = setInterval(nextSkill, intervalTime);
        });
    });

    // --- Auto-Scroll Logic ---
    // Start the auto-scroll interval
    let autoScrollInterval = setInterval(nextSkill, intervalTime);
});
