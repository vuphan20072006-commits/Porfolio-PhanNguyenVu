/**
 * FILE XỬ LÝ TƯƠNG TÁC JAVASCRIPT (Tiêu chí 13, 14, 15)
 * Tác giả: Phan Nguyên Vũ
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CHẾ ĐỘ SÁNG / TỐI (DARK MODE + LƯU LOCALSTORAGE)
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Kiểm tra chế độ đã lưu trong localStorage
    if (localStorage.getItem('portfolio_theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolio_theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolio_theme', 'light');
        }
    });

    /* ==========================================================================
       2. MENU MOBILE & STICKY HEADER KHI CUỘN TRANG
       ========================================================================== */
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // Đóng menu mobile khi bấm vào 1 mục
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
        });
    });

    window.addEventListener('scroll', () => {
        // Đổi nền Header khi cuộn xuống
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hiện nút Scroll-to-Top
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================================
       3. HIỆU ỨNG GÕ CHỮ (TYPING EFFECT CHO TAGLINE)
       ========================================================================== */
    const typingElement = document.getElementById('typingText');
    const taglines = [
        "I Was In Hell Looking At Heaven.",
        "Building Reliable Networks & Clean Web Apps.",
        "Discipline. Precision. Constant Evolution."
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function runTypingEffect() {
        const currentPhrase = taglines[taglineIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2200; // Dừng lại khi gõ xong câu
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            speed = 400;
        }

        setTimeout(runTypingEffect, speed);
    }
    setTimeout(runTypingEffect, 1500);

    /* ==========================================================================
       4. HIỆU ỨNG ĐẾM SỐ KHI CUỘN ĐẾN (COUNTER ANIMATION)
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 1500;
                    const stepTime = Math.max(Math.floor(duration / target), 25);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += Math.ceil(target / 40);
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = current;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.4 });

    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    /* ==========================================================================
       5. BỘ LỌC DỰ ÁN (PROJECT FILTER - Tiêu chí 14)
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       6. MODAL CHI TIẾT DỰ ÁN
       ========================================================================== */
    const projectDetails = [
        {
            title: "RentFlow – Nền tảng Quản lý Vận hành & Minh bạch Phòng trọ",
            tech: "Công nghệ: HTML5, CSS3, JavaScript, RESTful API",
            desc: "Dự án học phần Công nghệ phần mềm giúp số hóa quy trình tạo phòng, quản lý hợp đồng, chi phí điện nước minh bạch giữa chủ trọ và người thuê.",
            outcome: "Thiết kế thành công hệ thống API tạo phòng và giao diện quản trị trực quan, giảm sai sót tính phí thủ công."
        },
        {
            title: "HexaCall – Truyền phát Video Thời gian thực qua UDP",
            tech: "Công nghệ: Python, OpenCV, JPEG Compression, UDP Socket",
            desc: "Module thu nhận khung hình trực tiếp từ webcam, nén ảnh chuẩn JPEG để tối ưu băng thông và truyền các gói tin qua giao thức UDP.",
            outcome: "Đạt tốc độ khung hình ổn định với độ trễ thấp trong môi trường mạng nội bộ, kiểm chứng hiệu quả cơ chế truyền tải phi kết nối."
        },
        {
            title: "Thiết kế Kiến trúc Mạng WAN Doanh nghiệp Đa chi nhánh",
            tech: "Công nghệ: Cisco IOS, Cisco Packet Tracer, Routing & Switching",
            desc: "Đồ án nghiên cứu và ứng dụng công nghệ WAN kết nối Trụ sở chính (TP.HCM) và Chi nhánh (Hà Nội), phân chia VLAN các phòng ban và kiểm soát truy cập.",
            outcome: "Hoàn thành mô phỏng toàn diện và bảo vệ đồ án thành công cùng nhóm dự án 6 thành viên tại ĐH Giao thông vận tải TP.HCM."
        }
    ];

    const projectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalTech = document.getElementById('modalTech');
    const modalDesc = document.getElementById('modalDesc');
    const modalOutcome = document.getElementById('modalOutcome');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = +btn.getAttribute('data-project');
            const data = projectDetails[idx];
            if (data) {
                modalTitle.textContent = data.title;
                modalTech.textContent = data.tech;
                modalDesc.textContent = data.desc;
                modalOutcome.textContent = data.outcome;
                projectModal.classList.add('open');
            }
        });
    });

    closeModal.addEventListener('click', () => projectModal.classList.remove('open'));
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) projectModal.classList.remove('open');
    });

    /* ==========================================================================
       7. CHUYỂN ĐỔI TABS (CHỨNG CHỈ / GIẢI THƯỞNG / SỞ THÍCH)
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* ==========================================================================
       8. KIỂM TRA DỮ LIỆU FORM LIÊN HỆ (VALIDATION - Tiêu chí 15)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const messageError = document.getElementById('messageError');

        // Xóa thông báo lỗi cũ
        [nameError, emailError, phoneError, messageError].forEach(el => el.textContent = '');
        [fullName, email, phone, message].forEach(el => el.classList.remove('input-error'));
        formStatus.textContent = '';

        let isValid = true;

        // Kiểm tra Họ tên
        if (fullName.value.trim().length < 2) {
            nameError.textContent = 'Vui lòng nhập họ và tên hợp lệ (ít nhất 2 ký tự).';
            fullName.classList.add('input-error');
            isValid = false;
        }

        // Kiểm tra Email bằng biểu thức chính quy (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.textContent = 'Vui lòng nhập đúng định dạng email (ví dụ: ten@gmail.com).';
            email.classList.add('input-error');
            isValid = false;
        }

        // Kiểm tra Số điện thoại Việt Nam (10 chữ số, bắt đầu bằng số 0)
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phoneError.textContent = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.';
            phone.classList.add('input-error');
            isValid = false;
        }

        // Kiểm tra Nội dung tin nhắn
        if (message.value.trim().length < 10) {
            messageError.textContent = 'Nội dung tin nhắn cần tối thiểu 10 ký tự.';
            message.classList.add('input-error');
            isValid = false;
        }

        if (!isValid) return;

        // Hiệu ứng gửi tin nhắn thành công (Theo đúng yêu cầu đề bài)
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
        formStatus.style.color = '#f97316';
        formStatus.textContent = 'Đang gửi tin nhắn của bạn...';

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Gửi thành công';
            formStatus.style.color = '#22c55e';
            formStatus.textContent = 'Gửi thành công! Cảm ơn bạn đã liên hệ với Phan Nguyên Vũ.';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Gửi tin nhắn';
            }, 3000);
        }, 1200);
    });

    // Cập nhật năm hiện tại ở Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});