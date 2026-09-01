// ============================================
// SCRIPT PARA AGREGAR ALUMNO DE PRUEBA
// ============================================
//
// INSTRUCCIONES:
// 1. Abre la consola del navegador (F12)
// 2. Ve a la pestaña "Console"
// 3. Copia y pega este script
// 4. Dale Enter
// ============================================

db.collection('students').doc('pruebawild75').set({
  name: "Prueba",
  animal: "León",
  emoji: "🦁",
  category: "trivia",
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
}).then(() => {
  console.log('✅ Alumno de prueba (pruebawild75) agregado correctamente');
}).catch(error => {
  console.error('❌ Error:', error);
});
