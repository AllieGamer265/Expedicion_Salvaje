// ============================================
// SCRIPT DE DIAGNÓSTICO - Ejecutar en consola
// ============================================
// Abre index.html, F12 → Console, pega esto y dale Enter

async function diagnosticar() {
  console.log("🔍 Diagnóstico de Expedición Salvaje");
  console.log("=====================================");

  // 1. Verificar conexión a Firestore
  try {
    console.log("\n1️⃣ Probando conexión a Firestore...");
    await db.collection('_test').doc('ping').set({ timestamp: new Date() });
    console.log("   ✅ Conexión OK - Firestore responde");
    await db.collection('_test').doc('ping').delete();
  } catch (e) {
    console.log("   ❌ Error de conexión:", e.message);
    console.log("   🔧 Solución: Revisar reglas de Firestore");
    return;
  }

  // 2. Verificar alumnos
  try {
    console.log("\n2️⃣ Buscando alumnos...");
    const studentsSnap = await db.collection('students').get();
    console.log("   📊 Total alumnos:", studentsSnap.size);
    studentsSnap.forEach(doc => {
      console.log("   →", doc.id, "=", doc.data().name);
    });
  } catch (e) {
    console.log("   ❌ Error leyendo alumnos:", e.message);
  }

  // 3. Verificar resultados del alumno de prueba
  try {
    console.log("\n3️⃣ Buscando resultados de pruebawild75...");
    const resultsSnap = await db.collection('results')
      .where('studentCode', '==', 'pruebawild75')
      .get();
    console.log("   📊 Resultados encontrados:", resultsSnap.size);
    resultsSnap.forEach(doc => {
      const d = doc.data();
      console.log("   →", d.className, ":", d.correctAnswers, "/", d.totalQuestions);
    });
  } catch (e) {
    console.log("   ❌ Error leyendo resultados:", e.message);
    console.log("   💡 Puede que necesites crear un índice复合索引");
  }

  // 4. Verificar todos los resultados (sin filtro)
  try {
    console.log("\n4️⃣ Todos los resultados (sin filtro)...");
    const allResults = await db.collection('results').limit(20).get();
    console.log("   📊 Total resultados en BD:", allResults.size);
    allResults.forEach(doc => {
      const d = doc.data();
      console.log("   →", d.studentCode, "|", d.className, "|", d.correctAnswers, "/", d.totalQuestions);
    });
  } catch (e) {
    console.log("   ❌ Error:", e.message);
  }
}

diagnosticar();
