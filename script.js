document.addEventListener("DOMContentLoaded", () => {
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('open');

    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('open')) {
    spans[0].style.transform = "rotate(45deg) translateY(8px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
    spans[0].style.transform = "rotate(0)";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "rotate(0)";
    }
});
});

document.querySelectorAll('.sm-filter-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Update Active State
        document.querySelectorAll('.sm-filter-link').forEach(l => l.classList.remove('nx-active'));
        this.classList.add('nx-active');

        // 2. Filter Logic
        const category = this.getAttribute('data-category');
        const projects = document.querySelectorAll('.sm-project-item');

        projects.forEach(project => {
            if (category === 'all' || project.getAttribute('data-type') === category) {
                project.style.display = 'block'; // Show
            } else {
                project.style.display = 'none';  // Hide
            }
        });
    });
});

// 1. Initialize EmailJS
(function() {
    emailjs.init("-FNF9bH5JoMRUy-d8");
})();

// 2. Handle Project Type Buttons
function setProjectType(val, btn) {
    // Update hidden input value
    document.getElementById("project_type").value = val;
    
    // UI: Toggle active class
    const buttons = document.querySelectorAll('.nx-type-btn');
    buttons.forEach(b => b.classList.remove('nx-btn-active'));
    btn.classList.add('nx-btn-active');
}

// 3. Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const statusBox = document.getElementById("formStatus");
    const submitBtn = document.querySelector(".nx-submit-btn");

    // Loading State
    submitBtn.textContent = "SENDING...";
    submitBtn.disabled = true;

    // Prepare Template Parameters
    const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        project_type: document.getElementById("project_type").value,
        message: document.getElementById("message").value,
        subject: "🏛️ New Project Inquiry - SamDoye Architects"
    };

    // Send using your Service ID and Template ID
    emailjs.send("service_vesygbx", "template_rdgrnli", templateParams)
        .then(() => {
            statusBox.textContent = "✅ Message sent successfully!";
            statusBox.style.color = "#2d5a4c";
            statusBox.style.display = "block";
            
            // Reset form
            document.getElementById("contactForm").reset();
            submitBtn.textContent = "SEND MESSAGE";
            submitBtn.disabled = false;
        })
        .catch(err => {
            statusBox.textContent = "❌ Failed to send. Please try again later.";
            statusBox.style.color = "#a94442";
            statusBox.style.display = "block";
            
            submitBtn.textContent = "SEND MESSAGE";
            submitBtn.disabled = false;
            console.error("EmailJS Error:", err);
        });
});

// 4. Hamburger Menu Logic (If not already added)
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('active');
});