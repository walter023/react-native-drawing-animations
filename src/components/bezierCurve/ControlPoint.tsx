import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { PointProps } from '../../../types';
import { RADIUS, CIRCULO } from '../../constants';

export const ControlPoint: React.FC<PointProps> = ({ style, setPositions, position, id }) => {
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const controlPointId = useSharedValue<string>(id);

  const panGesture = Gesture.Pan().onChange(e => {
    translateX.value = e.absoluteX;
    translateY.value = e.absoluteY;
    runOnJS(setPositions)({
      [controlPointId.value]: { x: e.absoluteX, y: e.absoluteY },
    });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.point, animatedStyle, style]} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  point: {
    height: CIRCULO,
    width: CIRCULO,
    borderRadius: RADIUS,
    zindex: 1,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
