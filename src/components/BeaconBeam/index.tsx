import { useEffect } from 'react';
import Svg, { Path, PathProps } from 'react-native-svg';
import { Button, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';

import { IconSize, Vector2 } from '../../../types';
import { Icon } from '../Icon';
import { Color, ANGLE, RADIUS, DURATION } from '../../constants';

export const BeaconBeam: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yTurret = height / 1.2;
  const xTurret = width / 2;
  const isAnimationCancel = useSharedValue<boolean>(false);
  const xRay = useSharedValue<number>(0);
  const yRay = useSharedValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const AnimatedPath = Animated.createAnimatedComponent<PathProps>(Path);

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}deg` }],
      marginTop: yTurret,
      marginLeft: xTurret,
    };
  });

  const stop = (): void => {
    if (!isAnimationCancel.value) {
      cancelAnimation(angle);
      isAnimationCancel.value = true;
    } else {
      angle.value = startAngle;
      angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
      isAnimationCancel.value = false;
    }
  };

  const laser = useDerivedValue(() => {
    const radians = ((angle.value + startAngle) * Math.PI) / 180; // add 90 to adjust for the initial angle
    xRay.value = Math.round(xTurret + Math.cos(radians) * height);
    yRay.value = Math.round(yTurret + Math.sin(radians) * height);
    return `M${xTurret},${yTurret} L${xRay.value},${yRay.value}`;
  }, [angle.value]);

  const laserPath = useAnimatedProps(() => {
    return { d: laser.value };
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
  const intersectionPoint = useDerivedValue(() => {
    const laserVector = { x: xRay.value - xTurret, y: yRay.value - yTurret };
    const slope = laserVector.y / laserVector.x;
    let hitPoint, xEdge, yEdge;

    if (laserVector.x < 0) {
      xEdge = 0;
      yEdge = slope * (xEdge - xTurret) + yTurret;
      if (yEdge > height || yEdge < 0) {
        hitPoint = { x: xTurret - yTurret / slope, y: RADIUS };
        console.log('hitPoint', hitPoint);
      } else {
        hitPoint = { x: xEdge + RADIUS, y: yEdge };
      }
    }
    // Check for right edge intersection
    else if (laserVector.x > 0) {
      xEdge = width;
      yEdge = slope * (xEdge - xTurret) + yTurret;
      if (yEdge > height || yEdge < 0) {
        hitPoint = { x: xTurret - yTurret / slope, y: RADIUS };
      } else {
        hitPoint = { x: xEdge - RADIUS, y: yEdge };
      }
    }
    // Check for edge case where laser is vertical
    else {
      hitPoint = { x: xRay.value, y: yRay.value > height ? height : RADIUS }; //y: 0 };
    }
    // draw the hit point
    const path = `
    M${hitPoint.x},${hitPoint.y}
    m -${RADIUS}, 0
    a ${RADIUS},${RADIUS} 0 1,0 ${RADIUS * 2},0
    a ${RADIUS},${RADIUS} 0 1,0 ${-RADIUS * 2},0
    `;
    return { path, hitPoint };
  }, [xRay.value, yRay.value]);

  const hitPointPath = useAnimatedProps(() => {
    return { d: intersectionPoint.value.path };
  });

  const reflect = (incomingVector: Vector2, normalVector: Vector2): Vector2 => {
    const dotProduct = incomingVector.x * normalVector.x + incomingVector.y * normalVector.y;
    return {
      x: incomingVector.x - 2 * dotProduct * normalVector.x,
      y: incomingVector.y - 2 * dotProduct * normalVector.y,
    };
  };

  const rayPath = useAnimatedProps(() => {
    const normalVector = { x: -1, y: 0 }; // surface is flat and horizontal
    const xHitPoint = intersectionPoint.value.hitPoint.x;
    const yHitPoint = intersectionPoint.value.hitPoint.y;
    const incomingVector = { x: xRay.value - xHitPoint, y: yRay.value - yHitPoint };
    const reflectedVector = reflect(incomingVector, normalVector);
    const reflectedPath = `M${xHitPoint},${yHitPoint} L${xHitPoint + reflectedVector.x},${yHitPoint + reflectedVector.y}`;
    return { d: reflectedPath };
  });

  return (
    <>
      <Button onPress={stop} title="stop" />
      <Svg height={height} width={width}>
        <AnimatedPath animatedProps={laserPath} fill="none" strokeWidth={2} stroke={Color.RED} />
        <AnimatedPath animatedProps={hitPointPath} fill={Color.VIVID_YELLOW} strokeWidth={2} stroke={Color.GREEN} />
        <AnimatedPath animatedProps={rayPath} fill={Color.STRONG_CYAN} strokeWidth={2} stroke={Color.GREEN} />
      </Svg>

      <Animated.View style={[styles.turret, animatedStyle]}>
        <Icon name="spider" size={IconSize.LG} />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  turret: {
    borderWidth: 2,
    borderColor: 'green',
    alignSelf: 'center',
    position: 'absolute',
  },
});
