import { StyleSheet, Text } from 'react-native';
import { Layout } from '../layout';

export const BezierCurveScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <Text>BazierCurveScreen</Text>
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
