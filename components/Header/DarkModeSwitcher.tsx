import useColorMode from '@/hooks/useColorMode';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useTheme } from 'next-themes';

const DarkModeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <li>
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          className=""
          onCheckedChange={() => {
            setTheme(theme == 'dark' ? 'light' : 'dark');
          }}
        />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
    </li>
  );
};

export default DarkModeSwitcher;
