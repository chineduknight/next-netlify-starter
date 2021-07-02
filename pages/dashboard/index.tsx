import { Box, Divider, VStack, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react'
import Sidebar from 'react-sidebar';
import { FaCloud, FaArrowAltCircleUp } from 'react-icons/fa';
import DashbordLayout from './DashbordLayout';
import { useDarken } from 'hook/colorHelper';
import MetaDecorator from 'components/MetaDecorator';

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobile] = useMediaQuery('(min-width: 800px)');
  const arrowColor = useDarken("#fff")
  return (
    <Sidebar
      sidebar={
        <VStack spacing="auto" height="100%">
          <MetaDecorator
            title="Choirscript.com | The largest free collection of solfa notation for choir"
            description="Get the clearest and free tonic Solfa notation music sheet / scripts for liturgical celebrations suitable for any event, competition, rendition etc"
            imageAlt="chiorscript"
            imageUrl="this is image"
          />

          <Box>
            <div>This is the sidebar content</div>
            <div>This is the sidebar menu</div>
            <div>This is the sidebar menu</div>
            <div>This is the sidebar menu</div>
            <div>This is the sidebar menu</div>
          </Box>
          <Box w="100%">
            <Divider width="100%" />
            <VStack position="relative">
              <FaCloud fontSize="16px" size="77px" />
              <Box position="absolute" top="18px">

                <FaArrowAltCircleUp size="30px" color={arrowColor} />
              </Box>
              <p
                style={{ marginTop: '-5px', marginBottom: '1rem' }}
              >
                Create and Upload
              </p>
            </VStack>
          </Box>
        </VStack>
      }
      open={isOpen}
      onSetOpen={() => setIsOpen(false)}
      docked={mobile}
      styles={{
        // sidebar: { background: '#495057' },
        root: { height: `calc(100vh - ${"64px"})`, top: '64px' },
      }}
    >
      <DashbordLayout />
    </Sidebar >

  )
}

export default DashBoard
