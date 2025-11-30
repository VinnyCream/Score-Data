/**
 * SCOREMASTER PRO - CLOUD EDITION (FULL SYNC)
 * Version: 7.2.0 (Search & Persistence)
 * Fixes: LocalStorage for persistent login, Admin Search
 */

// ==================================================================
// 1. CẤU HÌNH & KẾT NỐI SUPABASE
// ==================================================================
// --- THAY API KEY CỦA BẠN VÀO ĐÂY ---
const SUPABASE_URL = 'https://kmubgycopkzhdnjtcvma.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_F2EW-fWUGN5z7zw02BlTEw_iSfU7ohe'; 

// Khởi tạo Client Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const CONFIG = {
    APP_VERSION: '7.2.0 Cloud',
    ANIMATION_DURATION: 300,
    TOAST_TIME: 3000,
    NAME_CHANGE_COOLDOWN: 5 * 60 * 1000, 
    MAX_AVATAR_SIZE: 3 * 1024 * 1024, // Giới hạn 3MB để upload nhanh hơn
    PASS_SCORE: 4.0,
    KEY_SESSION: 'sm_cloud_session_id', // Key for LocalStorage
    KEY_GUEST: 'sm_guest_data_v4',
    DEFAULT_SCALE: 'HUFLIT',
    ADMIN_USERNAME: 'Admin' // Tên tài khoản Admin
};

// ==================================================================
// 2. LOGIC TÍNH ĐIỂM (GRADING RULES)
// ==================================================================
const GRADING_RULES = {
    'HUFLIT': {
        name: "ĐH Ngoại ngữ - Tin Học (HUFLIT)",
        get: (score) => {
            let grade = 'F', gpa = 0.0;
            if (score >= 9.0) grade = 'A+';
            else if (score >= 8.5) grade = 'A';
            else if (score >= 8.0) grade = 'B+';
            else if (score >= 7.0) grade = 'B';
            else if (score >= 6.5) grade = 'C+';
            else if (score >= 5.5) grade = 'C';
            else if (score >= 5.0) grade = 'D+';
            else if (score >= 4.0) grade = 'D';
            
            if (score >= 8.5) gpa = 4.0;
            else if (score >= 7.0) gpa = 3.0;
            else if (score >= 5.5) gpa = 2.0;
            else if (score >= 4.0) gpa = 1.0;
            return { grade, gpa };
        }
    },
    'HUIT': {
        name: "ĐH Công thương (HUIT)",
        get: (score) => {
            let grade = 'F', gpa = 0.0;
            if (score >= 8.5) { grade = 'A'; gpa = 4.0; }
            else if (score >= 8.0) { grade = 'B+'; gpa = 3.5; }
            else if (score >= 7.0) { grade = 'B'; gpa = 3.0; }
            else if (score >= 6.5) { grade = 'C+'; gpa = 2.5; }
            else if (score >= 5.5) { grade = 'C'; gpa = 2.0; }
            else if (score >= 5.0) { grade = 'D+'; gpa = 1.5; }
            else if (score >= 4.0) { grade = 'D'; gpa = 1.0; }
            return { grade, gpa };
        }
    }
};

const LANG = {
    vi: {
        welcomeTitle: "ScoreMaster", welcomeSub: "Hệ thống quản lý điểm số sinh viên", loginHeader: "Đăng nhập", usernameLabel: "Tên đăng nhập", passwordLabel: "Mật khẩu", loginBtn: "Đăng nhập", guestBtn: "Tiếp tục với vai trò Khách", orText: "HOẶC", noAccount: "Chưa có tài khoản?", registerLink: "Tạo tài khoản mới", registerHeader: "Tạo tài khoản", regSub: "Tạo tài khoản để lưu trữ dữ liệu lâu dài", createAccountBtn: "Đăng Ký Ngay", haveAccount: "Đã có tài khoản?", loginLink: "Đăng nhập ngay", navDashboard: "Tổng quan", navCalculator: "Tính điểm", navHistory: "Lịch sử", navSettings: "Cài đặt", dashboardTitle: "Bảng điều khiển", totalScoreTitle: "GPA Tích Lũy", statPass: "Qua môn", statFail: "Rớt môn", statCredits: "Tổng Tín Chỉ", chartTitle: "Phân bố điểm số (A - F)", calcSubjectTitle: "Nhập thông tin môn học", subjectNameLabel: "Tên môn học", creditsLabel: "Số tín chỉ", weightLabel: "Tỷ lệ điểm", calcBtn: "Tính kết quả ngay", resultTitle: "KẾT QUẢ MÔN HỌC", autoSaveNote: "✅ Kết quả đã được tự động lưu.", historyTitle: "Lịch sử tính toán", searchPlaceholder: "Tìm kiếm môn học...", filterAll: "Tất cả", filterPass: "Đậu", filterFail: "Rớt", emptyHistory: "Chưa có dữ liệu nào", personalInfo: "Thông tin cá nhân", accountName: "Tên đăng nhập", changeBtn: "Thay đổi", nickname: "Biệt danh (Hiển thị)", saveBtn: "Lưu", appSettings: "Tùy chỉnh ứng dụng", darkMode: "Chế độ Tối (Dark Mode)", autoSave: "Tự động lưu điểm", language: "Ngôn ngữ / Language", gradingScaleTitle: "Quy chế quy đổi điểm (Trường)", gradingScaleDesc: "Chọn trường của bạn để tính điểm GPA và xếp loại chính xác.", changePass: "Bảo mật", oldPass: "Mật khẩu hiện tại", newPass: "Mật khẩu mới", saveChangeBtn: "Cập nhật mật khẩu", accountMgmt: "Vùng nguy hiểm", logoutBtn: "Đăng xuất", deleteAccBtn: "Xóa vĩnh viễn tài khoản", gradeA: "Xuất sắc", gradeB: "Giỏi", gradeC: "Khá/TB", gradeD: "Yếu", gradeF: "Kém", backupTitle: "Sao lưu dữ liệu", backupDesc: "Xuất dữ liệu để chuyển sang thiết bị mới hoặc nhập dữ liệu đã lưu.", btnExport: "Xuất (Export)", btnImport: "Nhập (Import)",
        errorEmpty: "Vui lòng điền đầy đủ thông tin!", errorLogin: "Sai tên đăng nhập hoặc mật khẩu!", successLogin: "Đăng nhập thành công!", successReg: "Đăng ký thành công! Hãy đăng nhập.", successSave: "Đã lưu thành công!", errorCooldown: "Vui lòng đợi 5 phút để đổi tên lại.", errorFile: "File quá lớn.", errorPass: "Mật khẩu cũ không đúng.", confirmDelete: "Bạn có chắc chắn muốn xóa tài khoản này? Dữ liệu sẽ mất vĩnh viễn.", settingUpdated: "Đã cập nhật cài đặt!", importSuccess: "Dữ liệu đã được nhập thành công!", importError: "Lỗi file không hợp lệ!", exportSuccess: "Đã xuất file dữ liệu!"
    },
    en: {
        welcomeTitle: "ScoreMaster", welcomeSub: "Student GPA Management System", loginHeader: "Login", usernameLabel: "Username", passwordLabel: "Password", loginBtn: "Login", guestBtn: "Continue as Guest", orText: "OR", noAccount: "No account?", registerLink: "Create new account", registerHeader: "Create Account", regSub: "Sign up to save your data permanently", createAccountBtn: "Sign Up Now", haveAccount: "Have an account?", loginLink: "Login now", navDashboard: "Dashboard", navCalculator: "Calculator", navHistory: "History", navSettings: "Settings", dashboardTitle: "Dashboard", totalScoreTitle: "Cumulative GPA", statPass: "Passed", statFail: "Failed", statCredits: "Total Credits", chartTitle: "Grade Distribution (A - F)", calcSubjectTitle: "Subject Information", subjectNameLabel: "Subject Name", creditsLabel: "Credits", weightLabel: "Weight Ratio", calcBtn: "Calculate Now", resultTitle: "SUBJECT RESULT", autoSaveNote: "✅ Result automatically saved.", historyTitle: "Calculation History", searchPlaceholder: "Search subjects...", filterAll: "All", filterPass: "Passed", filterFail: "Failed", emptyHistory: "No data available", personalInfo: "Personal Info", accountName: "Username", changeBtn: "Change", nickname: "Nickname (Display)", saveBtn: "Save", appSettings: "App Preferences", darkMode: "Dark Mode", autoSave: "Auto Save Results", language: "Language", gradingScaleTitle: "Grading System (University)", gradingScaleDesc: "Select your university for accurate GPA and grading logic.", changePass: "Security", oldPass: "Current Password", newPass: "New Password", saveChangeBtn: "Update Password", accountMgmt: "Danger Zone", logoutBtn: "Log Out", deleteAccBtn: "Delete Account Permanently", gradeA: "Excellent", gradeB: "Good", gradeC: "Average", gradeD: "Poor", gradeF: "Fail", backupTitle: "Data Backup", backupDesc: "Export data to move to a new device or import saved data.", btnExport: "Export", btnImport: "Import",
        errorEmpty: "Please fill all fields!", errorLogin: "Invalid username or password!", successLogin: "Login Successful!", successReg: "Registered! Please login.", successSave: "Saved successfully!", errorCooldown: "Please wait 5 mins to rename.", errorFile: "File too big.", errorPass: "Incorrect old password.", confirmDelete: "Are you sure? This cannot be undone.", settingUpdated: "Settings updated!", importSuccess: "Data imported successfully!", importError: "Invalid file format!", exportSuccess: "Data exported!"
    }
};

// ==================================================================
// 3. STORAGE MANAGER (TRÁI TIM CỦA VIỆC ĐỒNG BỘ)
// ==================================================================
const Storage = {
    // UPDATED: Sử dụng localStorage để giữ trạng thái đăng nhập khi tắt trình duyệt
    setSession: (id) => localStorage.setItem(CONFIG.KEY_SESSION, id),
    getSession: () => localStorage.getItem(CONFIG.KEY_SESSION),
    clearSession: () => localStorage.removeItem(CONFIG.KEY_SESSION),

    /**
     * HÀM QUAN TRỌNG NHẤT: ĐẨY DỮ LIỆU LÊN SUPABASE
     * Được gọi mỗi khi có bất kỳ thay đổi nào từ phía người dùng
     */
    updateCurrentUser: async (user) => {
        // Nếu là khách -> Lưu vào trình duyệt
        if (user.id === 'guest') {
            sessionStorage.setItem(CONFIG.KEY_GUEST, JSON.stringify(user));
            return;
        }

        console.log("🔄 Syncing data to Cloud...", user.settings);

        const payload = {
            nickname: user.nickname,
            avatar: user.avatar, 
            history: user.history, 
            folders: user.folders, 
            settings: user.settings, 
            last_renamed: user.lastRenamed
        };

        const { error } = await supabase
            .from('users')
            .update(payload)
            .eq('id', user.id);

        if (error) {
            console.error("❌ Sync Error:", error);
            UI.toast('error', 'Lỗi đồng bộ dữ liệu!');
        } else {
            console.log("✅ Sync Success!");
        }
    },

    getGuestProfile: () => {
        const saved = sessionStorage.getItem(CONFIG.KEY_GUEST);
        if (saved) return JSON.parse(saved);
        return {
            id: 'guest', username: 'Guest', nickname: 'Student',
            password: '', avatar: 'images/DefaultProfilePic.jpg',
            history: [], folders: [],
            settings: { 
                theme: 'light', lang: 'vi', autoSave: false,
                dashboardSource: 'all', gradingScale: CONFIG.DEFAULT_SCALE
            },
            createdAt: Date.now()
        };
    }
};

// ==================================================================
// 4. DATA EXPORT/IMPORT
// ==================================================================
const DataManager = {
    exportData: (dataToExport, filename = 'score_data.json') => {
        try {
            const dataStr = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = filename;
            document.body.appendChild(a); a.click();
            document.body.removeChild(a); URL.revokeObjectURL(url);
            UI.toast('success', 'exportSuccess');
        } catch (e) { UI.toast('error', 'Error exporting data'); }
    },

    importData: (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                DataManager.processImport(importedData);
            } catch (err) { UI.toast('error', 'importError'); }
        };
        reader.readAsText(file);
    },

    processImport: (data) => {
        if (!data || !Array.isArray(data.history)) return UI.toast('error', 'importError');
        const currentUser = App.currentUser;

        // Merge History
        data.history.forEach(newItem => {
            if (!currentUser.history.some(existing => existing.id === newItem.id)) {
                currentUser.history.push(newItem);
            }
        });

        // Merge Folders
        if (data.folders && Array.isArray(data.folders)) {
            if (!currentUser.folders) currentUser.folders = [];
            data.folders.forEach(newFolder => {
                let folderId = newFolder.id;
                if (currentUser.folders.find(f => f.id === folderId)) {
                    folderId = 'folder_' + Date.now() + Math.random().toString(36).substr(2, 5);
                    newFolder.id = folderId;
                    newFolder.name = newFolder.name + ' (Imported)';
                }
                currentUser.folders.push(newFolder);
            });
        }

        currentUser.history.sort((a, b) => b.date - a.date);
        
        // Gọi hàm đồng bộ ngay sau khi import
        Storage.updateCurrentUser(currentUser); 
        
        App.syncUI();
        UI.toast('success', 'importSuccess');
    }
};

// ==================================================================
// 5. AUTHENTICATION (XỬ LÝ ĐĂNG NHẬP/ĐĂNG KÝ)
// ==================================================================
const Auth = {
    init: async () => {
        const sessionId = Storage.getSession();
        
        if (sessionId) {
            UI.showLoading(true);
            // Lấy FULL dữ liệu từ server
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', sessionId)
                .single();

            UI.showLoading(false);

            if (data && !error) {
                // Check Ban Status on Init
                if(data.is_banned && data.banned_until) {
                    const banTime = new Date(data.banned_until);
                    if(banTime > new Date()) {
                        Storage.clearSession();
                        UI.showAuth();
                        alert(`Tài khoản đã bị cấm đến: ${banTime.toLocaleString()}`);
                        return;
                    }
                }
                App.loadUser(data); // Load user và áp dụng Settings
            } else {
                // Nếu token không hợp lệ (ví dụ user bị xóa trên server), clear token
                Storage.clearSession();
                UI.showAuth();
            }
        } else {
            UI.showAuth();
        }
    },

    register: async (username, password) => {
        if (!username || !password) return UI.toast('error', 'errorEmpty');
        
        const newUser = {
            username: username,
            password: password, 
            nickname: username,
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            settings: { // Default Settings khi tạo mới
                theme: 'light', lang: 'vi', 
                autoSave: true, 
                dashboardSource: 'all', gradingScale: CONFIG.DEFAULT_SCALE 
            },
            history: [],
            folders: []
        };

        const btn = document.getElementById('btn-register');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;

        const { data, error } = await supabase
            .from('users')
            .insert([newUser])
            .select();

        btn.innerHTML = originalText;
        btn.disabled = false;

        if (error) {
            if (error.code === '23505') { 
                UI.toast('error', 'Tên đăng nhập này đã có người dùng!');
            } else {
                UI.toast('error', 'Lỗi đăng ký: ' + error.message);
            }
        } else {
            UI.toast('success', 'successReg');
            UI.switchAuth('login');
            document.getElementById('login-username').value = username;
        }
    },

    login: async (username, password) => {
        const btn = document.getElementById('btn-login');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
        btn.disabled = true;

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        btn.innerHTML = originalText;
        btn.disabled = false;

        if (error || !data) {
            UI.toast('error', 'errorLogin');
        } else {
            // Check Ban Logic
            if (data.is_banned && data.banned_until) {
                const banTime = new Date(data.banned_until);
                const now = new Date();
                if (banTime > now) {
                    return UI.toast('error', `Tài khoản bị cấm đến: ${banTime.toLocaleString()}`);
                }
            }

            Storage.setSession(data.id);
            App.loadUser(data);
            UI.toast('success', 'successLogin');
        }
    },

    loginGuest: () => {
        const guest = Storage.getGuestProfile();
        App.loadUser(guest);
        UI.toast('info', 'Guest Mode Active');
    },

    logout: () => {
        Storage.clearSession();
        location.reload();
    },

    deleteAccount: async () => {
        if(App.currentUser.id === 'guest') return;
        const lang = App.currentUser.settings.lang;
        if(confirm(LANG[lang].confirmDelete)) {
            const { error } = await supabase.from('users').delete().eq('id', App.currentUser.id);
            if (!error) Auth.logout();
            else UI.toast('error', 'Lỗi xóa tài khoản');
        }
    },

    changePassword: async (oldPass, newPass) => {
        if(App.currentUser.password !== oldPass) return UI.toast('error', 'errorPass');
        
        App.currentUser.password = newPass;
        // Chỉ update password field
        const { error } = await supabase
            .from('users')
            .update({ password: newPass })
            .eq('id', App.currentUser.id);

        if (error) {
            UI.toast('error', 'Lỗi cập nhật mật khẩu');
        } else {
            UI.toast('success', 'successSave');
            document.getElementById('old-pass').value = '';
            document.getElementById('new-pass').value = '';
        }
    }
};

// ==================================================================
// 6. LOGIC TÍNH TOÁN & HIỂN THỊ (UI)
// ==================================================================
const Calculator = {
    calculateSubjectScore: (inputs, type) => {
        let valid = true;
        inputs.forEach(val => { if (isNaN(val) || val < 0 || val > 10) valid = false; });
        if (!valid) return null;
        const weights = {
            '5:5': [0.5, 0.5], '4:6': [0.4, 0.6], '3:7': [0.3, 0.7],
            '2:3:5': [0.2, 0.3, 0.5], '100': [1.0]
        };
        const score = inputs.reduce((acc, val, idx) => acc + (val * weights[type][idx]), 0);
        return Math.round(score * 100) / 100;
    },
    getGradingInfo: (score) => {
        // Lấy gradingScale từ Settings của User hiện tại
        const scale = (App.currentUser?.settings?.gradingScale) || CONFIG.DEFAULT_SCALE;
        const rule = GRADING_RULES[scale] || GRADING_RULES['HUFLIT'];
        return rule.get(score);
    },
    calculateGPA: (history) => {
        if (!history || history.length === 0) return { scale10: "0.00", scale4: "0.00" };
        let totalPoints10 = 0, totalPoints4 = 0, totalCredits = 0;
        history.forEach(item => {
            const score10 = parseFloat(item.score);
            const score4 = Calculator.getGradingInfo(score10).gpa;
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

const UI = {
    chartInstances: {},

    showAuth: () => {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-screen').style.display = 'none';
    },
    
    showLoading: (isLoading) => {
        const authScreen = document.getElementById('auth-screen');
        if (isLoading) {
            authScreen.style.display = 'flex';
            authScreen.style.opacity = '0.7';
            authScreen.style.pointerEvents = 'none';
        } else {
            authScreen.style.opacity = '1';
            authScreen.style.pointerEvents = 'auto';
        }
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
        let icon = type === 'success' ? '<i class="fa-solid fa-check"></i>' : (type === 'error' ? '<i class="fa-solid fa-ban"></i>' : '<i class="fa-solid fa-info"></i>');
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
        labels[type].forEach(label => {
            const div = document.createElement('div');
            div.className = 'input-wrapper';
            div.innerHTML = `<input type="number" class="calc-input" step="0.1" min="0" max="10" placeholder=" "><label>${label}</label>`;
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
        if (dateFilter) filtered = filtered.filter(h => new Date(h.date).toISOString().split('T')[0] === dateFilter);
        if (folderFilterId && folderFilterId !== 'all') {
            const folder = App.currentUser.folders.find(f => f.id === folderFilterId);
            if (folder) filtered = filtered.filter(h => folder.items.includes(h.id));
        }
        filtered.sort((a, b) => b.date - a.date);

        if (filtered.length === 0) {
            const lang = App.currentUser ? App.currentUser.settings.lang : 'vi';
            container.innerHTML = `<div class="empty-state"><img src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png" alt="Empty" width="60"><p>${LANG[lang].emptyHistory}</p></div>`;
            return;
        }

        filtered.forEach(item => {
            const dateStr = new Date(item.date).toLocaleDateString();
            const isPass = item.score >= 4.0;
            const gradingInfo = Calculator.getGradingInfo(parseFloat(item.score));
            const isChecked = App.selectedItems && App.selectedItems.has(item.id) ? 'checked' : '';
            
            const div = document.createElement('div');
            div.className = `history-item ${isChecked ? 'selected' : ''}`;
            div.setAttribute('data-id', item.id);
            div.innerHTML = `
                <div class="col-check"><input type="checkbox" class="custom-checkbox item-checkbox" ${isChecked} onclick="event.stopPropagation(); App.toggleSelection(${item.id})"></div>
                <div class="col-sub"><div style="font-weight:700;">${item.subject || 'Subject'}</div><div style="font-size:0.75rem; color:var(--text-muted)">${dateStr}</div></div>
                <div class="col-type"><span class="h-type">${item.type || 'N/A'}</span></div>
                <div class="col-cred center-text">${item.credits} TC</div>
                <div class="col-score h-score ${isPass ? 'pass' : 'fail'}">${item.score}</div>
                <div class="col-grade center-text ${isPass ? 'pass' : 'fail'}">${gradingInfo.grade}</div>
                <div class="col-act"><button class="btn-icon-sm" onclick="event.stopPropagation(); App.deleteHistoryItem(${item.id})"><i class="fa-solid fa-trash"></i></button></div>
            `;
            div.onclick = (e) => { if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') div.querySelector('.item-checkbox').click(); };
            container.appendChild(div);
        });
    },

    updateDashboard: (history) => {
        let count = 0, pass = 0, fail = 0, totalCredits = 0;
        let gradeDist = { 'A':0, 'B':0, 'C':0, 'D':0, 'F':0 };
        history.forEach(h => {
            const sc = parseFloat(h.score);
            const cr = parseInt(h.credits) || 0;
            count++; totalCredits += cr;
            if (sc >= 4.0) pass++; else fail++;
            const g = Calculator.getGradingInfo(sc).grade.charAt(0);
            if (gradeDist[g] !== undefined) gradeDist[g]++; else gradeDist['F']++;
        });

        const gpaData = Calculator.calculateGPA(history);
        UI.animateValue('dash-gpa-10', parseFloat(document.getElementById('dash-gpa-10').innerText), parseFloat(gpaData.scale10), 1000);
        UI.animateValue('dash-gpa-4', parseFloat(document.getElementById('dash-gpa-4').innerText), parseFloat(gpaData.scale4), 1000);
        document.getElementById('dash-pass-count').innerText = pass;
        document.getElementById('dash-fail-count').innerText = fail;
        document.getElementById('dash-total-credits').innerText = totalCredits;

        const gpa4 = parseFloat(gpaData.scale4);
        const lang = App.currentUser.settings.lang;
        let rank = "Chưa xếp loại";
        if (count > 0) {
            if (gpa4 >= 3.6) rank = LANG[lang].gradeA;
            else if (gpa4 >= 3.2) rank = LANG[lang].gradeB;
            else if (gpa4 >= 2.5) rank = LANG[lang].gradeC;
            else if (gpa4 >= 2.0) rank = LANG[lang].gradeD;
            else rank = LANG[lang].gradeF;
        }
        document.getElementById('dash-ranking').innerText = rank;
        UI.drawCharts(gradeDist);
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

    drawCharts: (distData) => {
        const ctx1 = document.getElementById('scoreDistributionChart').getContext('2d');
        if (UI.chartInstances.pie) UI.chartInstances.pie.destroy();
        UI.chartInstances.pie = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['A', 'B', 'C', 'D', 'F'],
                datasets: [{
                    data: [distData.A, distData.B, distData.C, distData.D, distData.F],
                    backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'],
                    borderWidth: 0
                }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, cutout: '70%',
                plugins: { legend: { position: window.innerWidth < 480 ? 'bottom' : 'right' } }
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
        const offset = circumference - ((score / 10) * circumference);
        circle.style.strokeDashoffset = offset;
    }
};

// ==================================================================
// 7. ADMIN CONTROLLER (NEW)
// ==================================================================
const AdminPanel = {
    allUsers: [], // Local cache to support search

    loadUsers: async () => {
        const container = document.getElementById('admin-user-list');
        container.innerHTML = '<div style="text-align:center; padding: 20px;">Loading data...</div>';

        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .order('id', { ascending: true });

        if (error) return UI.toast('error', 'Lỗi tải danh sách users');

        AdminPanel.allUsers = users; // Cache users for search
        AdminPanel.renderUserList(users);
    },

    searchUsers: (keyword) => {
        const term = keyword.toLowerCase();
        const filtered = AdminPanel.allUsers.filter(user => 
            user.username.toLowerCase().includes(term) || 
            (user.id && user.id.toString().includes(term))
        );
        AdminPanel.renderUserList(filtered);
    },

    renderUserList: (users) => {
        const container = document.getElementById('admin-user-list');
        container.innerHTML = '';

        if (users.length === 0) {
            container.innerHTML = '<div class="empty-state">No users found.</div>';
            return;
        }

        users.forEach(user => {
            const isAdmin = user.username === CONFIG.ADMIN_USERNAME;
            const isBanned = user.is_banned && new Date(user.banned_until) > new Date();
            
            let statusBadge = `<span class="badge-status badge-active">Active</span>`;
            if (isAdmin) statusBadge = `<span class="badge-status badge-admin">Admin</span>`;
            else if (isBanned) statusBadge = `<span class="badge-status badge-banned">Banned</span>`;

            const div = document.createElement('div');
            div.className = 'admin-user-card';
            div.innerHTML = `
                <div class="admin-user-info">
                    <img src="${user.avatar || 'images/DefaultProfilePic.jpg'}" class="admin-avatar">
                    <div class="admin-user-details">
                        <h4>${user.username}</h4>
                        <p>ID: ${user.id}</p>
                    </div>
                </div>
                <div class="admin-password-box" title="Password">${user.password}</div>
                <div class="admin-status-box">${statusBadge}</div>
                <div class="admin-actions">
                    ${!isAdmin ? `
                        <button class="btn-icon-sm" style="color:orange" title="Cấm 10 phút" onclick="AdminPanel.banUser('${user.id}')"><i class="fa-solid fa-ban"></i></button>
                        <button class="btn-icon-sm" style="color:green" title="Gỡ cấm" onclick="AdminPanel.unbanUser('${user.id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="btn-icon-sm" style="color:red" title="Xóa vĩnh viễn" onclick="AdminPanel.deleteUser('${user.id}')"><i class="fa-solid fa-trash"></i></button>
                    ` : ''}
                </div>
            `;
            container.appendChild(div);
        });
    },

    deleteUser: async (id) => {
        if (confirm("CẢNH BÁO: Bạn có chắc chắn xóa vĩnh viễn user này?")) {
            const { error } = await supabase.from('users').delete().eq('id', id);
            if (!error) {
                UI.toast('success', 'Đã xóa user!');
                AdminPanel.loadUsers();
            } else {
                UI.toast('error', 'Lỗi khi xóa!');
            }
        }
    },

    banUser: async (id) => {
        const time = prompt("Nhập số phút muốn cấm (0 để hủy):", "10");
        if (time === null) return;
        const minutes = parseInt(time);
        
        let bannedUntil = null;
        let isBanned = false;
        
        if (minutes > 0) {
            const date = new Date();
            date.setMinutes(date.getMinutes() + minutes);
            bannedUntil = date.toISOString();
            isBanned = true;
        }

        const { error } = await supabase
            .from('users')
            .update({ is_banned: isBanned, banned_until: bannedUntil })
            .eq('id', id);

        if (!error) {
            UI.toast('success', isBanned ? `Đã cấm ${minutes} phút` : 'Đã gỡ cấm');
            AdminPanel.loadUsers();
        } else {
            UI.toast('error', 'Lỗi cập nhật trạng thái');
        }
    },

    unbanUser: async (id) => {
        const { error } = await supabase
            .from('users')
            .update({ is_banned: false, banned_until: null })
            .eq('id', id);
        if (!error) {
            UI.toast('success', 'Đã gỡ lệnh cấm!');
            AdminPanel.loadUsers();
        }
    },

    openCreateModal: () => {
        document.getElementById('admin-create-modal').classList.remove('hidden');
    },

    createUser: async () => {
        const u = document.getElementById('admin-new-username').value;
        const p = document.getElementById('admin-new-password').value;
        if (!u || !p) return UI.toast('error', 'Nhập đủ thông tin!');

        const newUser = {
            username: u, password: p, nickname: u,
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            settings: { theme: 'light', lang: 'vi', autoSave: true, dashboardSource: 'all', gradingScale: CONFIG.DEFAULT_SCALE },
            history: [], folders: []
        };

        const { error } = await supabase.from('users').insert([newUser]);
        if (!error) {
            UI.toast('success', 'Đã tạo user mới!');
            document.getElementById('admin-create-modal').classList.add('hidden');
            AdminPanel.loadUsers();
        } else {
            UI.toast('error', 'Tên đăng nhập đã tồn tại!');
        }
    }
};

// ==================================================================
// 8. APP CONTROLLER (CHÍNH)
// ==================================================================
const App = {
    currentUser: null,
    selectedItems: new Set(),
    cropper: null,

    // Hàm loadUser có nhiệm vụ điền các giá trị mặc định nếu server trả về NULL
    loadUser: (user) => {
        App.currentUser = user;
        
        // --- QUAN TRỌNG: MERGE SETTINGS ĐỂ TRÁNH LỖI MẤT DỮ LIỆU ---
        const defaultSettings = { theme: 'light', lang: 'vi', autoSave: true, gradingScale: CONFIG.DEFAULT_SCALE, dashboardSource: 'all' };
        
        // Nếu user.settings bị null hoặc thiếu field, merge với default
        App.currentUser.settings = { ...defaultSettings, ...(user.settings || {}) };
        
        // Đảm bảo history và folders luôn là mảng
        if(!App.currentUser.history) App.currentUser.history = [];
        if(!App.currentUser.folders) App.currentUser.folders = [];
        if(!App.currentUser.avatar) App.currentUser.avatar = 'images/DefaultProfilePic.jpg';

        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';

        // === ADMIN CHECK ===
        const adminBtn = document.getElementById('nav-admin-panel');
        if (user.username === CONFIG.ADMIN_USERNAME) {
            adminBtn.classList.remove('hidden-important');
        } else {
            adminBtn.classList.add('hidden-important');
        }
        
        App.syncUI(); // Hiển thị UI theo dữ liệu tải về
        
        document.querySelector('.nav-item[data-target="dashboard"]').click();
        UI.renderInputs('5:5');
        
        const langCode = (App.currentUser.settings.lang === 'vi') ? 'vi-VN' : 'en-US';
        document.getElementById('current-date').innerText = new Date().toLocaleDateString(langCode, { weekday: 'long', month: 'short', day: 'numeric' });
        
        // Xử lý hiển thị Avatar
        const isGuest = user.id === 'guest';
        const imgs = document.querySelectorAll('.avatar-img-el');
        const icons = document.querySelectorAll('.avatar-icon-el');
        const editBtn = document.getElementById('btn-edit-avatar');

        if (isGuest) {
            imgs.forEach(el => el.style.display = 'none');
            icons.forEach(el => el.style.display = 'flex');
            if(editBtn) editBtn.classList.add('hidden-important');
        } else {
            imgs.forEach(el => { 
                el.style.display = 'block'; 
                el.src = App.currentUser.avatar; 
            });
            icons.forEach(el => el.style.display = 'none');
            if(editBtn) editBtn.classList.remove('hidden-important');
        }
        
        UI.updateText(); // Cập nhật ngôn ngữ ngay khi load
    },

    syncUI: () => {
        const u = App.currentUser;
        if(u.id !== 'guest') {
            document.getElementById('mini-avatar-img').src = u.avatar;
            document.getElementById('settings-avatar').src = u.avatar;
        }
        document.getElementById('mini-nickname').innerText = u.nickname;
        document.getElementById('mini-username').innerText = '@' + u.username;
        document.getElementById('set-username').value = u.username;
        document.getElementById('set-nickname').value = u.nickname;

        // Áp dụng Theme
        document.getElementById('toggle-theme').checked = (u.settings.theme === 'dark');
        document.body.setAttribute('data-theme', u.settings.theme);
        
        // Áp dụng AutoSave
        document.getElementById('toggle-autosave').checked = u.settings.autoSave;
        const autoSaveRow = document.getElementById('setting-row-autosave');
        if (autoSaveRow) autoSaveRow.style.display = (u.id === 'guest') ? 'none' : 'flex';

        // Áp dụng Grading Scale
        document.getElementById('grading-scale-select').value = u.settings.gradingScale || CONFIG.DEFAULT_SCALE;

        // Active Language Button
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        const activeLangBtn = document.querySelector(`.lang-btn[data-lang="${u.settings.lang}"]`);
        if(activeLangBtn) activeLangBtn.classList.add('active');
        
        let displayHistory = u.history;
        let sourceName = "Tất cả";
        if (u.settings.dashboardSource && u.settings.dashboardSource !== 'all') {
            const folder = u.folders.find(f => f.id === u.settings.dashboardSource);
            if (folder) {
                displayHistory = u.history.filter(h => folder.items.includes(h.id));
                sourceName = folder.name;
            } else {
                // Nếu folder bị xóa, reset về all
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

    // --- CROP AVATAR LOGIC ---
    openCropModal: (imageSrc) => {
        const modal = document.getElementById('crop-modal');
        const imgElement = document.getElementById('crop-image');
        modal.classList.remove('hidden');
        imgElement.src = imageSrc;
        if (App.cropper) App.cropper.destroy();
        App.cropper = new Cropper(imgElement, { aspectRatio: 1, viewMode: 1, autoCropArea: 1, responsive: true });
    },
    closeCropModal: () => {
        document.getElementById('crop-modal').classList.add('hidden');
        if (App.cropper) { App.cropper.destroy(); App.cropper = null; }
        document.getElementById('avatar-input').value = ''; 
    },
    saveCrop: () => {
        if (!App.cropper) return;
        const canvas = App.cropper.getCroppedCanvas({ width: 256, height: 256, imageSmoothingQuality: 'high' });
        // Nén ảnh JPEG 0.7 để giảm dung lượng khi lưu vào DB
        const base64Image = canvas.toDataURL('image/jpeg', 0.7); 
        App.handleSaveAvatar(base64Image);
        App.closeCropModal();
    },
    handleSaveAvatar: async (base64Data) => {
        App.currentUser.avatar = base64Data;
        
        // GỌI HÀM UPDATE ĐỂ LƯU NGAY LÊN CLOUD
        await Storage.updateCurrentUser(App.currentUser);
        
        App.syncUI();
        UI.toast('success', 'successSave');
    },

    // --- FOLDER LOGIC ---
    renderFolders: () => {
        const container = document.getElementById('folder-container');
        container.innerHTML = '';
        const folders = App.currentUser.folders || [];
        const currentSource = App.currentUser.settings.dashboardSource || 'all';

        const allDiv = document.createElement('div');
        allDiv.className = `folder-card ${currentSource === 'all' ? 'active' : ''}`;
        allDiv.onclick = (e) => { if(!e.target.closest('.btn-folder-act')) App.setDashboardSource('all'); };
        allDiv.innerHTML = `<div class="folder-icon"><i class="fa-solid fa-folder-tree"></i></div><div class="folder-name">Tất cả</div><div class="folder-info">${App.currentUser.history.length} mục</div>${currentSource === 'all' ? '<span class="is-pinned"><i class="fa-solid fa-thumbtack"></i></span>' : ''}`;
        container.appendChild(allDiv);

        folders.forEach(f => {
            const div = document.createElement('div');
            div.className = `folder-card ${currentSource === f.id ? 'active' : ''}`;
            const validItems = f.items.filter(id => App.currentUser.history.find(h => h.id === id));
            div.innerHTML = `
                <div class="folder-icon"><i class="fa-regular fa-folder"></i></div>
                <div class="folder-name" title="${f.name}">${f.name}</div>
                <div class="folder-info">${validItems.length} mục</div>
                ${currentSource === f.id ? '<span class="is-pinned"><i class="fa-solid fa-thumbtack"></i></span>' : ''}
                <div class="folder-actions">
                    <button class="btn-folder-act" onclick="App.renameFolder('${f.id}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-folder-act" onclick="App.exportFolder('${f.id}')"><i class="fa-solid fa-share-from-square"></i></button>
                    <button class="btn-folder-act" onclick="App.setDashboardSource('${f.id}')"><i class="fa-solid fa-thumbtack"></i></button>
                    <button class="btn-folder-act" style="color:red" onclick="App.deleteFolder('${f.id}')"><i class="fa-solid fa-xmark"></i></button>
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
        const newFolder = { id: 'folder_' + Date.now(), name: name, items: Array.from(App.selectedItems) };
        App.currentUser.folders.push(newFolder);
        
        App.cancelSelection();
        // Sync lên Cloud
        Storage.updateCurrentUser(App.currentUser);
        
        App.renderFolders();
        UI.toast('success', 'Đã tạo thư mục thành công!');
    },
    renameFolder: (id) => {
        const folder = App.currentUser.folders.find(f => f.id === id);
        const newName = prompt("Tên mới:", folder.name);
        if (newName) { 
            folder.name = newName; 
            Storage.updateCurrentUser(App.currentUser); 
            App.renderFolders(); 
        }
    },
    deleteFolder: (id) => {
        if (!confirm("Xóa thư mục này?")) return;
        App.currentUser.folders = App.currentUser.folders.filter(f => f.id !== id);
        if (App.currentUser.settings.dashboardSource === id) App.currentUser.settings.dashboardSource = 'all';
        Storage.updateCurrentUser(App.currentUser);
        App.renderFolders(); App.syncUI();
    },
    exportFolder: (folderId) => {
        const folder = App.currentUser.folders.find(f => f.id === folderId);
        const items = App.currentUser.history.filter(h => folder.items.includes(h.id));
        DataManager.exportData({ folders: [folder], history: items, exportDate: new Date().toISOString() }, `SM_Folder_${folder.name}.json`);
    },
    setDashboardSource: (sourceId) => {
        App.currentUser.settings.dashboardSource = sourceId;
        Storage.updateCurrentUser(App.currentUser);
        App.syncUI();
        UI.toast('success', 'Đã cập nhật nguồn dữ liệu Dashboard!');
    },

    // --- SELECTION LOGIC ---
    toggleSelection: (id) => {
        if (App.selectedItems.has(id)) App.selectedItems.delete(id); else App.selectedItems.add(id);
        App.updateSelectionUI();
    },
    toggleSelectAll: (checked) => {
        document.querySelectorAll('.history-item').forEach(row => {
            const id = parseInt(row.getAttribute('data-id'));
            const cb = row.querySelector('.item-checkbox');
            if (checked) { App.selectedItems.add(id); cb.checked = true; } 
            else { App.selectedItems.delete(id); cb.checked = false; }
        });
        App.updateSelectionUI();
    },
    updateSelectionUI: () => {
        const count = App.selectedItems.size;
        document.getElementById('sel-count').innerText = count;
        const bar = document.getElementById('selection-action-bar');
        if (count > 0) bar.classList.remove('hidden'); else bar.classList.add('hidden');
        document.querySelectorAll('.history-item').forEach(row => {
            const id = parseInt(row.getAttribute('data-id'));
            if (App.selectedItems.has(id)) row.classList.add('selected'); else row.classList.remove('selected');
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
        App.currentUser.folders.forEach(f => { f.items = f.items.filter(id => !App.selectedItems.has(id)); });
        Storage.updateCurrentUser(App.currentUser);
        App.cancelSelection(); App.syncUI();
    },
    exportMulti: () => {
        const items = App.currentUser.history.filter(h => App.selectedItems.has(h.id));
        DataManager.exportData({ folders: [], history: items, exportDate: new Date().toISOString() }, `SM_Selected_${items.length}_Items.json`);
        App.cancelSelection();
    },

    // --- EVENT BINDING ---
    initEvents: () => {
        // Auth Buttons
        document.getElementById('btn-login').onclick = () => Auth.login(document.getElementById('login-username').value, document.getElementById('login-password').value);
        document.getElementById('btn-register').onclick = () => Auth.register(document.getElementById('reg-username').value, document.getElementById('reg-password').value);
        document.getElementById('btn-guest').onclick = Auth.loginGuest;
        document.getElementById('btn-logout-mini').onclick = Auth.logout;

        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
                document.getElementById(btn.dataset.target).classList.add('active');
                const sidebar = document.querySelector('.sidebar');
                if (window.innerWidth < 768) sidebar.classList.remove('open');

                // NEW: Load Users if Admin Panel is opened
                if (btn.dataset.target === 'admin-panel') {
                    AdminPanel.loadUsers();
                }
            };
        });
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if(mobileMenuBtn) mobileMenuBtn.onclick = () => document.querySelector('.sidebar').classList.add('open');

        // Calculator Inputs
        document.getElementById('weight-select').onchange = (e) => UI.renderInputs(e.target.value);
        document.getElementById('btn-reset-calc').onclick = () => { document.querySelectorAll('.calc-input').forEach(i => i.value = ''); document.getElementById('subject-name').value = ''; UI.hideResult(); };
        
        // Calculate Logic
        document.getElementById('btn-calc-now').onclick = () => {
            const inputs = Array.from(document.querySelectorAll('.calc-input')).map(i => parseFloat(i.value));
            const weightType = document.getElementById('weight-select').value;
            const subName = document.getElementById('subject-name').value;
            const credits = parseInt(document.getElementById('subject-credits').value) || 3;
            const result = Calculator.calculateSubjectScore(inputs, weightType);
            if (result === null) return UI.toast('error', 'errorEmpty');

            document.getElementById('calc-result').classList.remove('hidden');
            UI.animateValue('res-score-number', 0, result, 500);
            UI.setResultCircle(result);
            const gradingInfo = Calculator.getGradingInfo(result);
            document.getElementById('res-grade-text').innerText = `Điểm: ${gradingInfo.grade}`;
            document.getElementById('res-score-10').innerText = result;
            document.getElementById('res-score-4').innerText = gradingInfo.gpa;
            const isPass = result >= CONFIG.PASS_SCORE;
            const statusEl = document.getElementById('res-status-text');
            statusEl.innerText = isPass ? "QUA MÔN" : "RỚT MÔN";
            statusEl.className = `status-badge ${isPass ? 'pass' : 'fail'}`;
            if (isPass) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

            if (App.currentUser.settings.autoSave) {
                App.saveHistory(subName || `Subject ${Date.now()}`, result, credits, weightType);
                document.getElementById('autosave-note').style.display = 'block';
            } else { document.getElementById('autosave-note').style.display = 'none'; }
        };

        // History Actions
        document.getElementById('check-all-history').onclick = (e) => App.toggleSelectAll(e.target.checked);
        document.getElementById('btn-create-folder').onclick = App.createFolder;
        document.getElementById('btn-delete-multi').onclick = App.deleteMulti;
        document.getElementById('btn-cancel-sel').onclick = App.cancelSelection;
        const btnExportMulti = document.getElementById('btn-export-multi-folder');
        if(btnExportMulti) btnExportMulti.onclick = App.exportMulti;

        // Data Actions
        document.getElementById('btn-export-data').onclick = () => DataManager.exportData({ folders: App.currentUser.folders, history: App.currentUser.history, exportDate: new Date().toISOString() }, `ScoreData_Backup_${Date.now()}.json`);
        document.getElementById('btn-import-data').onclick = () => document.getElementById('import-file-input').click();
        document.getElementById('import-file-input').onchange = (e) => { const file = e.target.files[0]; if(file) DataManager.importData(file); e.target.value = ''; };

        // Profile Actions
        document.getElementById('btn-change-username').onclick = async () => {
            const newName = prompt("Tên đăng nhập mới:");
            if (!newName) return;
            const now = Date.now();
            if (now - (App.currentUser.lastRenamed || 0) < CONFIG.NAME_CHANGE_COOLDOWN) return UI.toast('error', 'errorCooldown');
            App.currentUser.username = newName; App.currentUser.lastRenamed = now;
            // Update Username cũng phải sync settings
            const { error } = await supabase.from('users').update({ username: newName, last_renamed: now }).eq('id', App.currentUser.id);
            if(!error) { App.syncUI(); UI.toast('success', 'successSave'); } else UI.toast('error', 'Tên đã tồn tại');
        };
        
        document.getElementById('btn-save-nick').onclick = () => { 
            App.currentUser.nickname = document.getElementById('set-nickname').value; 
            Storage.updateCurrentUser(App.currentUser); 
            App.syncUI(); UI.toast('success', 'successSave'); 
        };
        
        document.getElementById('btn-change-pass').onclick = () => {
            const oldP = document.getElementById('old-pass').value; const newP = document.getElementById('new-pass').value;
            if(oldP && newP) Auth.changePassword(oldP, newP); else UI.toast('error', 'errorEmpty');
        };

        // Avatar Upload
        document.getElementById('avatar-input').onchange = function(e) {
            const file = e.target.files[0]; if (!file) return;
            if (file.size > CONFIG.MAX_AVATAR_SIZE) return UI.toast('error', 'errorFile');
            const reader = new FileReader();
            reader.onload = function(evt) { const result = evt.target.result; if (file.type === 'image/gif') App.handleSaveAvatar(result); else App.openCropModal(result); };
            reader.readAsDataURL(file);
        };

        // --- SETTINGS LISTENERS (ĐÃ FIX SYNC) ---
        
        // Theme Toggle
        document.getElementById('toggle-theme').onchange = (e) => { 
            App.currentUser.settings.theme = e.target.checked ? 'dark' : 'light'; 
            document.body.setAttribute('data-theme', App.currentUser.settings.theme); 
            UI.updateDashboard(App.currentUser.history); 
            Storage.updateCurrentUser(App.currentUser); // Sync Immediately
        };
        
        // AutoSave Toggle
        document.getElementById('toggle-autosave').onchange = (e) => { 
            App.currentUser.settings.autoSave = e.target.checked; 
            Storage.updateCurrentUser(App.currentUser); // Sync Immediately
        };
        
        // Grading Scale Select
        const scaleSelect = document.getElementById('grading-scale-select');
        if (scaleSelect) scaleSelect.onchange = (e) => { 
            App.currentUser.settings.gradingScale = e.target.value; 
            UI.toast('success', 'settingUpdated'); 
            Storage.updateCurrentUser(App.currentUser); // Sync Immediately
            App.syncUI(); 
        };

        // Language Buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.onclick = () => { 
                App.currentUser.settings.lang = btn.dataset.lang; 
                Storage.updateCurrentUser(App.currentUser); // Sync Immediately
                App.syncUI(); 
                UI.updateText(); 
            };
        });

        // Search & Filters
        document.getElementById('history-search').onkeyup = (e) => {
             const term = e.target.value.toLowerCase();
             const filtered = App.currentUser.history.filter(h => (h.subject && h.subject.toLowerCase().includes(term)) || h.score.toString().includes(term));
             UI.renderHistory(filtered);
        };
        document.querySelectorAll('.filter-chip').forEach(btn => {
            btn.onclick = () => { document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active')); btn.classList.add('active'); UI.renderHistory(App.currentUser.history, btn.dataset.filter); };
        });
        document.getElementById('history-date-filter').onchange = (e) => UI.renderHistory(App.currentUser.history, 'all', e.target.value);
        document.getElementById('btn-clear-date').onclick = () => { document.getElementById('history-date-filter').value = ''; UI.renderHistory(App.currentUser.history); };
    },

    saveHistory: (subject, score, credits, type) => {
        const newItem = { id: Date.now(), subject, score, credits, type, date: Date.now() };
        App.currentUser.history.unshift(newItem);
        
        // SYNC LÊN SUPABASE
        Storage.updateCurrentUser(App.currentUser);
        
        App.syncUI();
    },

    deleteHistoryItem: (id) => {
        if(confirm("Delete this item?")) {
            App.currentUser.history = App.currentUser.history.filter(h => h.id !== id);
            App.currentUser.folders.forEach(f => { f.items = f.items.filter(itemId => itemId !== id); });
            
            // SYNC LÊN SUPABASE
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