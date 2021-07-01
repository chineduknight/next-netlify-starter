import { useRef, useEffect } from 'react';
import { createStandaloneToast } from "@chakra-ui/react"
const toast = createStandaloneToast();

export const useClickOutside = (handler: any) => {
  const domNode = useRef<any>();

  useEffect(() => {
    const maybeHandler = (event: any) => {
      if (!domNode?.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

export const successToast = (msg: any) => {
  toast({
    title: "Successful",
    description: msg,
    status: "success",
    duration: 5000,
    isClosable: true,
  })
}
export const errorToast = (msg: any) => {
  toast({
    title: "An error occurred.",
    description: msg,
    status: "error",
    duration: 5000,
    isClosable: true,
  })
}