import { Box, Grid } from '@chakra-ui/react'
import { RootReducer } from 'lib/redux/reducers'
import { getScripts } from 'lib/redux/scripts/action'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScriptCard from 'components/dashboard/ScriptCard'
import { nanoid } from 'nanoid';
const DashbordLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScripts())
  }, [dispatch]);

  const scripts = useSelector((state: RootReducer) => state.scripts.allScripts.data);
  return (
    <Box>
      <Box p={4} ml={{
        base: 1,
        lg: 10
      }} minHeight={`calc(100vh - ${"64px"})`}>
        <Grid
          // templateColumns="repeat(5, 1fr)" 
          gap={8}
          templateColumns={{
            base: "repeat(1, 1fr)", // 0 - 476
            sm: "repeat(2, 1fr)", // 758px - 476px 
            md: "repeat(2, 1fr)", // tablet
            lg: "repeat(5, 1fr)", // desktop 1024px
            xl: "repeat(5, 1fr)"  // really wide screen 1440px and above
          }}
        >
          {
            scripts.map((script: any) => {
              return <ScriptCard key={nanoid()} script={script} />
            })
          }
        </Grid>
      </Box>
    </Box>
  )
}

export default DashbordLayout
