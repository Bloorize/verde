import { render, fireEvent } from '@testing-library/react-native';

import { InspectionCard } from '@/src/components/inspection/InspectionCard';
import { Inspection } from '@/src/types/domain';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

const sampleInspection: Inspection = {
  id: 'insp_test',
  siteId: 'site_1',
  inspectorName: 'Test User',
  inspectorAvatar: 'TU',
  timestamp: '2026-03-11T08:20:00.000Z',
  buildingName: 'Tower A',
  spacesInspected: 3,
  score: 4.3,
  baseline: true,
  jointInspection: false,
  rooms: [
    {
      id: 'room_1',
      name: 'Lobby',
      score: 4.4,
      photoCount: 1,
      commentCount: 0,
      items: [],
    },
  ],
  comments: [],
  photos: [],
};

describe('InspectionCard', () => {
  it('triggers press handler when selected', () => {
    const onPress = jest.fn();
    const { getByText } = render(<InspectionCard inspection={sampleInspection} onPress={onPress} />);

    fireEvent.press(getByText('Test User'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
