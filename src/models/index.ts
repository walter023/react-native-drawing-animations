import { AppImages } from '../assets';
import { Screens } from '../constants';
import { ListType } from '../../types';

export const DATA: ListType[] = [
  {
    name: 'Bézier curves',
    description: 'Some samples the usage of Bézier curves using reanimated & svg.',
    background: AppImages.bezier_curve,
    screenName: Screens.BEZIER_CURVE,
  },
  {
    name: 'Rope Effect',
    description: 'Some samples the usage of rope physics curves using reanimated & svg.',
    background: AppImages.rope_svg,
    screenName: Screens.ROPE_EEFECT,
  },
];
