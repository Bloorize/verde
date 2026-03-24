import {
  AnalyticsPayload,
  CaseRecord,
  DashboardMetrics,
  DocumentRecord,
  Employee,
  Inspection,
  Manager,
  PaginatedResponse,
  Region,
  ServiceCoverageLog,
  Site,
  SiteConfig,
  Space,
  Survey,
  TrainingCourse,
  TrainingSession,
  WorkItem,
} from '@/src/types/domain';
import {
  baseSiteConfig,
  mockAnalyticsBySite,
  mockCases,
  mockCoverageLogs,
  mockDashboardBySite,
  mockDocuments,
  mockEmployees,
  mockInspections,
  mockManagers,
  mockRegions,
  mockSites,
  mockSurveys,
  mockTrainingCourses,
  mockTrainingSessions,
  mockWorkItems,
} from '@/src/data/mockData';

const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

interface WorkItemFilterParams {
  filter?: 'Open' | 'Closed' | 'Overdue' | 'Mine';
  currentUserName?: string;
}

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

class MockSupabaseService {
  private inspections = clone(mockInspections);
  private workItems = clone(mockWorkItems);
  private cases = clone(mockCases);
  private employees = clone(mockEmployees);
  private siteConfigs = clone(baseSiteConfig);

  async listSites(): Promise<Site[]> {
    await wait();
    return clone(mockSites);
  }

  async listRegions(): Promise<Region[]> {
    await wait();
    return clone(mockRegions);
  }

  async listManagers(): Promise<Manager[]> {
    await wait();
    return clone(mockManagers);
  }

  async getDashboardMetrics(siteId: string): Promise<DashboardMetrics> {
    await wait();
    return clone(mockDashboardBySite[siteId] ?? mockDashboardBySite.site_1);
  }

  async getAnalyticsSeries(siteId: string): Promise<AnalyticsPayload> {
    await wait();
    return clone(mockAnalyticsBySite[siteId] ?? mockAnalyticsBySite.site_1);
  }

  async listInspections(siteId: string, pagination: PaginationParams = {}): Promise<PaginatedResponse<Inspection>> {
    await wait();
    const { page = 1, pageSize = 20 } = pagination;
    const filtered = this.inspections.filter((inspection) => inspection.siteId === siteId);
    const start = (page - 1) * pageSize;
    return {
      data: clone(filtered.slice(start, start + pageSize)),
      total: filtered.length,
    };
  }

  async getInspection(inspectionId: string): Promise<Inspection | undefined> {
    await wait();
    return clone(this.inspections.find((inspection) => inspection.id === inspectionId));
  }

  async createInspection(inspection: Inspection): Promise<Inspection> {
    await wait(300);
    const payload: Inspection = { ...inspection, id: `insp_${Date.now()}` };
    this.inspections = [payload, ...this.inspections];
    return clone(payload);
  }

  async listWorkItems(
    siteId: string,
    params: WorkItemFilterParams = {},
    pagination: PaginationParams = {},
  ): Promise<PaginatedResponse<WorkItem>> {
    await wait();
    const { page = 1, pageSize = 30 } = pagination;
    const { filter = 'Open', currentUserName = 'Brandon Dastrup' } = params;

    const bySite = this.workItems.filter((workItem) => workItem.siteId === siteId);
    const byFilter = bySite.filter((workItem) => {
      if (filter === 'Mine') return workItem.assignee === currentUserName;
      if (filter === 'Overdue') return workItem.status === 'Overdue';
      return workItem.status === filter;
    });

    const start = (page - 1) * pageSize;
    return {
      data: clone(byFilter.slice(start, start + pageSize)),
      total: byFilter.length,
    };
  }

  async getWorkItem(workItemId: string): Promise<WorkItem | undefined> {
    await wait();
    return clone(this.workItems.find((workItem) => workItem.id === workItemId));
  }

  async updateWorkItem(workItemId: string, patch: Partial<WorkItem>): Promise<WorkItem | undefined> {
    await wait();
    this.workItems = this.workItems.map((workItem) =>
      workItem.id === workItemId
        ? {
            ...workItem,
            ...patch,
            history: [...workItem.history, `Updated on ${new Date().toLocaleString()}`],
          }
        : workItem,
    );
    return this.getWorkItem(workItemId);
  }

  async listCases(siteId: string): Promise<CaseRecord[]> {
    await wait();
    return clone(this.cases.filter((item) => item.siteId === siteId));
  }

  async getCase(caseId: string): Promise<CaseRecord | undefined> {
    await wait();
    return clone(this.cases.find((record) => record.id === caseId));
  }

  async listEmployees(siteId: string): Promise<Employee[]> {
    await wait();
    const siteName = mockSites.find((site) => site.id === siteId)?.name;
    return clone(this.employees.filter((employee) => (siteName ? employee.sites.includes(siteName) : true)));
  }

  async getEmployee(employeeId: string): Promise<Employee | undefined> {
    await wait();
    return clone(this.employees.find((employee) => employee.id === employeeId));
  }

  async listTrainingCourses(): Promise<TrainingCourse[]> {
    await wait();
    return clone(mockTrainingCourses);
  }

  async listTrainingSessions(): Promise<TrainingSession[]> {
    await wait();
    return clone(mockTrainingSessions);
  }

  async listSurveys(): Promise<Survey[]> {
    await wait();
    return clone(mockSurveys);
  }

  async getSurvey(surveyId: string): Promise<Survey | undefined> {
    await wait();
    return clone(mockSurveys.find((survey) => survey.id === surveyId));
  }

  async listDocuments(siteId: string): Promise<DocumentRecord[]> {
    await wait();
    return clone(mockDocuments.filter((doc) => doc.siteId === siteId));
  }

  async getDocument(documentId: string): Promise<DocumentRecord | undefined> {
    await wait();
    return clone(mockDocuments.find((doc) => doc.id === documentId));
  }

  async listCoverageLogs(siteId: string): Promise<ServiceCoverageLog[]> {
    await wait();
    return clone(mockCoverageLogs.filter((log) => log.siteId === siteId));
  }

  async getCoverageLog(scanId: string): Promise<ServiceCoverageLog | undefined> {
    await wait();
    return clone(mockCoverageLogs.find((log) => log.id === scanId));
  }

  async getSiteConfig(siteId: string): Promise<SiteConfig | undefined> {
    await wait();
    return clone(this.siteConfigs.find((config) => config.site.id === siteId));
  }

  async upsertSpace(siteId: string, payload: Omit<Space, 'id'> & { id?: string }): Promise<Space | undefined> {
    await wait();
    const config = this.siteConfigs.find((item) => item.site.id === siteId);
    if (!config) return undefined;

    if (payload.id) {
      config.spaces = config.spaces.map((space) => (space.id === payload.id ? { ...space, ...payload } : space));
      return clone(config.spaces.find((space) => space.id === payload.id));
    }

    const newSpace: Space = { id: `sp_${Date.now()}`, ...payload };
    config.spaces = [newSpace, ...config.spaces];
    return clone(newSpace);
  }
}

export const mockSupabase = new MockSupabaseService();
