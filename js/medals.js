async function checkAutoAwards(studentCode) {
  try {
    const classesSnap = await db.collection('results')
      .where('studentCode', '==', studentCode)
      .get();

    const classes = classesSnap.docs.map(d => d.data());
    const medalsSnap = await db.collection('medals').get();

    for (const medalDoc of medalsSnap.docs) {
      const medal = medalDoc.data();
      if (!medal.criteria || medal.criteria.type === 'manual') continue;

      let qualifies = false;

      if (medal.criteria.type === 'single_class_score') {
        qualifies = classes.some(c => c.correctAnswers >= medal.criteria.minCorrect);
      }

      if (medal.criteria.type === 'classes_attended') {
        qualifies = classes.length >= medal.criteria.minClasses;
      }

      if (qualifies) {
        const existing = await db.collection('awards')
          .where('studentCode', '==', studentCode)
          .where('medalId', '==', medalDoc.id)
          .get();

        if (existing.empty) {
          await db.collection('awards').add({
            studentCode: studentCode,
            medalId: medalDoc.id,
            date: new Date().toISOString().split('T')[0],
            note: 'Medalla otorgada automáticamente',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      }
    }
  } catch (e) {
    console.error('Error en checkAutoAwards:', e);
  }
}
