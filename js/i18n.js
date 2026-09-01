const translations = {
  es: {
    login: {
      title: "Expedición Salvaje",
      subtitle: "Ingresa tu código de expedición",
      placeholder: "Tu código",
      button: "🐾 Iniciar misión",
      error: "Código no encontrado, intenta de nuevo",
      adminLink: "Soy Admin"
    },
    student: {
      myPoints: "Mis Puntos",
      myMedals: "Mis Medallas",
      myClasses: "Mis Clases",
      noMedals: "Aún no tienes medallas, ¡sigue participando!",
      noClasses: "Aún no tienes clases registradas",
      correctAnswers: "respuestas correctas",
      logout: "Cerrar sesión",
      accumulated: "Puntos acumulados",
      detail: "Detalle",
      ranking: "Clasificación",
      noRanking: "Aún no hay puntos registrados",
      pointsUnit: "pts",
      themeOfMonth: "Tema del mes"
    },
    admin: {
      dashboard: "Panel de Control",
      registerClass: "Registrar Clase",
      createMedal: "Crear Medalla",
      assignMedal: "Asignar Medalla",
      viewStudents: "Ver Alumnos",
      month: "Mes",
      theme: "Tema",
      className: "Nombre de la clase/animal",
      date: "Fecha",
      totalQuestions: "Total de preguntas",
      save: "Guardar",
      success: "¡Guardado exitosamente!",
      students: "Alumnos",
      classesMonth: "Clases este mes",
      medalsCreated: "Medallas creadas",
      recentActivity: "Última actividad",
      code: "Código",
      name: "Nombre",
      points: "Puntos",
      medals: "Medallas",
      classes: "Clases",
      actions: "Detalle",
      exportCSV: "📥 Exportar CSV",
      medalNameEs: "Nombre (ES)",
      medalNameEn: "Nombre (EN)",
      medalDescEs: "Descripción (ES)",
      medalDescEn: "Descripción (EN)",
      icon: "Ícono",
      color: "Color",
      criteria: "Criterio",
      manual: "Manual",
      singleClass: "X+ respuestas correctas en una clase",
      classesAttended: "Asistió a X clases",
      minValue: "Valor mínimo",
      selectStudent: "Seleccionar alumno",
      selectMedal: "Seleccionar medalla",
      note: "Nota (opcional)",
      username: "Usuario",
      enter: "Entrar",
      usernameError: "Usuario no reconocido",
      noData: "Sin datos",
      totalQuestionsLabel: "Total de preguntas",
      assignPoints: "Asignar Puntos",
      sectionHint: "Añade puntos a un alumno. Se suman directo a su total.",
      addPoints: "Agregar puntos",
      directAssignment: "Puntos asignados",
      successPoints: "Puntos agregados correctamente",
      current: "actual",
      themeHint: "Elige el tema del mes. Los alumnos lo verán como un banner con su color en su portal.",
      activeTheme: "Tema activo",
      themeColor: "Color del tema",
      themeSave: "Guardar tema del mes",
      customThemeTitle: "➕ Añadir tema personalizado",
      customThemeName: "Nombre (español)",
      customThemeNameEn: "Nombre (inglés)",
      customThemeEmoji: "Emoji",
      customThemeColor: "Color",
      customThemeCreate: "Crear tema personalizado"
    }
  },
  en: {
    login: {
      title: "Savage Expedition",
      subtitle: "Enter your expedition code",
      placeholder: "Your code",
      button: "🐾 Start Mission",
      error: "Code not found, try again",
      adminLink: "I'm Admin"
    },
    student: {
      myPoints: "My Points",
      myMedals: "My Medals",
      myClasses: "My Classes",
      noMedals: "You don't have medals yet, keep participating!",
      noClasses: "No classes registered yet",
      correctAnswers: "correct answers",
      logout: "Log out",
      accumulated: "Accumulated points",
      detail: "Detail",
      ranking: "Ranking",
      noRanking: "No points registered yet",
      pointsUnit: "pts",
      themeOfMonth: "Theme of the month"
    },
    admin: {
      dashboard: "Control Panel",
      registerClass: "Register Class",
      createMedal: "Create Medal",
      assignMedal: "Assign Medal",
      viewStudents: "View Students",
      month: "Month",
      theme: "Theme",
      className: "Class/animal name",
      date: "Date",
      totalQuestions: "Total questions",
      save: "Save",
      success: "Saved successfully!",
      students: "Students",
      classesMonth: "Classes this month",
      medalsCreated: "Medals created",
      recentActivity: "Recent activity",
      code: "Code",
      name: "Name",
      points: "Points",
      medals: "Medals",
      classes: "Classes",
      actions: "Detail",
      exportCSV: "📥 Export CSV",
      medalNameEs: "Name (ES)",
      medalNameEn: "Name (EN)",
      medalDescEs: "Description (ES)",
      medalDescEn: "Description (EN)",
      icon: "Icon",
      color: "Color",
      criteria: "Criteria",
      manual: "Manual",
      singleClass: "X+ correct answers in a single class",
      classesAttended: "Attended X classes",
      minValue: "Minimum value",
      selectStudent: "Select student",
      selectMedal: "Select medal",
      note: "Note (optional)",
      username: "Username",
      enter: "Enter",
      usernameError: "Username not recognized",
      noData: "No data",
      totalQuestionsLabel: "Total questions",
      assignPoints: "Assign Points",
      sectionHint: "Add points to a student. They're added straight to their total.",
      addPoints: "Add points",
      directAssignment: "Assigned points",
      successPoints: "Points added successfully",
      current: "current",
      themeHint: "Choose the theme of the month. Students will see it as a colored banner in their portal.",
      activeTheme: "Active theme",
      themeColor: "Theme color",
      themeSave: "Save theme of the month",
      customThemeTitle: "➕ Add custom theme",
      customThemeName: "Name (Spanish)",
      customThemeNameEn: "Name (English)",
      customThemeEmoji: "Emoji",
      customThemeColor: "Color",
      customThemeCreate: "Create custom theme"
    }
  }
};

let currentLang = localStorage.getItem('lang') || 'es';

function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      return key;
    }
  }
  return value;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateAllTexts();
}

function getLanguage() {
  return currentLang;
}

function updateAllTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  document.querySelectorAll('.lang-btn, .lang-btn-small').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.trim().toLowerCase() === currentLang) {
      btn.classList.add('active');
    }
  });
}
