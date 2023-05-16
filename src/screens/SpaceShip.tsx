import { Layout } from '../layout';
import { SpaceShip } from '../components/SpaceShip';
import { BackButton } from '../components/BackButton';

export const SpaceShipScreen: React.FC = () => {
  return (
    <Layout>
      <BackButton />
      <SpaceShip />
    </Layout>
  );
};
