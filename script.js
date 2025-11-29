/**
 * SCOREMASTER PRO - CORE JAVASCRIPT
 * Version: 3.3.0 (Crop Avatar Update)
 * Architecture: Modular Object Literal Pattern
 * Developer: Gemini AI
 */

// ==========================================
// 1. DEV CONTROL & CONFIG
// ==========================================
const CONFIG = {
    APP_VERSION: '3.3.0 Pro',
    ANIMATION_DURATION: 300,
    TOAST_TIME: 3000,
    NAME_CHANGE_COOLDOWN: 5 * 60 * 1000, // 5 minutes
    MAX_AVATAR_SIZE: 21 * 1024 * 1024, // 21MB
    PASS_SCORE: 4.0,
    DEFAULT_LANG: 'vi',
    // Storage Keys
    KEY_USERS: 'sm_users_v3',
    KEY_SESSION: 'sm_session_v3',
    KEY_GUEST: 'sm_guest_data_v3'
};

// Language Dictionary
const LANG = {
    vi: {
        welcomeTitle: "ScoreMaster",
        welcomeSub: "Hệ thống quản lý điểm số sinh viên",
        loginHeader: "Đăng nhập",
        usernameLabel: "Tên đăng nhập",
        passwordLabel: "Mật khẩu",
        loginBtn: "Đăng nhập",
        guestBtn: "Tiếp tục với vai trò Khách",
        orText: "HOẶC",
        noAccount: "Chưa có tài khoản?",
        registerLink: "Tạo tài khoản mới",
        registerHeader: "Tạo tài khoản",
        regSub: "Tạo tài khoản để lưu trữ dữ liệu lâu dài",
        createAccountBtn: "Đăng Ký Ngay",
        haveAccount: "Đã có tài khoản?",
        loginLink: "Đăng nhập ngay",
        navDashboard: "Tổng quan",
        navCalculator: "Tính điểm",
        navHistory: "Lịch sử",
        navSettings: "Cài đặt",
        dashboardTitle: "Bảng điều khiển",
        totalScoreTitle: "GPA Tích Lũy",
        statPass: "Qua môn",
        statFail: "Rớt môn",
        statCredits: "Tổng Tín Chỉ",
        chartTitle: "Phân bố điểm số (A - F)",
        calcSubjectTitle: "Nhập thông tin môn học",
        subjectNameLabel: "Tên môn học",
        creditsLabel: "Số tín chỉ",
        weightLabel: "Tỷ lệ điểm",
        calcBtn: "Tính kết quả ngay",
        resultTitle: "KẾT QUẢ MÔN HỌC",
        autoSaveNote: "✅ Kết quả đã được tự động lưu.",
        historyTitle: "Lịch sử tính toán",
        searchPlaceholder: "Tìm kiếm môn học...",
        filterAll: "Tất cả",
        filterPass: "Đậu",
        filterFail: "Rớt",
        emptyHistory: "Chưa có dữ liệu nào",
        personalInfo: "Thông tin cá nhân",
        accountName: "Tên đăng nhập",
        changeBtn: "Thay đổi",
        nickname: "Biệt danh (Hiển thị)",
        saveBtn: "Lưu",
        appSettings: "Tùy chỉnh ứng dụng",
        darkMode: "Chế độ Tối (Dark Mode)",
        autoSave: "Tự động lưu điểm",
        language: "Ngôn ngữ / Language",
        changePass: "Bảo mật",
        oldPass: "Mật khẩu hiện tại",
        newPass: "Mật khẩu mới",
        saveChangeBtn: "Cập nhật mật khẩu",
        accountMgmt: "Vùng nguy hiểm",
        logoutBtn: "Đăng xuất",
        deleteAccBtn: "Xóa vĩnh viễn tài khoản",
        gradeA: "Xuất sắc",
        gradeB: "Giỏi",
        gradeC: "Khá/TB",
        gradeD: "Yếu",
        gradeF: "Kém",
        
        // Notifications
        errorEmpty: "Vui lòng điền đầy đủ thông tin!",
        errorLogin: "Sai tên đăng nhập hoặc mật khẩu!",
        successLogin: "Đăng nhập thành công!",
        successReg: "Đăng ký thành công! Hãy đăng nhập.",
        successSave: "Đã lưu thành công!",
        errorCooldown: "Vui lòng đợi 5 phút để đổi tên lại.",
        errorFile: "File quá lớn (>21MB).",
        errorPass: "Mật khẩu cũ không đúng.",
        confirmDelete: "Bạn có chắc chắn muốn xóa tài khoản này? Dữ liệu sẽ mất vĩnh viễn."
    },
    en: {
        welcomeTitle: "ScoreMaster",
        welcomeSub: "Student GPA Management System",
        loginHeader: "Login",
        usernameLabel: "Username",
        passwordLabel: "Password",
        loginBtn: "Login",
        guestBtn: "Continue as Guest",
        orText: "OR",
        noAccount: "No account?",
        registerLink: "Create new account",
        registerHeader: "Create Account",
        regSub: "Sign up to save your data permanently",
        createAccountBtn: "Sign Up Now",
        haveAccount: "Have an account?",
        loginLink: "Login now",
        navDashboard: "Dashboard",
        navCalculator: "Calculator",
        navHistory: "History",
        navSettings: "Settings",
        dashboardTitle: "Dashboard",
        totalScoreTitle: "Cumulative GPA",
        statPass: "Passed",
        statFail: "Failed",
        statCredits: "Total Credits",
        chartTitle: "Grade Distribution (A - F)",
        calcSubjectTitle: "Subject Information",
        subjectNameLabel: "Subject Name",
        creditsLabel: "Credits",
        weightLabel: "Weight Ratio",
        calcBtn: "Calculate Now",
        resultTitle: "SUBJECT RESULT",
        autoSaveNote: "✅ Result automatically saved.",
        historyTitle: "Calculation History",
        searchPlaceholder: "Search subjects...",
        filterAll: "All",
        filterPass: "Passed",
        filterFail: "Failed",
        emptyHistory: "No data available",
        personalInfo: "Personal Info",
        accountName: "Username",
        changeBtn: "Change",
        nickname: "Nickname (Display)",
        saveBtn: "Save",
        appSettings: "App Preferences",
        darkMode: "Dark Mode",
        autoSave: "Auto Save Results",
        language: "Language",
        changePass: "Security",
        oldPass: "Current Password",
        newPass: "New Password",
        saveChangeBtn: "Update Password",
        accountMgmt: "Danger Zone",
        logoutBtn: "Log Out",
        deleteAccBtn: "Delete Account Permanently",
        gradeA: "Excellent",
        gradeB: "Good",
        gradeC: "Average",
        gradeD: "Poor",
        gradeF: "Fail",

        // Notifications
        errorEmpty: "Please fill all fields!",
        errorLogin: "Invalid username or password!",
        successLogin: "Login Successful!",
        successReg: "Registered! Please login.",
        successSave: "Saved successfully!",
        errorCooldown: "Please wait 5 mins to rename.",
        errorFile: "File too big (>21MB).",
        errorPass: "Incorrect old password.",
        confirmDelete: "Are you sure? This cannot be undone."
    }
};

// ==========================================
// 2. STORAGE MANAGER
// ==========================================
const Storage = {
    getUsers: () => {
        try {
            return JSON.parse(localStorage.getItem(CONFIG.KEY_USERS)) || [];
        } catch (e) { return []; }
    },
    
    saveUsers: (users) => {
        localStorage.setItem(CONFIG.KEY_USERS, JSON.stringify(users));
    },

    getUserById: (id) => {
        if (id === 'guest') return Storage.getGuestProfile();
        const users = Storage.getUsers();
        return users.find(u => u.id === id);
    },

    setSession: (id) => localStorage.setItem(CONFIG.KEY_SESSION, id),
    getSession: () => localStorage.getItem(CONFIG.KEY_SESSION),
    clearSession: () => localStorage.removeItem(CONFIG.KEY_SESSION),

    updateCurrentUser: (user) => {
        if (user.id === 'guest') {
            sessionStorage.setItem(CONFIG.KEY_GUEST, JSON.stringify(user));
            return;
        }
        const users = Storage.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            Storage.saveUsers(users);
        }
    },

    getGuestProfile: () => {
        const saved = sessionStorage.getItem(CONFIG.KEY_GUEST);
        if (saved) return JSON.parse(saved);
        return {
            id: 'guest', username: 'Guest', nickname: 'Student',
            password: '', avatar: 'images/DefaultProfilePic.jpg',
            history: [], 
            folders: [],
            settings: { 
                theme: 'light', lang: 'vi', autoSave: false,
                dashboardSource: 'all'
            },
            createdAt: Date.now()
        };
    }
};

// ==========================================
// 3. AUTHENTICATION SYSTEM
// ==========================================
const Auth = {
    currentUser: null,

    init: () => {
        const sessionId = Storage.getSession();
        if (sessionId) {
            const user = Storage.getUserById(sessionId);
            if (user) {
                App.loadUser(user);
            } else {
                Storage.clearSession();
                UI.showAuth();
            }
        } else {
            UI.showAuth();
        }
    },

    register: (username, password) => {
        if (!username || !password) return UI.toast('error', 'errorEmpty');
        
        const newUser = {
            id: 'user_' + Date.now() + Math.floor(Math.random()*1000),
            username: username,
            password: password,
            nickname: username,
            avatar: 'images/DefaultProfilePic.jpg',
            createdAt: Date.now(),
            lastRenamed: 0,
            history: [],
            folders: [],
            settings: { theme: 'light', lang: 'vi', autoSave: false, dashboardSource: 'all' }
        };

        const users = Storage.getUsers();
        users.push(newUser);
        Storage.saveUsers(users);
        
        UI.toast('success', 'successReg');
        UI.switchAuth('login');
        document.getElementById('login-username').value = username;
    },

    login: (username, password) => {
        const users = Storage.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            Storage.setSession(user.id);
            App.loadUser(user);
            UI.toast('success', 'successLogin');
        } else {
            UI.toast('error', 'errorLogin');
        }
    },

    loginGuest: () => {
        const guest = Storage.getGuestProfile();
        App.currentUser = guest;
        App.loadUser(guest);
        UI.toast('info', 'Guest Mode Active');
    },

    logout: () => {
        Storage.clearSession();
        location.reload();
    },

    deleteAccount: () => {
        if(App.currentUser.id === 'guest') return;
        const lang = App.currentUser.settings.lang;
        if(confirm(LANG[lang].confirmDelete)) {
            const users = Storage.getUsers().filter(u => u.id !== App.currentUser.id);
            Storage.saveUsers(users);
            Auth.logout();
        }
    },

    changePassword: (oldPass, newPass) => {
        if(App.currentUser.password !== oldPass) return UI.toast('error', 'errorPass');
        App.currentUser.password = newPass;
        Storage.updateCurrentUser(App.currentUser);
        UI.toast('success', 'successSave');
        document.getElementById('old-pass').value = '';
        document.getElementById('new-pass').value = '';
    }
};

// ==========================================
// 4. CALCULATOR LOGIC
// ==========================================
const Calculator = {
    calculateSubjectScore: (inputs, type) => {
        let score = 0;
        let valid = true;
        inputs.forEach(val => { if (isNaN(val) || val < 0 || val > 10) valid = false; });
        if (!valid) return null;

        const weights = {
            '5:5': [0.5, 0.5],
            '4:6': [0.4, 0.6],
            '3:7': [0.3, 0.7],
            '2:3:5': [0.2, 0.3, 0.5],
            '100': [1.0]
        };
        
        const w = weights[type];
        score = inputs.reduce((acc, val, idx) => acc + (val * w[idx]), 0);
        return Math.round(score * 100) / 100;
    },

    getGrade: (score) => {
        if (score >= 9.0) return 'A+';
        if (score >= 8.5) return 'A';
        if (score >= 8.0) return 'B+';
        if (score >= 7.0) return 'B';
        if (score >= 6.5) return 'C+';
        if (score >= 5.5) return 'C';
        if (score >= 5.0) return 'D+';
        if (score >= 4.0) return 'D';
        return 'F';
    },

    convertToScale4: (score) => {
        if (score >= 8.5) return 4.0; 
        if (score >= 7.0) return 3.0; 
        if (score >= 5.5) return 2.0; 
        if (score >= 4.0) return 1.0; 
        return 0.0;
    },

    calculateGPA: (history) => {
        if (!history || history.length === 0) return { scale10: "0.00", scale4: "0.00" };
        
        let totalPoints10 = 0;
        let totalPoints4 = 0;
        let totalCredits = 0;

        history.forEach(item => {
            const score10 = parseFloat(item.score);
            const score4 = Calculator.convertToScale4(score10);
            const cred = parseInt(item.credits) || 0; 
            
            totalPoints10 += score10 * cred;
            totalPoints4 += score4 * cred;
            totalCredits += cred;
        });

        if (totalCredits === 0) return { scale10: "0.00", scale4: "0.00" };
        
        return {
            scale10: (totalPoints10 / totalCredits).toFixed(2),
            scale4: (totalPoints4 / totalCredits).toFixed(2)
        };
    }
};

// ==========================================
// 5. UI MANAGER & CHARTS
// ==========================================
const UI = {
    chartInstances: {},

    showAuth: () => {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-screen').style.display = 'none';
    },

    switchAuth: (type) => {
        if (type === 'register') {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('register-form').classList.add('fade-in-up');
        } else {
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('login-form').classList.add('fade-in-up');
        }
    },

    toast: (type, msgKey) => {
        const lang = App.currentUser ? App.currentUser.settings.lang : 'vi';
        const msg = LANG[lang][msgKey] || msgKey; 
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '';
        if(type==='success') icon = '✅';
        if(type==='error') icon = '⛔';
        if(type==='info') icon = 'ℹ️';

        toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.TOAST_TIME);
    },

    renderInputs: (type) => {
        const container = document.getElementById('dynamic-inputs');
        container.innerHTML = '';
        
        const labels = {
            '5:5': ['Quá trình (50%)', 'Cuối kỳ (50%)'],
            '4:6': ['Quá trình (40%)', 'Cuối kỳ (60%)'],
            '3:7': ['Quá trình (30%)', 'Cuối kỳ (70%)'],
            '2:3:5': ['Chuyên cần (20%)', 'Giữa kỳ (30%)', 'Cuối kỳ (50%)'],
            '100': ['Điểm tổng kết (100%)']
        };

        labels[type].forEach((label, idx) => {
            const div = document.createElement('div');
            div.className = 'input-wrapper';
            div.innerHTML = `
                <input type="number" class="calc-input" step="0.1" min="0" max="10" placeholder=" ">
                <label>${label}</label>
            `;
            container.appendChild(div);
        });
    },

    renderHistory: (history, filter = 'all', dateFilter = null, folderFilterId = null) => {
        const container = document.getElementById('history-list');
        container.innerHTML = '';
        
        let filtered = history.filter(h => {
            if (filter === 'pass') return h.score >= 4.0;
            if (filter === 'fail') return h.score < 4.0;
            return true;
        });

        if (dateFilter) {
            filtered = filtered.filter(h => new Date(h.date).toISOString().split('T')[0] === dateFilter);
        }

        if (folderFilterId && folderFilterId !== 'all') {
            const folder = App.currentUser.folders.find(f => f.id === folderFilterId);
            if (folder) {
                filtered = filtered.filter(h => folder.items.includes(h.id));
            }
        }
        
        filtered.sort((a, b) => b.date - a.date);

        if (filtered.length === 0) {
            const lang = App.currentUser ? App.currentUser.settings.lang : 'vi';
            container.innerHTML = `<div class="empty-state"><p>${LANG[lang].emptyHistory}</p></div>`;
            return;
        }

        filtered.forEach(item => {
            const dateStr = new Date(item.date).toLocaleDateString();
            const isPass = item.score >= 4.0;
            const statusClass = isPass ? 'pass' : 'fail';
            
            const div = document.createElement('div');
            div.className = 'history-item';
            div.setAttribute('data-id', item.id);
            
            const isChecked = App.selectedItems && App.selectedItems.has(item.id) ? 'checked' : '';
            if (isChecked) div.classList.add('selected');

            div.innerHTML = `
                <div class="col-check">
                    <input type="checkbox" class="custom-checkbox item-checkbox" ${isChecked} onclick="event.stopPropagation(); App.toggleSelection(${item.id})">
                </div>
                <div class="col-sub">
                    <div style="font-weight:700;">${item.subject || 'Subject'}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted)">${dateStr}</div>
                </div>
                <div class="col-type">
                    <span class="h-type">${item.type || 'N/A'}</span>
                </div>
                <div class="col-cred" style="font-weight:600;">${item.credits} TC</div>
                <div class="col-score h-score ${statusClass}">${item.score}</div>
                <div class="col-act">
                    <button class="btn-icon-sm" onclick="event.stopPropagation(); App.deleteHistoryItem(${item.id})">🗑️</button>
                </div>
            `;
            div.onclick = (e) => {
                if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                    div.querySelector('.item-checkbox').click();
                }
            };
            container.appendChild(div);
        });
    },

    updateDashboard: (history) => {
        let count = 0, pass = 0, fail = 0, totalCredits = 0;
        let gradeDist = { 'A':0, 'B':0, 'C':0, 'D':0, 'F':0 };
        
        history.forEach(h => {
            const sc = parseFloat(h.score);
            const cr = parseInt(h.credits) || 0;
            count++;
            totalCredits += cr;
            
            if (sc >= 4.0) pass++; else fail++;
            
            let g = 'F';
            if(sc >= 8.5) g = 'A';
            else if(sc >= 7.0) g = 'B';
            else if(sc >= 5.5) g = 'C';
            else if(sc >= 4.0) g = 'D';
            
            gradeDist[g]++;
        });

        const gpaData = Calculator.calculateGPA(history);
        
        UI.animateValue('dash-gpa-10', parseFloat(document.getElementById('dash-gpa-10').innerText), parseFloat(gpaData.scale10), 1000);
        UI.animateValue('dash-gpa-4', parseFloat(document.getElementById('dash-gpa-4').innerText), parseFloat(gpaData.scale4), 1000);

        document.getElementById('dash-pass-count').innerText = pass;
        document.getElementById('dash-fail-count').innerText = fail;
        document.getElementById('dash-total-credits').innerText = totalCredits;
        
        let rank = "Chưa xếp loại";
        const gpa4 = parseFloat(gpaData.scale4);
        const lang = App.currentUser.settings.lang;
        if (count > 0) {
            if (gpa4 >= 3.6) rank = LANG[lang].gradeA;
            else if (gpa4 >= 3.2) rank = LANG[lang].gradeB;
            else if (gpa4 >= 2.5) rank = LANG[lang].gradeC;
            else if (gpa4 >= 2.0) rank = LANG[lang].gradeD;
            else rank = LANG[lang].gradeF;
        }
        document.getElementById('dash-ranking').innerText = rank;

        UI.drawCharts(gradeDist, history);
    },

    animateValue: (id, start, end, duration) => {
        if (start === end) return;
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = (progress * (end - start) + start).toFixed(2);
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    },

    drawCharts: (distData, history) => {
        const ctx1 = document.getElementById('scoreDistributionChart').getContext('2d');
        if (UI.chartInstances.pie) UI.chartInstances.pie.destroy();
        
        const themeColors = document.body.getAttribute('data-theme') === 'dark' 
            ? ['#10B981', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'] 
            : ['#10B981', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'];

        UI.chartInstances.pie = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['A (Giỏi)', 'B (Khá)', 'C (TB)', 'D (Yếu)', 'F (Rớt)'],
                datasets: [{
                    data: [distData.A, distData.B, distData.C, distData.D, distData.F],
                    backgroundColor: themeColors,
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { legend: { position: 'right', labels: { color: 'var(--text-main)' } } },
                cutout: '65%'
            }
        });
    },

    updateText: () => {
        const lang = App.currentUser.settings.lang;
        const dict = LANG[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(dict[key]) el.innerText = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if(dict[key]) el.placeholder = dict[key];
        });
    },

    hideResult: () => document.getElementById('calc-result').classList.add('hidden'),

    setResultCircle: (score) => {
        const circle = document.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const percent = score / 10;
        const offset = circumference - (percent * circumference);
        circle.style.strokeDashoffset = offset;
    }
};

// ==========================================
// 6. MAIN CONTROLLER
// ==========================================
const App = {
    currentUser: null,
    selectedItems: new Set(),
    cropper: null, // Cropper Instance

    loadUser: (user) => {
        App.currentUser = user;
        if(!App.currentUser.folders) App.currentUser.folders = [];
        if(!App.currentUser.settings.dashboardSource) App.currentUser.settings.dashboardSource = 'all';

        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        
        App.syncUI();
        UI.updateText(); 
        
        document.querySelector('.nav-item[data-target="dashboard"]').click();
        UI.renderInputs('5:5');

        document.getElementById('current-date').innerText = new Date().toLocaleDateString(user.settings.lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    },

    syncUI: () => {
        const u = App.currentUser;
        
        document.getElementById('mini-avatar').src = u.avatar;
        document.getElementById('settings-avatar').src = u.avatar;
        document.getElementById('mini-nickname').innerText = u.nickname;
        document.getElementById('mini-username').innerText = '@' + u.username;
        document.getElementById('set-username').value = u.username;
        document.getElementById('set-nickname').value = u.nickname;

        document.getElementById('toggle-theme').checked = (u.settings.theme === 'dark');
        document.body.setAttribute('data-theme', u.settings.theme);
        document.getElementById('toggle-autosave').checked = u.settings.autoSave;
        
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.lang-btn[data-lang="${u.settings.lang}"]`).classList.add('active');
        
        let displayHistory = u.history;
        let sourceName = "Tất cả";
        
        if (u.settings.dashboardSource && u.settings.dashboardSource !== 'all') {
            const folder = u.folders ? u.folders.find(f => f.id === u.settings.dashboardSource) : null;
            if (folder) {
                displayHistory = u.history.filter(h => folder.items.includes(h.id));
                sourceName = folder.name;
            } else {
                u.settings.dashboardSource = 'all';
                Storage.updateCurrentUser(u);
            }
        }
        document.getElementById('dashboard-source-label').innerText = `📁 Nguồn: ${sourceName}`;

        UI.updateDashboard(displayHistory);
        UI.renderHistory(u.history);
        App.renderFolders();
    },

    togglePassword: (id) => {
        const input = document.getElementById(id);
        input.type = input.type === 'password' ? 'text' : 'password';
    },

    // --- CROP AVATAR LOGIC (NEW) ---
    openCropModal: (imageSrc) => {
        const modal = document.getElementById('crop-modal');
        const imgElement = document.getElementById('crop-image');
        
        modal.classList.remove('hidden');
        imgElement.src = imageSrc;

        if (App.cropper) {
            App.cropper.destroy();
        }

        App.cropper = new Cropper(imgElement, {
            aspectRatio: 1, // Vuông
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
        });
    },

    closeCropModal: () => {
        document.getElementById('crop-modal').classList.add('hidden');
        if (App.cropper) {
            App.cropper.destroy();
            App.cropper = null;
        }
        document.getElementById('avatar-input').value = ''; 
    },

    saveCrop: () => {
        if (!App.cropper) return;

        // Resize xuống 256x256 để nhẹ
        const canvas = App.cropper.getCroppedCanvas({
            width: 256,
            height: 256,
            imageSmoothingQuality: 'high'
        });

        const base64Image = canvas.toDataURL('image/png');
        App.handleSaveAvatar(base64Image);
        App.closeCropModal();
    },

    handleSaveAvatar: (base64Data) => {
        try {
            App.currentUser.avatar = base64Data;
            Storage.updateCurrentUser(App.currentUser);
            App.syncUI();
            UI.toast('success', 'successSave');
        } catch (e) {
            console.error(e);
            UI.toast('error', 'Ảnh quá lớn so với bộ nhớ trình duyệt!');
        }
    },

    // --- FOLDER LOGIC ---
    renderFolders: () => {
        const container = document.getElementById('folder-container');
        container.innerHTML = '';
        const folders = App.currentUser.folders || [];
        const currentSource = App.currentUser.settings.dashboardSource || 'all';

        const allDiv = document.createElement('div');
        allDiv.className = `folder-card ${currentSource === 'all' ? 'active' : ''}`;
        allDiv.onclick = (e) => {
            if(!e.target.closest('.btn-folder-act')) App.setDashboardSource('all');
        };
        allDiv.innerHTML = `
            <div class="folder-icon">🗄️</div>
            <div class="folder-name">Tất cả</div>
            <div class="folder-info">${App.currentUser.history.length} mục</div>
            ${currentSource === 'all' ? '<span class="is-pinned">★</span>' : ''}
        `;
        container.appendChild(allDiv);

        folders.forEach(f => {
            const div = document.createElement('div');
            div.className = `folder-card ${currentSource === f.id ? 'active' : ''}`;
            const validItems = f.items.filter(id => App.currentUser.history.find(h => h.id === id));
            
            div.innerHTML = `
                <div class="folder-icon">📁</div>
                <div class="folder-name" title="${f.name}">${f.name}</div>
                <div class="folder-info">${validItems.length} mục</div>
                ${currentSource === f.id ? '<span class="is-pinned">★</span>' : ''}
                
                <div class="folder-actions">
                    <button class="btn-folder-act" onclick="App.renameFolder('${f.id}')" title="Đổi tên">✏️</button>
                    <button class="btn-folder-act" onclick="App.setDashboardSource('${f.id}')" title="Ghim lên Dashboard">📌</button>
                    <button class="btn-folder-act" style="color:red" onclick="App.deleteFolder('${f.id}')" title="Xóa Folder">✕</button>
                </div>
            `;
            div.onclick = (e) => {
                if (e.target.closest('.btn-folder-act')) return;
                UI.renderHistory(App.currentUser.history, 'all', null, f.id);
                document.querySelectorAll('.folder-card').forEach(c => c.style.opacity = '0.6');
                div.style.opacity = '1';
            };
            container.appendChild(div);
        });
    },

    createFolder: () => {
        if (App.selectedItems.size === 0) return UI.toast('error', 'Vui lòng chọn ít nhất 1 môn!');
        
        const name = prompt("Nhập tên thư mục (VD: HK1 Năm 1):");
        if (!name) return;

        const newFolder = {
            id: 'folder_' + Date.now(),
            name: name,
            items: Array.from(App.selectedItems),
            createdAt: Date.now()
        };

        if (!App.currentUser.folders) App.currentUser.folders = [];
        App.currentUser.folders.push(newFolder);
        
        App.cancelSelection();
        Storage.updateCurrentUser(App.currentUser);
        App.renderFolders();
        UI.toast('success', 'Đã tạo thư mục thành công!');
    },

    renameFolder: (id) => {
        const folder = App.currentUser.folders.find(f => f.id === id);
        if (!folder) return;
        const newName = prompt("Tên mới:", folder.name);
        if (newName) {
            folder.name = newName;
            Storage.updateCurrentUser(App.currentUser);
            App.renderFolders();
        }
    },

    deleteFolder: (id) => {
        if (!confirm("Xóa thư mục này? (Dữ liệu điểm sẽ KHÔNG bị xóa)")) return;
        App.currentUser.folders = App.currentUser.folders.filter(f => f.id !== id);
        if (App.currentUser.settings.dashboardSource === id) {
            App.currentUser.settings.dashboardSource = 'all';
        }
        Storage.updateCurrentUser(App.currentUser);
        App.renderFolders();
        App.syncUI(); 
    },

    setDashboardSource: (sourceId) => {
        App.currentUser.settings.dashboardSource = sourceId;
        Storage.updateCurrentUser(App.currentUser);
        App.syncUI();
        UI.toast('success', 'Đã cập nhật nguồn dữ liệu Dashboard!');
    },

    // --- SELECTION LOGIC ---
    toggleSelection: (id) => {
        if (App.selectedItems.has(id)) App.selectedItems.delete(id);
        else App.selectedItems.add(id);
        App.updateSelectionUI();
    },

    toggleSelectAll: (checked) => {
        const visibleRows = document.querySelectorAll('.history-item');
        visibleRows.forEach(row => {
            const id = parseInt(row.getAttribute('data-id'));
            const cb = row.querySelector('.item-checkbox');
            if (checked) {
                App.selectedItems.add(id);
                cb.checked = true;
            } else {
                App.selectedItems.delete(id);
                cb.checked = false;
            }
        });
        App.updateSelectionUI();
    },

    updateSelectionUI: () => {
        const count = App.selectedItems.size;
        document.getElementById('sel-count').innerText = count;
        const bar = document.getElementById('selection-action-bar');
        
        if (count > 0) bar.classList.remove('hidden');
        else bar.classList.add('hidden');

        document.querySelectorAll('.history-item').forEach(row => {
            const id = parseInt(row.getAttribute('data-id'));
            if (App.selectedItems.has(id)) row.classList.add('selected');
            else row.classList.remove('selected');
        });
    },

    cancelSelection: () => {
        App.selectedItems.clear();
        document.getElementById('check-all-history').checked = false;
        document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
        App.updateSelectionUI();
    },
    
    deleteMulti: () => {
        if (!confirm(`Xóa ${App.selectedItems.size} mục đã chọn?`)) return;
        App.currentUser.history = App.currentUser.history.filter(h => !App.selectedItems.has(h.id));
        if(App.currentUser.folders) {
            App.currentUser.folders.forEach(f => {
                f.items = f.items.filter(id => !App.selectedItems.has(id));
            });
        }
        Storage.updateCurrentUser(App.currentUser);
        App.cancelSelection();
        App.syncUI();
    },

    // --- EVENT BINDING ---
    initEvents: () => {
        document.getElementById('btn-login').onclick = () => Auth.login(document.getElementById('login-username').value, document.getElementById('login-password').value);
        document.getElementById('btn-register').onclick = () => Auth.register(document.getElementById('reg-username').value, document.getElementById('reg-password').value);
        document.getElementById('btn-guest').onclick = Auth.loginGuest;
        
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
                document.getElementById(btn.dataset.target).classList.add('active');
                document.querySelector('.sidebar').classList.remove('open');
            };
        });

        document.getElementById('mobile-menu-btn').onclick = () => document.querySelector('.sidebar').classList.toggle('open');
        document.getElementById('btn-logout-mini').onclick = Auth.logout;

        document.getElementById('weight-select').onchange = (e) => UI.renderInputs(e.target.value);
        document.getElementById('btn-reset-calc').onclick = () => {
            document.querySelectorAll('.calc-input').forEach(i => i.value = '');
            document.getElementById('subject-name').value = '';
            UI.hideResult();
        };

        document.getElementById('btn-calc-now').onclick = () => {
            const inputs = Array.from(document.querySelectorAll('.calc-input')).map(i => parseFloat(i.value));
            const weightType = document.getElementById('weight-select').value;
            const subName = document.getElementById('subject-name').value;
            const credits = parseInt(document.getElementById('subject-credits').value) || 3;
            
            const result = Calculator.calculateSubjectScore(inputs, weightType);
            
            if (result === null) {
                UI.toast('error', 'errorEmpty'); 
                return;
            }

            const resBox = document.getElementById('calc-result');
            resBox.classList.remove('hidden');
            
            UI.animateValue('res-score-number', 0, result, 500);
            UI.setResultCircle(result);
            
            const letterGrade = Calculator.getGrade(result);
            document.getElementById('res-grade-text').innerText = `Điểm: ${letterGrade} (${result})`;

            const isPass = result >= CONFIG.PASS_SCORE;
            const statusEl = document.getElementById('res-status-text');
            const lang = App.currentUser.settings.lang;
            statusEl.innerText = isPass ? LANG[lang].statPass.toUpperCase() : LANG[lang].statFail.toUpperCase();
            statusEl.className = `status-badge ${isPass ? 'pass' : 'fail'}`;
            
            if (isPass) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

            if (App.currentUser.settings.autoSave) {
                App.saveHistory(subName || `Subject ${Date.now()}`, result, credits, weightType);
                document.getElementById('autosave-note').style.display = 'block';
            } else {
                document.getElementById('autosave-note').style.display = 'none';
            }
        };

        document.getElementById('check-all-history').onclick = (e) => App.toggleSelectAll(e.target.checked);
        document.getElementById('btn-create-folder').onclick = App.createFolder;
        document.getElementById('btn-delete-multi').onclick = App.deleteMulti;
        document.getElementById('btn-cancel-sel').onclick = App.cancelSelection;

        document.getElementById('btn-change-username').onclick = () => {
            const newName = prompt(LANG[App.currentUser.settings.lang].accountName + ":");
            if (!newName) return;
            const now = Date.now();
            if (now - App.currentUser.lastRenamed < CONFIG.NAME_CHANGE_COOLDOWN) {
                UI.toast('error', 'errorCooldown');
                return;
            }
            App.currentUser.username = newName;
            App.currentUser.lastRenamed = now;
            Storage.updateCurrentUser(App.currentUser);
            App.syncUI();
            UI.toast('success', 'successSave');
        };

        document.getElementById('btn-save-nick').onclick = () => {
            App.currentUser.nickname = document.getElementById('set-nickname').value;
            Storage.updateCurrentUser(App.currentUser);
            App.syncUI();
            UI.toast('success', 'successSave');
        };

        document.getElementById('btn-change-pass').onclick = () => {
            const oldP = document.getElementById('old-pass').value;
            const newP = document.getElementById('new-pass').value;
            if(oldP && newP) Auth.changePassword(oldP, newP);
            else UI.toast('error', 'errorEmpty');
        };

        // --- UPDATED AVATAR HANDLER ---
        document.getElementById('avatar-input').onchange = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > CONFIG.MAX_AVATAR_SIZE) return UI.toast('error', 'errorFile');
            
            const reader = new FileReader();
            reader.onload = function(evt) {
                const result = evt.target.result;
                if (file.type === 'image/gif') {
                    // GIF: Save directly to keep animation
                    App.handleSaveAvatar(result);
                } else {
                    // Static image: Open Crop Modal
                    App.openCropModal(result);
                }
            };
            reader.readAsDataURL(file);
        };

        document.getElementById('toggle-theme').onchange = (e) => {
            App.currentUser.settings.theme = e.target.checked ? 'dark' : 'light';
            Storage.updateCurrentUser(App.currentUser);
            document.body.setAttribute('data-theme', App.currentUser.settings.theme);
            UI.updateDashboard(App.currentUser.history); 
        };
        
        document.getElementById('toggle-autosave').onchange = (e) => {
            App.currentUser.settings.autoSave = e.target.checked;
            Storage.updateCurrentUser(App.currentUser);
        };

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.onclick = () => {
                App.currentUser.settings.lang = btn.dataset.lang;
                Storage.updateCurrentUser(App.currentUser);
                App.syncUI();
                UI.updateText();
            };
        });

        document.getElementById('history-search').onkeyup = (e) => {
             const term = e.target.value.toLowerCase();
             const filtered = App.currentUser.history.filter(h => 
                 (h.subject && h.subject.toLowerCase().includes(term)) || h.score.toString().includes(term)
             );
             UI.renderHistory(filtered);
        };

        document.querySelectorAll('.filter-chip').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                UI.renderHistory(App.currentUser.history, btn.dataset.filter);
            };
        });
        
        document.getElementById('history-date-filter').onchange = (e) => {
            UI.renderHistory(App.currentUser.history, 'all', e.target.value);
        };
        
        document.getElementById('btn-clear-date').onclick = () => {
            document.getElementById('history-date-filter').value = '';
            UI.renderHistory(App.currentUser.history);
        };
    },

    saveHistory: (subject, score, credits, type) => {
        const newItem = { 
            id: Date.now(), 
            subject, 
            score, 
            credits, 
            type,
            date: Date.now() 
        };
        App.currentUser.history.unshift(newItem);
        Storage.updateCurrentUser(App.currentUser);
        App.syncUI();
    },

    deleteHistoryItem: (id) => {
        if(confirm("Delete this item?")) {
            App.currentUser.history = App.currentUser.history.filter(h => h.id !== id);
            if(App.currentUser.folders) {
                App.currentUser.folders.forEach(f => {
                    f.items = f.items.filter(itemId => itemId !== id);
                });
            }
            Storage.updateCurrentUser(App.currentUser);
            App.syncUI();
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    App.initEvents();
    Auth.init();
});