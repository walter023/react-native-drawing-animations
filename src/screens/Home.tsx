import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ListView } from '../components/list/ListView';
import { DATA } from '../models/';
import { Layout } from '../layout';

export const HomeScreen: React.FC = () => (
  <Layout title="Drawing Pixels" slideInLeft={false}>
    <GestureHandlerRootView>
      <ListView listData={DATA} />
    </GestureHandlerRootView>
  </Layout>
);
