import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function BudgetSettingsScreen() {
  return (
    <RouteScreen
      title="Budget"
      description="Budget controls and historical variance views."
      links={[
        { href: '/settings/budget/monthly', label: 'Monthly Budget' },
        { href: '/settings/budget/history', label: 'Budget History' },
      ]}
    />
  );
}
