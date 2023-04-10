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
  icon: string;
  screenName: string;
};

export interface IconProps  {
  name: string;
  size?: IconSize;
  fill?: string;
  width?: number;
  height?: number;
};

export enum IconSize {
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XLG = 'xlg',
}
