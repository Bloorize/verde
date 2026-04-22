export type PlainLanguageWorkItemLanguage = 'en' | 'es';

export const plainLanguageWorkItem = {
  headerTitle: 'Work Item',
  headerSubtitle: 'WI-2847',
  priorityBadge: 'HIGH',
  locationTitle: 'Building C - Restroom 114',
  dueLabel: 'Due Today, 2:00 PM',
  aiSectionTitle: 'SAGE - AI Translation',
  whyLabel: 'Why this task?',
  whyText: 'A supervisor noticed this area needs attention during their walkthrough.',
  estimate: 'Estimated time: ~25 min',
  expanderLabel: 'View original supervisor notes',
  expanderBody: 'RR 114 bldg C - grout + drain. Poss. mold. Sealant if needed. Photo req.',
  completeLabel: 'Mark Complete',
  completedLabel: 'Completed',
  doneMessage: 'Done! Sent to supervisor.',
  translations: {
    en: {
      title: 'Restroom Cleaning - Building C',
      steps: [
        'Go to Restroom 114 in Building C',
        'Clean tile grout lines near the floor',
        'Check for mold near the floor drain',
        'If mold is present, apply sealant (on supply cart)',
        'Take a photo when done and mark complete',
      ],
    },
    es: {
      title: 'Limpieza de bano - Edificio C',
      steps: [
        'Ve al Bano 114 en el Edificio C',
        'Limpia las lineas de lechada en el piso',
        'Revisa si hay moho cerca del desague',
        'Si hay moho, aplica sellador (en el carrito de suministros)',
        'Toma una foto cuando termines y marca como completado',
      ],
    },
  },
} as const;
