import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";
import { softScriptTheme } from "styles/theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import wrapper from "lib/redux"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={softScriptTheme}>
      <ColorModeScript
        initialColorMode={softScriptTheme.config.initialColorMode}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
// export default MyApp
export default wrapper.withRedux(MyApp)