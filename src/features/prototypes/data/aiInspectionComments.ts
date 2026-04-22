export const aiInspectionComments = {
  headerTitle: 'Inspection',
  headerSubtitle: 'INS-0412',
  scoreBadge: '82',
  locationTitle: 'Learning Commons - Lobby',
  progressLabel: '3 of 8 items checked',
  originalNoteTitle: 'Original inspection note',
  originalNote:
    'Floor corners near the south entry still show smudges after service. This item failed again on tonight\'s walkthrough.',
  aiRewriteTitle: 'AI rewrite',
  aiRewrite:
    'Smudges found near the south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding the lobby edge detail to the nightly deep-clean rotation.',
  severityTitle: 'Severity framing',
  severityLabel: 'Moderate recurrence',
  severitySummary:
    'This is not a safety issue, but it is visible to occupants and repeats often enough to signal a process gap rather than a one-off miss.',
  followUpTitle: 'Recommended follow-up',
  followUpIntro:
    'Use the next shift handoff to close the loop and reduce the chance of another repeat failure.',
  followUpSteps: [
    'Add the south entry corners to the nightly deep-clean rotation.',
    'Reinspect the area on the next supervisor walkthrough before 7:00 AM.',
    'If the issue appears again this week, open a coaching note for the lobby checklist owner.',
  ],
} as const;
