import { useColorModeValue } from '@chakra-ui/react';
import { softScriptTheme } from 'styles/theme';
import { darken, whiten } from "@chakra-ui/theme-tools";


export const useWhiten = (color, value = 50) => {
  return useColorModeValue(color, whiten(color, value)(softScriptTheme));
}

export const useDarken = (color, value = 50) => {
  return useColorModeValue(color, darken(color, value)(softScriptTheme));
}