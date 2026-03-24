import { RouteScreen } from '@/src/components/modules/RouteScreen';

export default function ServiceCoverageIndexScreen() {
  return (
    <RouteScreen
      title="Service Coverage"
      description="Frequency-based service completion logging (not inspection scoring)."
      links={[
        { href: '/service-coverage/scans', label: 'Scans List' },
        { href: '/service-coverage/qr-entry', label: 'QR / Manual Entry' },
        { href: '/service-coverage/scan_1', label: 'Scan Detail: scan_1' },
      ]}
    />
  );
}
