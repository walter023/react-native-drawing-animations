import Svg, { Circle, Rect } from 'react-native-svg';
import { Button, StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, cancelAnimation } from 'react-native-reanimated';
import { useEffect } from 'react';
import { IconSize } from '../../../types';
import { Icon } from '../Icon';

export const BeaconBeam: React.FC = props => {
  const { width, height } = useWindowDimensions();
  const Turret = Animated.createAnimatedComponent(Rect);
  const angle = useSharedValue(80);

  console.log(height);

  useEffect(() => {
    angle.value = withRepeat(withTiming(270, { duration: 2000 }), -1, true);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}deg` }],
      marginTop: height / 1.3,
    };
  });

  const stop = () => {
    console.log(angle.value);
    cancelAnimation(angle);
  };
  return (
    <View>
      <Animated.View style={[styles.turret, animatedStyle]} onTouchStart={stop}>
        <Icon name="spider" size={IconSize.LG} />
      </Animated.View>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} {...props}>
        {/*  <Circle  cx="150" cy="100" r="45" stroke="blue" strokeWidth="2.5" fill="green" /> */}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  turret: {
    borderWidth: 2,
    borderColor: 'green',
    alignSelf: 'center',
  },
});
