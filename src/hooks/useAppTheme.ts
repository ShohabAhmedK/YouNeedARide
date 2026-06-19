import { useColorScheme } from 'react-native';
import { colors, darkColors } from '../theme/colors';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    isDark,
    colors: isDark ? darkColors : colors,
  };
};
