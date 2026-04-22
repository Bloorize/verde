import { fireEvent, render } from '@testing-library/react-native';

import { PrototypeActionBar } from '@/src/features/prototypes/components/PrototypeActionBar';
import { PrototypeExpander } from '@/src/features/prototypes/components/PrototypeExpander';
import { PrototypeLanguageToggle } from '@/src/features/prototypes/components/PrototypeLanguageToggle';

jest.mock('@/src/hooks/useLocalizedText', () => ({
  useLocalizedText: (value: string) => value,
}));

describe('prototype interaction primitives', () => {
  it('opens expander content when pressed and exposes expanded accessibility state', () => {
    const { getByRole, getByText, queryByText } = render(
      <PrototypeExpander title="Why this matters">
        <>{'Expanded content'}</>
      </PrototypeExpander>,
    );
    const trigger = getByRole('button', { name: 'Why this matters' });

    expect(queryByText('Expanded content')).toBeNull();
    expect(trigger).toHaveAccessibilityState({ expanded: false });

    fireEvent.press(trigger);

    expect(getByText('Expanded content')).toBeTruthy();
    expect(trigger).toHaveAccessibilityState({ expanded: true });
  });

  it('calls onChange with the selected language but keeps selection controlled by props', () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(
      <PrototypeLanguageToggle
        options={['English', 'Spanish']}
        value="English"
        onChange={onChange}
      />,
    );
    const englishOption = getByRole('button', { name: 'English' });
    const spanishOption = getByRole('button', { name: 'Spanish' });

    expect(englishOption).toHaveAccessibilityState({ selected: true });
    expect(spanishOption).toHaveAccessibilityState({ selected: false });

    fireEvent.press(spanishOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Spanish');
    expect(englishOption).toHaveAccessibilityState({ selected: true });
    expect(spanishOption).toHaveAccessibilityState({ selected: false });

    rerender(
      <PrototypeLanguageToggle
        options={['English', 'Spanish']}
        value="Spanish"
        onChange={onChange}
      />,
    );

    expect(getByRole('button', { name: 'English' })).toHaveAccessibilityState({ selected: false });
    expect(getByRole('button', { name: 'Spanish' })).toHaveAccessibilityState({ selected: true });
  });

  it('exposes controlled completion state and disabled action semantics in the action bar', () => {
    const onCompletedChange = jest.fn();
    const { getByRole, rerender } = render(
      <PrototypeActionBar
        actionLabel="Continue"
        completed={false}
        onCompletedChange={onCompletedChange}
      />,
    );
    const completionControl = getByRole('checkbox', { name: 'Mark complete' });
    const actionButton = getByRole('button', { name: 'Continue' });

    expect(completionControl).toHaveAccessibilityState({ checked: false });
    expect(actionButton).toHaveAccessibilityState({ disabled: true });

    fireEvent.press(completionControl);

    expect(onCompletedChange).toHaveBeenCalledTimes(1);
    expect(onCompletedChange).toHaveBeenCalledWith(true);
    expect(getByRole('checkbox', { name: 'Mark complete' })).toHaveAccessibilityState({ checked: false });

    rerender(
      <PrototypeActionBar
        actionLabel="Continue"
        completed
        onCompletedChange={onCompletedChange}
        onAction={() => {}}
      />,
    );

    expect(getByRole('checkbox', { name: 'Completed' })).toHaveAccessibilityState({ checked: true });
    expect(getByRole('button', { name: 'Continue' })).toHaveAccessibilityState({ disabled: false });
  });
});
