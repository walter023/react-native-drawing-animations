import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Layout } from '../layout';
import { Beziercurve } from '../components/BezierCurve';

export const BezierCurveScreen: React.FC = () => {
  return (
    <Layout>
      <GestureHandlerRootView>
        <Beziercurve />
      </GestureHandlerRootView>
    </Layout>
  );
};
