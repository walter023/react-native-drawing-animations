import { StatusBar, SafeAreaView, useColorScheme, StyleSheet, View, Text } from 'react-native';
import { ListView } from '../components/list/ListView';
import { DEMOS } from '../models/';
import { Layout } from '../layout';

export const HomeScreen: React.FC = () => (
  <Layout title="Drawing Pixels" slideInLeft={false}>
    <ListView listData={DEMOS} />
  </Layout>
);
