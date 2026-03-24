import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function DocumentsIndexScreen() {
  return (
    <RouteScreen
      title="Documents"
      description="Operational contract and legal document repository."
      links={[
        { href: '/documents/sow', label: 'SOW' },
        { href: '/documents/addenda', label: 'Addenda' },
        { href: '/documents/msa', label: 'MSA' },
        { href: '/documents/doc_1', label: 'Document Detail: doc_1' },
      ]}
    />
  );
}
