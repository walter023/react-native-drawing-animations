import { useEffect, useRef } from 'react';
import Svg, { Path, PathProps } from 'react-native-svg';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedProps,
  cancelAnimation,
  useDerivedValue,
} from 'react-native-reanimated';

import { IconSize, Vector2 } from '../../../types';
import { Icon } from '../Icon';
import { Color, ANGLE, DURATION, BOUNCES } from '../../constants';

export const BeaconBeam: React.FC = () => {
  const initialTime = useRef(Date.now());
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yTurret = height / 1.2;
  const xTurret = width / 2;
  const xRay = useSharedValue<number>(0);
  const yRay = useSharedValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const loop = useSharedValue<number>(0);
  const AnimatedPath = Animated.createAnimatedComponent<PathProps>(Path);

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
    loop.value = withRepeat(withTiming(100), -1, false);
  });

  /*
   * Calculate the hit point of the laser vector with the edge of the screen, using the slope-intercept form of a line:
   * y = mx + b
   * yTurret = m * xTurret + b
   * b = y - mx
   * b = yTurret - m * xTurret
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
    return { x: Math.round(hitPoint.x), y: Math.round(hitPoint.y) };
  };

  const reflect = (incomingVector: Vector2, normalVector: Vector2): Vector2 => {
    'worklet';
    const dotProduct = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
    return {
      x: incomingVector.x - 2 * dotProduct * normalVector.x,
      y: incomingVector.y - 2 * dotProduct * normalVector.y,
    };
  };

  const path = useDerivedValue(() => {
    let radians = ((angle.value + startAngle) * Math.PI) / 180; // add 90 to adjust for the initial angle
    xRay.value = Math.round(xTurret + Math.cos(radians) * height);
    yRay.value = Math.round(yTurret + Math.sin(radians) * height);
    let hitPoint = intersectionPoint({ x: xRay.value, y: yRay.value }, { x: xTurret, y: yTurret });
    let normalVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    let incomingVector: Vector2 = { x: xRay.value - hitPoint.x, y: yRay.value - hitPoint.y };
    let reflectedVector = reflect(incomingVector, normalVector);

    let startingPoint = `${hitPoint.x},${hitPoint.y}`;
    let path = `L${startingPoint}L${hitPoint.x + reflectedVector.x * height},${hitPoint.y + reflectedVector.y * height}`; // multiply by the height to make longer the length of the vector

    let x, y;
    for (let i = 0; i < BOUNCES; i++) {
      radians = Math.atan2(reflectedVector.y, reflectedVector.x);
      x = Math.round(hitPoint.x + Math.cos(radians) * height);
      y = Math.round(hitPoint.y + Math.sin(radians) * height);
      hitPoint = intersectionPoint({ x, y }, hitPoint);
      normalVector = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
      reflectedVector = reflect(reflectedVector, normalVector);
      path = `${path}L${hitPoint.x},${hitPoint.y} L${reflectedVector.x * height},${reflectedVector.y * height}`;
    }

    return `M${xTurret},${yTurret} L${xRay.value},${yRay.value}${path}`;
  }, [angle.value]);

  const animatedRayPath = useAnimatedProps(() => {
    return { d: path.value };
  });

  const laserEffectPath = useAnimatedProps(() => {
    return {
      d: path.value,
      strokeDashoffset: ((Date.now() - initialTime.current) / 1000) * -loop.value,
    };
  }, [path, loop]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}deg` }],
      marginTop: yTurret,
    };
  });

  return (
    <>
      <Svg height={height} width={width}>
        <AnimatedPath animatedProps={animatedRayPath} fill="none" strokeWidth={2} stroke={Color.RED} />
        <AnimatedPath
          animatedProps={laserEffectPath}
          stroke={Color.WHITE}
          fill="none"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={[40, 15]}
        />
      </Svg>

      <Animated.View style={[styles.turret, animatedStyle]} onTouchStart={() => cancelAnimation(angle)}>
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
