import Ionicons from '@react-native-vector-icons/ionicons';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../theme/useTheme';

type Props = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
};

export default function GeneralIcon({ name, size, color }: Props) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const iconSize = size ?? (isTablet ? 26 : 20);

  return (
    <Ionicons
      name={name}
      size={iconSize}
      color={color ?? colors.mainText}
    />
  );
}