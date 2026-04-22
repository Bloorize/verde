import { create } from 'zustand';

import { inspectionChecklistItems } from '@/src/data/checklist';
import { persistLanguage, loadStoredLanguage, SupportedLanguage } from '@/src/lib/language';
import { setI18nLanguage } from '@/src/i18n';
import { mockSites, mockSpaceTypes } from '@/src/data/mockData';
import { CurrentUser, InspectionFailureReason } from '@/src/types/domain';
import { DraftInspectionItem, DraftInspectionRoom, InspectionType } from '@/src/types/wizard';

interface UiSlice {
  selectedSiteId: string;
  isMobileNavOpen: boolean;
  isAskSageOpen: boolean;
  notificationCount: number;
  language: SupportedLanguage;
  isLanguageHydrated: boolean;
  setSelectedSiteId: (siteId: string) => void;
  setMobileNavOpen: (open: boolean) => void;
  setAskSageOpen: (open: boolean) => void;
  toggleAskSage: () => void;
  toggleMobileNav: () => void;
  setLanguage: (language: SupportedLanguage) => Promise<void>;
  hydrateLanguage: () => Promise<void>;
}

interface SessionSlice {
  isAuthenticated: boolean;
  currentUser: CurrentUser;
  signIn: () => void;
  signOut: () => void;
}

interface InspectionDraftSlice {
  step: 1 | 2 | 3 | 4 | 5;
  type: InspectionType;
  baseline: boolean;
  jointInspection: boolean;
  inspectionDate: string;
  buildingId?: string;
  floorId?: string;
  spaceTypeId?: string;
  roomIdentifier: string;
  completedRooms: DraftInspectionRoom[];
  activeRoomItems: DraftInspectionItem[];
  activeRoomScore: number;
  notes: string;
  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  setMeta: (payload: Partial<Pick<InspectionDraftSlice, 'type' | 'baseline' | 'jointInspection' | 'inspectionDate'>>) => void;
  setLocation: (payload: Partial<Pick<InspectionDraftSlice, 'buildingId' | 'floorId' | 'spaceTypeId' | 'roomIdentifier'>>) => void;
  updateItem: (itemId: string, patch: Partial<DraftInspectionItem>) => void;
  setFailureReason: (itemId: string, reason: InspectionFailureReason) => void;
  setActiveRoomScore: (score: number) => void;
  addCompletedRoom: () => void;
  setNotes: (notes: string) => void;
  resetDraft: () => void;
}

type AppStore = UiSlice & SessionSlice & InspectionDraftSlice;

const createDefaultItems = (): DraftInspectionItem[] =>
  inspectionChecklistItems.map((name, index) => ({
    id: `draft_item_${index + 1}`,
    name,
    status: 'unset',
    aboveAndBeyond: false,
    photoCount: 0,
  }));

const initialInspectionDate = new Date().toISOString().slice(0, 10);

const defaultDraftState = {
  step: 1 as const,
  type: 'Routine' as InspectionType,
  baseline: true,
  jointInspection: false,
  inspectionDate: initialInspectionDate,
  buildingId: undefined,
  floorId: undefined,
  spaceTypeId: mockSpaceTypes[0]?.id,
  roomIdentifier: '',
  completedRooms: [] as DraftInspectionRoom[],
  activeRoomItems: createDefaultItems(),
  activeRoomScore: 4,
  notes: '',
};

export const useAppStore = create<AppStore>()((set, get) => ({
  selectedSiteId: mockSites[0]?.id ?? 'site_1',
  isMobileNavOpen: false,
  isAskSageOpen: false,
  notificationCount: 4,
  language: 'en',
  isLanguageHydrated: false,
  setSelectedSiteId: (selectedSiteId) => set({ selectedSiteId }),
  setMobileNavOpen: (isMobileNavOpen) => set({ isMobileNavOpen }),
  setAskSageOpen: (isAskSageOpen) => set({ isAskSageOpen }),
  toggleAskSage: () => set({ isAskSageOpen: !get().isAskSageOpen }),
  toggleMobileNav: () => set({ isMobileNavOpen: !get().isMobileNavOpen }),
  setLanguage: async (language) => {
    set({ language });
    await Promise.all([setI18nLanguage(language), persistLanguage(language)]);
  },
  hydrateLanguage: async () => {
    if (get().isLanguageHydrated) {
      return;
    }

    const storedLanguage = await loadStoredLanguage();
    const language = storedLanguage ?? 'en';

    set({ language, isLanguageHydrated: true });
    await setI18nLanguage(language);
  },

  isAuthenticated: false,
  currentUser: {
    id: 'user_1',
    name: 'Brandon Dastrup',
    role: 'Chief Operating Officer',
    avatar: 'BD',
  },
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),

  ...defaultDraftState,
  setStep: (step) => set({ step }),
  setMeta: (payload) => set({ ...payload }),
  setLocation: (payload) => set({ ...payload }),
  updateItem: (itemId, patch) =>
    set((state) => ({
      activeRoomItems: state.activeRoomItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              ...patch,
              reason: patch.status === 'pass' ? undefined : patch.reason ?? item.reason,
            }
          : item,
      ),
    })),
  setFailureReason: (itemId, reason) =>
    set((state) => ({
      activeRoomItems: state.activeRoomItems.map((item) => (item.id === itemId ? { ...item, reason } : item)),
    })),
  setActiveRoomScore: (activeRoomScore) => set({ activeRoomScore }),
  addCompletedRoom: () => {
    const state = get();
    if (!state.buildingId || !state.floorId || !state.spaceTypeId || !state.roomIdentifier) {
      return;
    }

    const room: DraftInspectionRoom = {
      id: `draft_room_${Date.now()}`,
      buildingId: state.buildingId,
      floorId: state.floorId,
      spaceTypeId: state.spaceTypeId,
      name: state.roomIdentifier,
      score: state.activeRoomScore,
      items: state.activeRoomItems,
    };

    set({
      completedRooms: [...state.completedRooms, room],
      roomIdentifier: '',
      activeRoomItems: createDefaultItems(),
      activeRoomScore: 4,
    });
  },
  setNotes: (notes) => set({ notes }),
  resetDraft: () => set({ ...defaultDraftState }),
}));
