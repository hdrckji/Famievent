// Configuration de l'événement Power-up Lunch.
// Tout est centralisé ici pour pouvoir réutiliser le site pour un autre événement.

export const event = {
  name: "Power-up Lunch",
  dateLabel: "01/10/2026",
  timeLabel: "12:00 – 13:30",
  // Début de l'événement (fuseau Europe/Bruxelles)
  start: new Date("2026-10-01T12:00:00+02:00"),
  // Date/heure limite d'inscription
  registrationDeadline: new Date("2026-09-30T23:59:59+02:00"),
  location: {
    fr: "Au restaurant (dehors si le temps le permet)",
    nl: "In het restaurant (buiten bij mooi weer)",
  },
  tagline: {
    fr: "Un buffet healthy pour faire le plein d'énergie !",
    nl: "Een gezond buffet boordevol energie!",
  },
  intro: {
    fr: "Boost d'énergie pour bien démarrer la saison de Noël ! Rejoins tes collègues autour d'un buffet sain et convivial. Inscris-toi ci-dessous, c'est offert par Famiflora. 🔋",
    nl: "Energie-boost voor een goede start van het kerstseizoen! Sluit aan bij je collega's rond een gezond en gezellig buffet. Schrijf je hieronder in, aangeboden door Famiflora. 🔋",
  },
} as const;

export function registrationOpen(now: Date = new Date()): boolean {
  return now.getTime() <= event.registrationDeadline.getTime();
}
