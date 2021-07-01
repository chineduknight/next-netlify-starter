import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from "./components/buttonStyles";
// custom themes in chakra UI
// https://chakra-ui.com/docs/theming/customize-theme

export const softScriptTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
  colors: {
    primary: "#1f74bd",
    secondary: "#E7E7ED",
    highlight: "#00C9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
    text: "#454545"
  },
  components: {
    Button, // Has to match to the name of the component
  },

});
