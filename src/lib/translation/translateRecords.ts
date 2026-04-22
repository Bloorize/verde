import {
  AnalyticsPayload,
  CaseRecord,
  DashboardMetrics,
  DocumentRecord,
  Employee,
  Inspection,
  ServiceCoverageLog,
  Survey,
  WorkItem,
} from '@/src/types/domain';
import { SupportedLanguage } from '@/src/lib/language';

import { translateText, translateTextList } from './translator';

const translateOptional = async (value: string | undefined, language: SupportedLanguage): Promise<string | undefined> => {
  if (!value) {
    return value;
  }

  return translateText(value, language);
};

export const translateDashboardMetrics = async (
  metrics: DashboardMetrics,
  language: SupportedLanguage,
): Promise<DashboardMetrics> => ({
  ...metrics,
  suggestions: await translateTextList(metrics.suggestions, language),
  workItemAgingAlert: await translateText(metrics.workItemAgingAlert, language),
});

export const translateAnalyticsPayload = async (
  payload: AnalyticsPayload,
  language: SupportedLanguage,
): Promise<AnalyticsPayload> => ({
  ...payload,
  inspectionScoreTrends: await Promise.all(
    payload.inspectionScoreTrends.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  workItemAging: await Promise.all(
    payload.workItemAging.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  serviceCoverage: await Promise.all(
    payload.serviceCoverage.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  incidents: await Promise.all(
    payload.incidents.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  complaints: await Promise.all(
    payload.complaints.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  surveys: await Promise.all(
    payload.surveys.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
  budgets: await Promise.all(
    payload.budgets.map(async (point) => ({
      ...point,
      label: await translateText(point.label, language),
    })),
  ),
});

export const translateWorkItem = async (item: WorkItem, language: SupportedLanguage): Promise<WorkItem> => ({
  ...item,
  title: await translateText(item.title, language),
  space: await translateText(item.space, language),
  notes: await translateText(item.notes, language),
  comments: await translateTextList(item.comments, language),
  history: await translateTextList(item.history, language),
});

export const translateCaseRecord = async (record: CaseRecord, language: SupportedLanguage): Promise<CaseRecord> => ({
  ...record,
  title: await translateText(record.title, language),
  comments: await translateTextList(record.comments, language),
  auditHistory: await translateTextList(record.auditHistory, language),
});

export const translateSurvey = async (survey: Survey, language: SupportedLanguage): Promise<Survey> => ({
  ...survey,
  title: await translateText(survey.title, language),
  comments: await translateTextList(survey.comments, language),
});

export const translateEmployee = async (employee: Employee, language: SupportedLanguage): Promise<Employee> => ({
  ...employee,
  role: await translateText(employee.role, language),
  assignedSites: await translateTextList(employee.assignedSites, language),
  trainingTranscript: await translateTextList(employee.trainingTranscript, language),
  inspectionActivity: await translateText(employee.inspectionActivity, language),
});

export const translateInspection = async (inspection: Inspection, language: SupportedLanguage): Promise<Inspection> => ({
  ...inspection,
  buildingName: await translateText(inspection.buildingName, language),
  rooms: await Promise.all(
    inspection.rooms.map(async (room) => ({
      ...room,
      name: await translateText(room.name, language),
      items: await Promise.all(
        room.items.map(async (item) => ({
          ...item,
          name: await translateText(item.name, language),
          notes: await translateOptional(item.notes, language),
        })),
      ),
    })),
  ),
  comments: await translateTextList(inspection.comments, language),
  notes: await translateOptional(inspection.notes, language),
});

export const translateDocumentRecord = async (
  documentRecord: DocumentRecord,
  language: SupportedLanguage,
): Promise<DocumentRecord> => ({
  ...documentRecord,
  title: await translateText(documentRecord.title, language),
});

export const translateCoverageLog = async (
  coverageLog: ServiceCoverageLog,
  language: SupportedLanguage,
): Promise<ServiceCoverageLog> => ({
  ...coverageLog,
  spaceName: await translateText(coverageLog.spaceName, language),
});
