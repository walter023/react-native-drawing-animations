import React, { Fragment, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Points as PointsPros } from '../../../types';
import { ControlPointsInitState } from '../../models';
import { ControlPoint } from './ControlPoint';
import { R } from '../../constants';

export const Beziercurve: React.FC = () => {
  const duration = { duration: 2000 };
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const { width, height } = useWindowDimensions();
  const ctrlPoints = useSharedValue<PointsPros>(ControlPointsInitState);

  const SideAX = useSharedValue<number>(ControlPointsInitState.p1.x);
  const SideAY = useSharedValue<number>(ControlPointsInitState.p1.y);

  const SideBX = useSharedValue<number>(ControlPointsInitState.p2.x);
  const SideBY = useSharedValue<number>(ControlPointsInitState.p2.y);

  const setCtrlPointPosition = (point: PointsPros): void => {
    if (point) {
      const newState = { ...ctrlPoints.value, ...point };
      ctrlPoints.value = newState;
      SideAX.value = ctrlPoints.value.p1.x;
      SideAY.value = ctrlPoints.value.p1.y;
      SideBX.value = ctrlPoints.value.p2.x;
      SideBY.value = ctrlPoints.value.p2.y;
      runOnJS(updateInterpolation)();
    }
  };

  useEffect(() => {
    updateInterpolation();
  });

  const updateInterpolation = () => {
    SideAX.value = withRepeat(withTiming(ctrlPoints.value.p0.x, duration), -1, true);
    SideAY.value = withRepeat(withTiming(ctrlPoints.value.p0.y, duration), -1, true);
    SideBX.value = withRepeat(withTiming(ctrlPoints.value.p1.x, duration), -1, true);
    SideBY.value = withRepeat(withTiming(ctrlPoints.value.p1.y, duration), -1, true);
  };

  const triangulePath = useAnimatedProps(() => {
    const starts = `${ctrlPoints.value.p0.x + R} ${ctrlPoints.value.p0.y + R}`;
    const sideA = `${ctrlPoints.value.p1.x + R} ${ctrlPoints.value.p1.y + R}`;
    const sideB = `${ctrlPoints.value.p2.x + R} ${ctrlPoints.value.p2.y + R}`;
    return {
      d: `M${starts}L${sideA}L${sideB}`,
    };
  });

  const connectorPath = useAnimatedProps(() => {
    const lineStarts = `${SideAX.value + R} ${SideAY.value + R}`;
    const lineEnds = `${SideBX.value + R} ${SideBY.value + R}`;
    return { d: `M${lineStarts}L${lineEnds}` };
  });

  const ballSideA = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: SideAX.value }, { translateY: SideAY.value }],
    };
  });

  const ballSideB = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: SideBX.value }, { translateY: SideBY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <ControlPoint
        setCtrlPointPosition={setCtrlPointPosition}
        style={styles.p0}
        position={ctrlPoints.value.p0}
        id="p0"
      />
      <ControlPoint
        setCtrlPointPosition={setCtrlPointPosition}
        style={styles.p1}
        position={ctrlPoints.value.p1}
        id="p1"
      />
      <ControlPoint
        setCtrlPointPosition={setCtrlPointPosition}
        style={styles.p2}
        position={ctrlPoints.value.p2}
        id="p2"
      />
      <Svg width={width} height={height} style={styles.canvas}>
        <Fragment>
          <AnimatedPath animatedProps={triangulePath} fill="none" strokeWidth={2} stroke={'red'} />
          <AnimatedPath animatedProps={connectorPath} fill="none" strokeWidth={2} stroke={'red'} />
        </Fragment>
      </Svg>
      <Fragment>
        <Animated.View style={[styles.l1, ballSideA]} />
        <Animated.View style={[styles.l2, ballSideB]} />
      </Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  p0: {
    backgroundColor: 'yellow',
    left: -5,
    zIndex: 1,
  },
  p1: {
    backgroundColor: 'purple',
    left: -5,
    zIndex: 1,
  },
  p2: {
    backgroundColor: 'pink',
    left: -5,
    zIndex: 1,
  },
  canvas: {
    zIndex: -1,
  },
  l1: {
    width: 20,
    height: 20,
    borderRadius: R,
    backgroundColor: 'violet',
    position: 'absolute',
  },
  l2: {
    width: 20,
    height: 20,
    borderRadius: R,
    backgroundColor: 'green',
    position: 'absolute',
 
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: R,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'oreange',
    borderColor: 'oreange',
    borderWidth: 1,
    marginTop: 20,
  },
  text: {
    zIndex: 100,
  },
});
