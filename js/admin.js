async function initAdmin() {
  if (sessionStorage.getItem('isAdmin') !== 'true') {
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
    return;
  }

  document.getElementById('admin-login').classList.add('hidden');
  document.getElementById('admin-panel').classList.remove('hidden');

  renderAssignPointsForm();
  renderResetForm();
  initThemeManager();
  updateAllTexts();
}

function renderAssignPointsForm() {
  const select = document.getElementById('assign-points-student');
  if (!select) return;

  select.innerHTML = '<option value="">' + t('admin.selectStudent') + '</option>' +
    STUDENTS.map(s => `<option value="${s.code}">${s.emoji} ${s.name} (${s.code})</option>`).join('');
}

let savingPoints = false;

async function handleAssignPoints(e) {
  e.preventDefault();

  if (savingPoints) return;

  const studentCode = document.getElementById('assign-points-student').value;
  const points = parseInt(document.getElementById('assign-points-value').value);
  const msgEl = document.getElementById('assign-points-message');

  if (!studentCode || !points || points <= 0) return;

  savingPoints = true;
  const btn = e.target.querySelector('.btn-primary');
  if (btn) btn.disabled = true;

  try {
    await db.collection('results').add({
      studentCode: studentCode,
      correctAnswers: points,
      totalQuestions: points,
      theme: '',
      month: getCurrentMonthId(),
      className: t('admin.directAssignment'),
      date: new Date().toISOString().split('T')[0],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    const student = getStudentByCode(studentCode);
    msgEl.textContent = '✅ ' + t('admin.successPoints') + (student ? ' → ' + student.name : '');
    msgEl.style.color = '#2D5016';
    msgEl.classList.remove('hidden');
    e.target.reset();
  } catch (err) {
    msgEl.textContent = '❌ ' + err.message;
    msgEl.style.color = '#c62828';
    msgEl.classList.remove('hidden');
  } finally {
    savingPoints = false;
    if (btn) btn.disabled = false;
  }
}

function getCurrentMonthId() {
  const now = new Date();
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return months[now.getMonth()] + '-' + now.getFullYear();
}

function showSection(sectionId, btn) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
  document.getElementById('section-' + sectionId).classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function renderResetForm() {
  const select = document.getElementById('reset-month');
  if (!select) return;

  const currentMonth = getCurrentMonthId();
  const monthOptions =
    `<option value="${currentMonth}">${currentMonth} (${t('admin.current')})</option>` +
    MONTHS.map(m =>
      `<option value="${m.id}">${getLanguage() === 'en' ? m.nameEn : m.name}</option>`
    ).join('');
  select.innerHTML = monthOptions;
}

async function resetMonth() {
  const monthId = document.getElementById('reset-month').value;
  const msgEl = document.getElementById('reset-message');

  if (!confirm('¿Estás segura? Se eliminarán TODOS los resultados de ' + monthId)) {
    return;
  }

  try {
    const resultsSnap = await db.collection('results')
      .where('month', '==', monthId)
      .get();

    if (resultsSnap.empty) {
      msgEl.textContent = 'No hay resultados para eliminar en este mes.';
      msgEl.style.color = '#666';
      msgEl.classList.remove('hidden');
      return;
    }

    const batch = db.batch();
    resultsSnap.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    msgEl.textContent = '✅ Se eliminaron ' + resultsSnap.size + ' resultados. Los puntos están en 0.';
    msgEl.style.color = '#2D5016';
    msgEl.classList.remove('hidden');
  } catch (e) {
    msgEl.textContent = '❌ Error: ' + e.message;
    msgEl.style.color = '#c62828';
    msgEl.classList.remove('hidden');
  }
}

let cachedCustomThemes = [];

function themeMessage(text, color) {
  const msgEl = document.getElementById('theme-message');
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.style.color = color || '#2D5016';
  msgEl.classList.remove('hidden');
}

async function getSettingsDoc() {
  try {
    const doc = await db.collection('settings').doc('global').get();
    return doc.exists ? doc.data() : {};
  } catch (e) {
    console.error('Error leyendo settings:', e);
    return {};
  }
}

async function loadCustomThemes() {
  const settings = await getSettingsDoc();
  cachedCustomThemes = settings.customThemes || [];
  return cachedCustomThemes;
}

async function initThemeManager() {
  const select = document.getElementById('theme-select');
  if (!select) return;

  await loadCustomThemes();
  const allThemes = combineThemes(cachedCustomThemes);
  const settings = await getSettingsDoc();
  const active = settings.activeTheme || 'animales-marinos';

  select.innerHTML = allThemes.map(t =>
    `<option value="${t.id}" ${t.id === active ? 'selected' : ''}>${t.emoji} ${getLanguage() === 'en' ? t.nameEn : t.name}</option>`
  ).join('');

  const colorInput = document.getElementById('theme-color');
  const preview = document.getElementById('theme-color-preview');
  if (colorInput && preview) {
    const activeTheme = getThemeById(active) || allThemes.find(t => t.id === active);
    colorInput.value = (activeTheme && activeTheme.color) || '#0077B6';
    preview.style.background = colorInput.value;
    preview.textContent = (activeTheme && (getLanguage() === 'en' ? activeTheme.nameEn : activeTheme.name)) || '';
    colorInput.oninput = function () {
      preview.style.background = this.value;
      const t = allThemes.find(x => x.id === select.value);
      preview.textContent = t ? (getLanguage() === 'en' ? t.nameEn : t.name) : '';
    };
    select.onchange = function () {
      const t = allThemes.find(x => x.id === this.value);
      if (t) {
        colorInput.value = t.color;
        preview.style.background = t.color;
        preview.textContent = getLanguage() === 'en' ? t.nameEn : t.name;
      }
    };
  }
}

async function saveActiveTheme() {
  const themeId = document.getElementById('theme-select').value;
  const color = document.getElementById('theme-color').value;

  try {
    await db.collection('settings').doc('global').set(
      { activeTheme: themeId, activeThemeColor: color },
      { merge: true }
    );
    themeMessage('✅ Tema del mes guardado: ' + themeId);
  } catch (e) {
    themeMessage('❌ Error: ' + e.message, '#c62828');
  }
}

async function createCustomTheme() {
  const name = document.getElementById('custom-theme-name').value.trim();
  const nameEn = document.getElementById('custom-theme-name-en').value.trim();
  const emoji = document.getElementById('custom-theme-emoji').value.trim() || '🌟';
  const color = document.getElementById('custom-theme-color').value || '#4CAF50';

  if (!name) {
    themeMessage('❌ Escribe el nombre del tema en español.', '#c62828');
    return;
  }

  const id = 'custom-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  if (cachedCustomThemes.some(t => t.id === id)) {
    themeMessage('❌ Ese tema ya existe.', '#c62828');
    return;
  }

  cachedCustomThemes.push({ id, name, nameEn: nameEn || name, emoji, color });

  try {
    await db.collection('settings').doc('global').set(
      { customThemes: cachedCustomThemes },
      { merge: true }
    );

    document.getElementById('custom-theme-name').value = '';
    document.getElementById('custom-theme-name-en').value = '';
    document.getElementById('custom-theme-emoji').value = '';

    await initThemeManager();
    themeMessage('✅ Tema "' + name + '" creado. Ya puedes seleccionarlo arriba.');
  } catch (e) {
    themeMessage('❌ Error: ' + e.message, '#c62828');
    cachedCustomThemes.pop();
  }
}