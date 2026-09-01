async function initStudentPortal() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) {
    window.location.href = 'index.html';
    return;
  }

  const student = getStudentByCode(code);
  if (!student) {
    window.location.href = 'index.html';
    return;
  }

  sessionStorage.setItem('studentCode', student.code);

  document.getElementById('student-name').textContent = student.name;
  document.getElementById('student-code').textContent = student.code;
  document.getElementById('student-animal').textContent = student.emoji;

  renderActiveTheme();

  const points = await calculatePoints(student.code);
  animateCounter(document.getElementById('total-points'), 0, points, 1000);

  const ranking = await getRanking();
  renderRanking(ranking);

  const medals = await getStudentMedals(student.code);
  renderMedals(medals);

  const classes = await getStudentClasses(student.code);
  renderClasses(classes);

  updateAllTexts();
}

async function getCurrentMonth() {
  try {
    const settingsDoc = await db.collection('settings').doc('global').get();
    if (settingsDoc.exists) {
      return settingsDoc.data().currentMonth;
    }
  } catch (e) {}
  
  const now = new Date();
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return months[now.getMonth()] + '-' + now.getFullYear();
}

async function calculatePoints(studentCode) {
  try {
    const results = await db.collection('results')
      .where('studentCode', '==', studentCode)
      .get();
    let total = 0;
    results.forEach(doc => {
      total += doc.data().correctAnswers;
    });
    return total;
  } catch (e) {
    console.error('Error calculando puntos:', e);
    return 0;
  }
}

async function getStudentMedals(studentCode) {
  try {
    const awards = await db.collection('awards')
      .where('studentCode', '==', studentCode)
      .get();

    const medals = [];
    for (const award of awards.docs) {
      const medalDoc = await db.collection('medals').doc(award.data().medalId).get();
      if (medalDoc.exists) {
        medals.push({
          ...medalDoc.data(),
          id: medalDoc.id,
          date: award.data().date,
          note: award.data().note
        });
      }
    }
    return medals;
  } catch (e) {
    console.error('Error cargando medallas:', e);
    return [];
  }
}

async function getStudentClasses(studentCode) {
  try {
    const results = await db.collection('results')
      .where('studentCode', '==', studentCode)
      .get();
    return results.docs.map(doc => doc.data());
  } catch (e) {
    console.error('Error cargando clases:', e);
    return [];
  }
}

function animateCounter(element, start, end, duration) {
  if (!element) return;
  const range = end - start;
  if (range === 0) { element.textContent = start; return; }
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(start + (range * progress));
    element.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

async function renderActiveTheme() {
  try {
    const banner = document.getElementById('theme-banner');
    if (!banner) return;

    const settingsDoc = await db.collection('settings').doc('global').get();
    const settings = settingsDoc.exists ? settingsDoc.data() : {};

    const themeId = settings.activeTheme || 'animales-marinos';
    const customColor = settings.activeThemeColor || null;
    const customThemes = settings.customThemes || [];

    const allThemes = combineThemes(customThemes);
    const theme = allThemes.find(t => t.id === themeId) || getThemeById('animales-marinos');

    if (!theme) {
      banner.style.display = 'none';
      return;
    }

    const color = customColor || theme.color || '#0077B6';
    const name = getLanguage() === 'en' ? (theme.nameEn || theme.name) : theme.name;

    banner.innerHTML =
      '<span class="theme-emoji">' + (theme.emoji || '🐾') + '</span>' +
      '<span class="theme-caption">' + t('student.themeOfMonth') + '</span>' +
      '<span class="theme-name">' + name + '</span>';

    banner.style.background = 'linear-gradient(135deg, ' + color + ', ' + color + 'CC)';
    banner.style.display = 'flex';
  } catch (e) {
    console.error('Error cargando tema:', e);
  }
}

async function getRanking() {
  try {
    const snapshot = await db.collection('results').get();
    const totals = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      if (!data.studentCode) return;
      totals[data.studentCode] = (totals[data.studentCode] || 0) + (data.correctAnswers || 0);
    });

    const currentCode = sessionStorage.getItem('studentCode');

    return Object.entries(totals)
      .filter(([, points]) => points > 0)
      .map(([code, points]) => {
        const student = getStudentByCode(code);
        return {
          code,
          name: student ? student.name : code,
          emoji: student ? student.emoji : '🐾',
          points,
          isMe: code === currentCode
        };
      })
      .sort((a, b) => b.points - a.points);
  } catch (e) {
    console.error('Error calculando ranking:', e);
    return [];
  }
}

function renderRanking(ranking) {
  const container = document.getElementById('ranking-container');
  if (!container) return;

  if (ranking.length === 0) {
    container.innerHTML = '<p class="no-data">' + t('student.noRanking') + '</p>';
    return;
  }

  container.innerHTML = ranking.map((entry, index) => `
    <div class="ranking-row ${entry.isMe ? 'ranking-me' : ''}">
      <span class="rank-badge">${getRankBadge(index + 1)}</span>
      <span class="rank-animal">${entry.emoji}</span>
      <span class="rank-name">${entry.name}</span>
      <span class="rank-points">${entry.points} ${t('student.pointsUnit')}</span>
    </div>
  `).join('');
}

function getRankBadge(position) {
  if (position === 1) return '🥇';
  if (position === 2) return '🥈';
  if (position === 3) return '🥉';
  return position;
}

function renderMedals(medals) {
  const container = document.getElementById('medals-container');
  if (!container) return;

  if (medals.length === 0) {
    container.innerHTML = '<p class="no-data">' + t('student.noMedals') + '</p>';
    return;
  }

  container.innerHTML = medals.map(medal => `
    <div class="medal-card" style="border-left-color: ${medal.color || '#FFD700'}">
      <div class="medal-icon">${getMedalEmoji(medal.icon)}</div>
      <div class="medal-name">${medal.name || ''}</div>
      <div class="medal-date">${medal.date || ''}</div>
      ${medal.note ? '<div class="medal-note">' + medal.note + '</div>' : ''}
    </div>
  `).join('');
}

function renderClasses(classes) {
  const container = document.getElementById('classes-container');
  if (!container) return;

  if (classes.length === 0) {
    container.innerHTML = '<p class="no-data">' + t('student.noClasses') + '</p>';
    return;
  }

  container.innerHTML = classes.map(cls => `
    <div class="class-card">
      <div class="class-header">
        <h3>${cls.className}</h3>
        <span class="class-month">${cls.month}</span>
      </div>
      <div class="class-score">
        <span class="correct">${cls.correctAnswers}</span>
        <span class="separator">/</span>
        <span class="total">${cls.totalQuestions}</span>
        <span class="label">${t('student.correctAnswers')}</span>
      </div>
      <div class="class-stars">${renderStars(cls.correctAnswers, cls.totalQuestions)}</div>
      <div class="class-date">${cls.date}</div>
    </div>
  `).join('');
}

function renderStars(correct, total) {
  if (!total || total === 0) return '';
  const stars = Math.round((correct / total) * 5);
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += i < stars ? '⭐' : '☆';
  }
  return html;
}
