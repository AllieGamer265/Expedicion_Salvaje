function loginStudent(code) {
  const trimmedCode = code.trim();
  const student = getStudentByCode(trimmedCode);
  if (student) {
    sessionStorage.setItem('studentCode', student.code);
    window.location.href = 'student.html?code=' + encodeURIComponent(student.code);
  } else {
    const errorEl = document.getElementById('error-message');
    if (errorEl) {
      errorEl.textContent = t('login.error');
      errorEl.classList.remove('hidden');
    }
  }
}

function loginAdmin(username) {
  if (username.trim() === 'WildCaptain_260') {
    sessionStorage.setItem('isAdmin', 'true');
    window.location.href = 'admin.html';
  } else {
    const errorEl = document.getElementById('admin-error');
    if (errorEl) {
      errorEl.textContent = t('admin.usernameError');
      errorEl.classList.remove('hidden');
    }
  }
}

function handleLogin(e) {
  e.preventDefault();
  const code = document.getElementById('code-input').value;
  loginStudent(code);
}

function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('admin-username').value;
  loginAdmin(username);
}

function logout() {
  sessionStorage.removeItem('studentCode');
  window.location.href = 'index.html';
}

function adminLogout() {
  sessionStorage.removeItem('isAdmin');
  window.location.href = 'index.html';
}

function showError(msg) {
  const el = document.getElementById('error-message');
  if (el) {
    el.textContent = msg;
    el.classList.remove('hidden');
  }
}

function showSuccess(msg) {
  let toast = document.getElementById('success-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'success-toast';
    toast.className = 'success-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
