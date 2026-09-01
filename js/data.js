const STUDENTS = [
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
  { code: "Sienna_WhaleSong88", name: "Sienna", animal: "Ballena", emoji: "🐋", category: "trivia" },
  { code: "pruebawild75", name: "Prueba", animal: "León", emoji: "🦁", category: "trivia" }
];

const MEDAL_ICONS = [
  { id: "fish", emoji: "🐟" },
  { id: "star", emoji: "⭐" },
  { id: "trophy", emoji: "🏆" },
  { id: "fire", emoji: "🔥" },
  { id: "crown", emoji: "👑" },
  { id: "diamond", emoji: "💎" },
  { id: "heart", emoji: "❤️" },
  { id: "shield", emoji: "🛡️" }
];

const MONTHS = [
  { id: "septiembre-2025", name: "Septiembre 2025", nameEn: "September 2025", theme: "animales-marinos", themeEn: "marine-animals" },
  { id: "octubre-2025", name: "Octubre 2025", nameEn: "October 2025", theme: "animales-selva", themeEn: "jungle-animals" },
  { id: "noviembre-2025", name: "Noviembre 2025", nameEn: "November 2025", theme: "animales-arcticos", themeEn: "arctic-animals" },
  { id: "diciembre-2025", name: "Diciembre 2025", nameEn: "December 2025", theme: "animales-nocturnos", themeEn: "nocturnal-animals" }
];

const THEMES = [
  { id: "animales-marinos", name: "Animales Marinos", nameEn: "Marine Animals", emoji: "🌊", color: "#0077B6" },
  { id: "animales-selva", name: "Animales de la Selva", nameEn: "Jungle Animals", emoji: "🦁", color: "#2E7D32" },
  { id: "animales-arcticos", name: "Animales del Ártico", nameEn: "Arctic Animals", emoji: "🐧", color: "#90CAF9" },
  { id: "animales-nocturnos", name: "Animales Nocturnos", nameEn: "Nocturnal Animals", emoji: "🦉", color: "#37474F" },
  { id: "animales-granja", name: "Animales de la Granja", nameEn: "Farm Animals", emoji: "🐄", color: "#8D6E63" },
  { id: "animales-desierto", name: "Animales del Desierto", nameEn: "Desert Animals", emoji: "🐪", color: "#F4A340" },
  { id: "animales-sabana", name: "Animales de la Sabana", nameEn: "Savanna Animals", emoji: "🦓", color: "#E0A93A" },
  { id: "animales-jungla", name: "Animales de la Jungla", nameEn: "Jungle Animals", emoji: "🐍", color: "#388E3C" },
  { id: "animales-montana", name: "Animales de la Montaña", nameEn: "Mountain Animals", emoji: "🐐", color: "#78909C" },
  { id: "animales-bosque", name: "Animales del Bosque", nameEn: "Forest Animals", emoji: "🦌", color: "#558B2F" },
  { id: "animales-australia", name: "Animales de Australia", nameEn: "Australian Animals", emoji: "🦘", color: "#D84315" },
  { id: "animales-polo", name: "Animales del Polo", nameEn: "Polar Animals", emoji: "🐻‍❄️", color: "#B3E5FC" },
  { id: "animales-africa", name: "Animales de África", nameEn: "African Animals", emoji: "🐘", color: "#EF6C00" },
  { id: "animales-rio", name: "Animales del Río", nameEn: "River Animals", emoji: "🐊", color: "#00695C" },
  { id: "animales-pajaro", name: "Animales Voladores", nameEn: "Flying Animals", emoji: "🦅", color: "#42A5F5" },
  { id: "animales-invertebrados", name: "Animales Invertebrados", nameEn: "Invertebrates", emoji: "🐙", color: "#AB47BC" },
  { id: "animales-reptiles", name: "Animales Reptiles", nameEn: "Reptiles", emoji: "🦎", color: "#7CB342" },
  { id: "animales-dinosaurios", name: "Animales Prehistóricos", nameEn: "Prehistoric Animals", emoji: "🦖", color: "#5D4037" },
  { id: "animales-domesticos", name: "Animales Domésticos", nameEn: "Pets", emoji: "🐶", color: "#C0CA33" },
  { id: "animales-insectos", name: "Insectos y Bichos", nameEn: "Insects & Bugs", emoji: "🐞", color: "#9E9D24" },
  { id: "animales-anfibios", name: "Animales Anfibios", nameEn: "Amphibians", emoji: "🐸", color: "#43A047" },
  { id: "animales-ecuador", name: "Animales de Ecuador", nameEn: "Ecuadorian Animals", emoji: "🦜", color: "#E53935" },
  { id: "animales-pinguinos", name: "Los Pingüinos", nameEn: "Penguins", emoji: "🐧", color: "#455A64" },
  { id: "animales-ballenas", name: "Las Ballenas", nameEn: "Whales", emoji: "🐋", color: "#1E88E5" },
  { id: "animales-tiburones", name: "Los Tiburones", nameEn: "Sharks", emoji: "🦈", color: "#1565C0" },
  { id: "animales-delfines", name: "Los Delfines", nameEn: "Dolphins", emoji: "🐬", color: "#00ACC1" },
  { id: "animales-caballos", name: "Los Caballos", nameEn: "Horses", emoji: "🐴", color: "#6D4C41" },
  { id: "animales-perros", name: "Los Perros", nameEn: "Dogs", emoji: "🐕", color: "#795548" },
  { id: "animales-gatos", name: "Los Gatos", nameEn: "Cats", emoji: "🐱", color: "#8E24AA" },
  { id: "animales-mariposas", name: "Las Mariposas", nameEn: "Butterflies", emoji: "🦋", color: "#EC407A" },
  { id: "animales-abejas", name: "Las Abejas", nameEn: "Bees", emoji: "🐝", color: "#FBC02D" },
  { id: "animales-focas", name: "Las Focas", nameEn: "Seals", emoji: "🦭", color: "#80DEEA" },
  { id: "animales-estrella", name: "Estrellas de Mar", nameEn: "Starfish", emoji: "⭐", color: "#FF7043" },
  { id: "animales-cocodrilos", name: "Los Cocodrilos", nameEn: "Crocodiles", emoji: "🐊", color: "#33691E" },
  { id: "animales-leones", name: "Los Leones", nameEn: "Lions", emoji: "🦁", color: "#F57F17" },
  { id: "animales-tigres", name: "Los Tigres", nameEn: "Tigers", emoji: "🐯", color: "#E65100" },
  { id: "animales-osos", name: "Los Osos", nameEn: "Bears", emoji: "🐻", color: "#4E342E" },
  { id: "animales-monos", name: "Los Monos", nameEn: "Monkeys", emoji: "🐵", color: "#D4A056" },
  { id: "animales-cebras", name: "Las Cebras", nameEn: "Zebras", emoji: "🦓", color: "#546E7A" },
  { id: "animales-jirafas", name: "Las Jirafas", nameEn: "Giraffes", emoji: "🦒", color: "#EF8F00" }
];

function getThemeById(id) {
  if (!id) return null;
  return THEMES.find(t => t.id === id) || null;
}

function combineThemes(customThemes) {
  if (!customThemes || customThemes.length === 0) return THEMES;
  return THEMES.concat(customThemes);
}

function getStudentByCode(code) {
  return STUDENTS.find(s => s.code.toLowerCase() === code.trim().toLowerCase());
}

function getMedalEmoji(iconId) {
  const icon = MEDAL_ICONS.find(i => i.id === iconId);
  return icon ? icon.emoji : "🏅";
}
