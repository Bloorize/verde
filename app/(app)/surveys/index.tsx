import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function SurveysIndexScreen() {
  return (
    <RouteScreen
      title="Surveys"
      description="Employee and customer survey performance and participation."
      links={[
        { href: '/surveys/employee', label: 'Employee Surveys' },
        { href: '/surveys/customer', label: 'Customer Surveys' },
        { href: '/surveys/survey_1', label: 'Survey Detail: survey_1' },
      ]}
    />
  );
}
