import { ViewStyle } from 'react-native/types';

export interface PointProps {
  style?: ViewStyle;
  setCtrlPointPosition: (points: Points) => void;
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

export interface ListType  {
  name: string;
  description: string;
  background: any;
  screenName: string;
};

export interface IconProps  {
  name: string;
  fill?: string;
  width?: number;
  height?: number;
};

