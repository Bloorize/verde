import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function CourseCatalogSettingsScreen() {
  return <RouteScreen title="Course Catalog" description="Training course definitions and assignment controls." links={[{ href: '/settings/course-catalog/course_1', label: 'Open Course course_1' }]} />;
}
