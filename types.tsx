import { ViewStyle } from 'react-native/types';

export interface PointProps {
  style?: ViewStyle;
  setPositions: (points: Points) => void;
  position: Point;
  id: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Points {
  [key: string]: {
    x: number;
    y: number;
  };
}
