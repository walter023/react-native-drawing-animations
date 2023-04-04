import { StyleSheet, Text } from 'react-native';
import { Layout } from '../layout';
import { Beziercurve } from '../components/bezierCurve/BezierCurve';

export const BezierCurveScreen: React.FC = () => {
  return (
    <Layout>
      <Beziercurve />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});
