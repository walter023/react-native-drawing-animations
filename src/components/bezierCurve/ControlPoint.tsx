import React from 'react';
import { StyleSheet } from 'react-native';


import { Point, Points, PointProps } from '../../../types';
import { RADIUS, CIRCULO } from '../../constants';

export const ControlPoint: React.FC<PointProps> = ({ style, setPositions, position, id }) => {
  return <></>
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
