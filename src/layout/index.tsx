import { ReactNode, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as theme from '../theme';

interface Props {
  children: ReactNode;
  slideInLeft?: boolean;
  title?: string;
  style?: ViewStyle;
}

export const Layout: React.FC<Props> = ({ children, slideInLeft = true, title, style }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(width);
  const LayoutView = Animated.createAnimatedComponent(SafeAreaView);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 });
  }, []);

  const animateStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <LayoutView style={[styles(isDarkMode).container, slideInLeft && animateStyles, style]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.home(isDarkMode).headerBg}
      />
      {title && (
        <View style={[styles(isDarkMode).headerContainer]}>
          <Text style={styles(isDarkMode).headerText}>{title}</Text>
        </View>
      )}
      {children}
    </LayoutView>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.home(isDarkMode).headerBg,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: theme.home(isDarkMode).headerBg,
      borderColor: theme.home(isDarkMode).borderColor,
      height: 52,
    },
    headerText: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: isDarkMode ? 'white' : 'black',
    },
  });
