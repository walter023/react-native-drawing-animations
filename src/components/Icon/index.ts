import { IconProps } from '../../../types';
import { Icons } from './icons';

export const Icon: React.FC<IconProps> = props => {
  const { name, fill = 'black' } = props;
  let { width = 0, height = 0 } = props;
  const renderIcon = Icons[name];

  return renderIcon({ fill, width, height, ...props });
};
