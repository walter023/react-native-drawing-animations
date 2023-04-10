import { Icons } from './icons';

type IconProps = {
  name: string;
  fill?: string;
  width?: number;
  height?: number;
};

export const Icon = (props: IconProps) => {
  const { name, fill = 'blue' } = props;
  let { width = 0, height = 0 } = props;
  const renderIcon = Icons[name];

  return renderIcon({ fill, width, height });
};
