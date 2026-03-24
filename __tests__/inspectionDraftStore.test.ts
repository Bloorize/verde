import { useAppStore } from '@/src/store/appStore';

describe('inspection draft store', () => {
  beforeEach(() => {
    useAppStore.getState().resetDraft();
  });

  it('adds a completed room and resets active room fields', () => {
    const store = useAppStore.getState();

    store.setLocation({
      buildingId: 'bld_1',
      floorId: 'fl_1',
      spaceTypeId: 'st_20',
      roomIdentifier: 'Office 214',
    });

    useAppStore.getState().activeRoomItems.forEach((item) => {
      store.updateItem(item.id, { status: 'pass' });
    });

    store.setActiveRoomScore(5);
    store.addCompletedRoom();

    const nextState = useAppStore.getState();
    expect(nextState.completedRooms).toHaveLength(1);
    expect(nextState.completedRooms[0].score).toBe(5);
    expect(nextState.roomIdentifier).toBe('');
    expect(nextState.activeRoomItems.every((item) => item.status === 'unset')).toBe(true);
  });

  it('does not add room when location data is incomplete', () => {
    useAppStore.getState().addCompletedRoom();
    expect(useAppStore.getState().completedRooms).toHaveLength(0);
  });
});
