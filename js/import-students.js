// ============================================
// SCRIPT PARA IMPORTAR ALUMNOS A FIRESTORE
// ============================================
//
// INSTRUCCIONES:
// 1. Abre la consola del navegador (F12)
// 2. Ve a la pestaña "Console"
// 3. Copia y pega este script
// 4. Dale Enter
// ============================================

const STUDENTS_TO_IMPORT = [
  { code: "Coyote_Wild_260", name: "Dylan", animal: "Coyote", emoji: "🐺", category: "trivia" },
  { code: "Isa_Wolf_900", name: "Isabella", animal: "Lobo", emoji: "🐺", category: "trivia" },
  { code: "Sammy_Shark_260", name: "Samantha", animal: "Tiburón", emoji: "🦈", category: "trivia" },
  { code: "Blue_FlamingoPink99", name: "Azul", animal: "Flamenco", emoji: "🦩", category: "trivia" },
  { code: "Luanna_DuckSplash04", name: "Luanna", animal: "Pantera", emoji: "🐆", category: "trivia" },
  { code: "Ary_Tiger_05", name: "Ary", animal: "Tigre", emoji: "🐅", category: "trivia" },
  { code: "WhiteRabbit_Luna", name: "Luna", animal: "Conejo Blanco", emoji: "🐇", category: "trivia" },
  { code: "Benja_Bear_04", name: "Benja", animal: "Oso", emoji: "🐻", category: "trivia" },
  { code: "Capy_Lore_260", name: "Loretta", animal: "Capibara", emoji: "🦫", category: "trivia" },
  { code: "Lili_Tiger_6th", name: "Lili", animal: "Tigre", emoji: "🐅", category: "trivia" },
  { code: "Omar_Wolf_99", name: "Omar", animal: "Lobo", emoji: "🐺", category: "trivia" },
  { code: "pruebawild75", name: "Prueba", animal: "León", emoji: "🦁", category: "trivia" }
];

async function importStudents() {
  console.log("🐾 Importando alumnos a Firestore...");

  for (const student of STUDENTS_TO_IMPORT) {
    try {
      await db.collection('students').doc(student.code).set({
        name: student.name,
        animal: student.animal,
        emoji: student.emoji,
        category: student.category,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log(`✅ ${student.name} (${student.code}) importado`);
    } catch (error) {
      console.error(`❌ Error importando ${student.name}:`, error);
    }
  }

  // Crear settings globales
  try {
    await db.collection('settings').doc('global').set({
      currentMonth: 'septiembre-2025',
      currentTheme: 'animales-marinos',
      language: 'es',
      adminUsername: 'WildCaptain_260'
    });
    console.log("✅ Settings globales creados");
  } catch (error) {
    console.error("❌ Error creando settings:", error);
  }

  console.log("🎉 ¡Importación completada!");
}

// Ejecutar importación
importStudents();
