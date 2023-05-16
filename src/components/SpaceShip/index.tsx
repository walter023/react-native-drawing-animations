import {
  Canvas,
  Path,
  Group,
  DashPathEffect,
  useValue,
  useComputedValue,
  useLoop,
  BlurMask,
  Skia,
  StrokeJoin,
  StrokeCap,
} from '@shopify/react-native-skia';
import { useEffect, useRef } from 'react';

import { StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { IconSize, Vector2 } from '../../../types';
import { Color, ANGLE, DURATION, BOUNCES } from '../../constants';
import * as theme from '../../theme';
import { Icon } from '../Icon';

export const SpaceShip: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const initialTime = useRef(Date.now());
  const { width, height } = useWindowDimensions();
  const { startAngle, endAngle } = ANGLE;
  const yTurret = height / 1.2;
  const xTurret = width / 2;
  const xRay = useValue<number>(0);
  const yRay = useValue<number>(0);
  const angle = useSharedValue<number>(startAngle);
  const pathValue = useValue<any>('');
  const dashPathValue = useValue<any>('');
  const loop = useLoop();

  useEffect(() => {
    angle.value = withRepeat(withTiming(endAngle, DURATION), -1, true);
  });

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

  useComputedValue(() => {
    let radians = ((angle.value + startAngle) * Math.PI) / 180; // add 90 to adjust for the initial angle
    xRay.current = Math.round(xTurret + Math.cos(radians) * height);
    yRay.current = Math.round(yTurret + Math.sin(radians) * height);
    let hitPoint = intersectionPoint({ x: xRay.current, y: yRay.current }, { x: xTurret, y: yTurret });
    let normalVector: Vector2 = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
    let incomingVector: Vector2 = { x: xRay.current - hitPoint.x, y: yRay.current - hitPoint.y };
    let reflectedVector = reflect(incomingVector, normalVector);

    const path = Skia.Path.Make();
    path.moveTo(xTurret, yTurret);
    path.lineTo(xRay.current, yRay.current);
    path.lineTo(hitPoint.x, hitPoint.y);
    path.lineTo(hitPoint.x + reflectedVector.x * height, hitPoint.y + reflectedVector.y * height);

    let x, y;
    for (let i = 0; i < BOUNCES; i++) {
      radians = Math.atan2(reflectedVector.y, reflectedVector.x);
      x = Math.round(hitPoint.x + Math.cos(radians) * height);
      y = Math.round(hitPoint.y + Math.sin(radians) * height);
      hitPoint = intersectionPoint({ x, y }, hitPoint);
      normalVector = hitPoint.y ? { x: -1, y: 0 } : { x: 0, y: -1 };
      reflectedVector = reflect(reflectedVector, normalVector);
      path.lineTo(hitPoint.x, hitPoint.y);
      path.lineTo(reflectedVector.x * height, reflectedVector.y * height);
    }
    //path.dash(8, 10, ((Date.now() - initialTime.current) / 1000) * -50);
    path.close();
    pathValue.current = path;
  }, [loop]);

  return (
    <Canvas style={[{ width, height }]}>
      <Path path={pathValue} color="rgb(237,132,112)" strokeWidth={3} style="stroke" />

      <Path path={pathValue} color="rgb(198,39,26)" strokeWidth={6} style="stroke">
        <BlurMask blur={8} style="outer" />
      </Path>
    </Canvas>
  );
};
