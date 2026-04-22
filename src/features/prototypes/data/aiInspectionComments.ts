export const aiInspectionComments = {
  headerTitle: 'Inspection',
  headerSubtitle: 'INS-0412',
  scoreBadge: '82',
  locationTitle: 'Learning Commons - Lobby',
  progressLabel: '3 of 8 items checked',
  checklistItems: [
    { label: 'Glass surfaces', status: 'pass' },
    { label: 'Floor corners', status: 'fail', reason: 'Smudges' },
    { label: 'Waste receptacles', status: 'pending' },
  ],
  aiSectionTitle: 'SAGE — Suggested Comment',
  aiComment:
    'Smudges found near south entry floor corners. This area has failed for the same reason in 2 of the last 3 inspections. Recommend adding to the nightly deep-clean rotation.',
  savedLabel: 'Comment saved',
  addCommentTitle: 'Add Comment',
  addCommentPlaceholder: 'Add your own comment...',
  acceptLabel: 'Accept',
  editLabel: 'Edit',
  saveLabel: 'Save',
  ignoreLabel: 'Ignore',
  patternLabel: 'Pattern Detected',
  patternText: 'This item has failed 2 of 3 recent inspections at this site.',
} as const;
