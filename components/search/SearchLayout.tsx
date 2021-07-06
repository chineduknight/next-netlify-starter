import { Box, Heading } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
import ScriptDisplay from './ScriptDisplay';
type SearchLayoutProps = {
  searchText: string,
  scripts: Array<any>
}

const SearchLayout = (props: SearchLayoutProps) => {
  const { searchText, scripts } = props;
  return (
    <Box
      padding={{
        base: "16px",
        lg: "36px 40px"
      }}
    >
      <Heading
        size="lg"
        mb={4}>{`Scripts found for "${searchText}"`}</Heading>
      {
        scripts.map(script => <ScriptDisplay key={nanoid()} script={script} />
        )
      }
    </Box>
  )
}

export default SearchLayout
