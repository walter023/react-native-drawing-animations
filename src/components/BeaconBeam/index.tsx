import { useEffect } from 'react';
import Svg, { Path, PathProps } from 'react-native-svg';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, useAnimatedProps } from 'react-native-reanimated';

import { IconSize, Vector2 } from '../../../types';
import { Icon } from '../Icon';
import { Color, ANGLE, DURATION } from '../../constants';

export const BeaconBeam: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yTurret = height / 1.2;
  const xTurret = width / 2;
  const xRay = useSharedValue<number>(0);
  const yRay = useSharedValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const AnimatedPath = Animated.createAnimatedComponent<PathProps>(Path);

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
  });

  /*
   * Calculate the hit point of the laser vector with the edge of the screen, using the slope-intercept form of a line:
   * y = mx + b
   * yTurret = m * xTurret + b
   * b = y - mx
   * b = xTurret - m * xTurret
   * y = mx + b
   * y = mx + yTurret - m * xTurret.
   * y = m * (x - xTurret) + yTurret,
   * y = slope * (xEdge - xTurret) + yTurret,
   * xEdge is the x-coordinate of the edge point. xEdge = (edge === 'right') ? width : 0;.
   */
  const intersectionPoint = (incomingVector: Vector2, origin: Vector2): Vector2 => {
    'worklet';
    const laserVector = { x: incomingVector.x - origin.x, y: incomingVector.y - origin.y };
    const slope = laserVector.y / laserVector.x;
    let hitPoint, xEdge, yEdge;
    if (laserVector.x < 0) {
      xEdge = 0;
      yEdge = slope * (xEdge - origin.x) + origin.y;
      if (yEdge > height || yEdge < 0) {
        hitPoint = { x: origin.x - origin.y / slope, y: 0 };
      } else {
        hitPoint = { x: xEdge, y: yEdge };
      }
    }
    // Check for right edge intersection
    else if (laserVector.x > 0) {
      xEdge = width;
      yEdge = slope * (xEdge - origin.x) + origin.y;
      if (yEdge > height || yEdge < 0) {
        hitPoint = { x: origin.x - origin.y / slope, y: 0 };
      } else {
        hitPoint = { x: xEdge, y: yEdge };
      }
    }
    // Check for edge case where laser is vertical
    else {
      hitPoint = { x: incomingVector.x, y: incomingVector.y > height ? height : 0 };
    }
    return hitPoint;
  };

  const reflect = (incomingVector: Vector2, normalVector: Vector2): Vector2 => {
    'worklet';
    const dotProduct = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
    return {
      x: incomingVector.x - 2 * dotProduct * normalVector.x,
      y: incomingVector.y - 2 * dotProduct * normalVector.y,
    };
  };

  const rayPath = useAnimatedProps(() => {
    const radians = ((angle.value + startAngle) * Math.PI) / 180; // add 90 to adjust for the initial angle
    xRay.value = Math.round(xTurret + Math.cos(radians) * height);
    yRay.value = Math.round(yTurret + Math.sin(radians) * height);
    const ray = `M${xTurret},${yTurret} L${xRay.value},${yRay.value}`;
    return { d: ray };
  }, [angle.value]);

  const reflectionPath = useAnimatedProps(() => {
    const { x: xHitPoint, y: yHitPoint } = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xTurret, y: yTurret });
    const normalVector = yHitPoint ? { x: -1, y: 0 } : { x: 0, y: -1 };
    const incomingVector = { x: xRay.value - xHitPoint, y: yRay.value - yHitPoint };
    const reflectedVector = reflect(incomingVector, normalVector);
    const hitPoint = `${xHitPoint} ${yHitPoint}`;
    const reflection = `${xHitPoint + reflectedVector.x} ${yHitPoint + reflectedVector.y}`;
    const reflectedPath = `M${hitPoint}L${reflection}`;
    return { d: reflectedPath };
  }, [angle.value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}deg` }],
      marginTop: yTurret,
    };
  });

  return (
    <>
      <Svg height={height} width={width}>
        <AnimatedPath animatedProps={rayPath} fill="none" strokeWidth={2} stroke={Color.RED} />
        <AnimatedPath animatedProps={reflectionPath} fill="none" strokeWidth={2} stroke={Color.GREEN} />
      
      </Svg>

      <Animated.View style={[styles.turret, animatedStyle]}>
        <Icon name="ship" size={IconSize.LG} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  turret: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
