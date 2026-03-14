let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

// ===== SKILLS ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-bar-fill');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const inView = rect.top < window.innerHeight - 60;
        if (inView && !bar.classList.contains('animated')) {
            const target = bar.getAttribute('data-width');
            bar.style.width = target + '%';
            bar.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// ===== HIRE ME - DOWNLOAD CV =====
// ⚠️ ضع رابط الـ CV الحقيقي هنا بدل الرابط الوهمي
const CV_URL = 'Ahmed_Mohamed_El-Metwally_CV.pdf';

document.querySelectorAll('.btn-box .btn').forEach(btn => {
    if (btn.textContent.trim() === 'Hire Me') {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = CV_URL;
            link.download = 'Ahmed_Mohamed_CV.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    if (btn.textContent.trim() === "Let's Talk") {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const whatsappNumber = '201097914092';
            const message = encodeURIComponent("Hello Ahmed! I'd like to talk with you.");
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }
});

// ===== CONTACT FORM - Send via WhatsApp =====
const contactForm = document.querySelector('.contact form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input');
        const textarea = contactForm.querySelector('textarea');

        const fullName  = inputs[0].value.trim();
        const emailFrom = inputs[1].value.trim();
        const mobile    = inputs[2].value.trim();
        const subject   = inputs[3].value.trim();
        const message   = textarea.value.trim();

        if (!fullName || !emailFrom || !mobile || !subject || !message) {
            showToast('⚠️ Please fill in all fields.', 'warning');
            return;
        }

        const whatsappNumber = '201097914092';
        const text = 
`👤 Name: ${fullName}
📧 Email: ${emailFrom}
📱 Mobile: ${mobile}
📌 Subject: ${subject}
💬 Message: ${message}`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');

        showToast('✅ Opening WhatsApp...', 'success');
        contactForm.reset();
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'success') {
    let toast = document.getElementById('toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-msg';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 14px 24px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            color: #fff;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.4s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(toast);
    }

    const colors = { success: '#00c853', warning: '#ff8f00', error: '#d32f2f' };
    toast.style.background = colors[type] || '#333';
    toast.textContent = msg;
    toast.style.opacity = '1';

    setTimeout(() => { toast.style.opacity = '0'; }, 4000);
}
