type QueryLanguage = 'raw' | 'en' | 'es';

export const queryKeys = {
  dashboard: (siteId: string, language: QueryLanguage = 'raw') => ['dashboard', siteId, language] as const,
  analytics: (siteId: string, language: QueryLanguage = 'raw') => ['analytics', siteId, language] as const,
  inspections: (siteId: string, language: QueryLanguage = 'raw') => ['inspections', siteId, language] as const,
  inspection: (inspectionId: string, language: QueryLanguage = 'raw') => ['inspection', inspectionId, language] as const,
  workItems: (siteId: string, filter: string, language: QueryLanguage = 'raw') =>
    ['work-items', siteId, filter, language] as const,
  workItem: (workItemId: string, language: QueryLanguage = 'raw') => ['work-item', workItemId, language] as const,
  cases: (siteId: string, language: QueryLanguage = 'raw') => ['cases', siteId, language] as const,
  case: (caseId: string, language: QueryLanguage = 'raw') => ['case', caseId, language] as const,
  employees: (siteId: string, language: QueryLanguage = 'raw') => ['employees', siteId, language] as const,
  employee: (employeeId: string, language: QueryLanguage = 'raw') => ['employee', employeeId, language] as const,
  trainingCourses: () => ['training-courses'] as const,
  trainingSessions: () => ['training-sessions'] as const,
  surveys: () => ['surveys'] as const,
  survey: (surveyId: string, language: QueryLanguage = 'raw') => ['survey', surveyId, language] as const,
  documents: (siteId: string, language: QueryLanguage = 'raw') => ['documents', siteId, language] as const,
  document: (documentId: string, language: QueryLanguage = 'raw') => ['document', documentId, language] as const,
  coverageLogs: (siteId: string) => ['coverage-logs', siteId] as const,
  coverageLog: (scanId: string, language: QueryLanguage = 'raw') => ['coverage-log', scanId, language] as const,
  siteConfig: (siteId: string) => ['site-config', siteId] as const,
  sites: () => ['sites'] as const,
  regions: () => ['regions'] as const,
  managers: () => ['managers'] as const,
};
