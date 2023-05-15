import { Layout } from '../layout';
import { BeaconBeam } from '../components/BeaconBeam';
import { BackButton } from '../components/BackButton';

export const BeaconBeamScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <BeaconBeam />
    </Layout>
  );
};
