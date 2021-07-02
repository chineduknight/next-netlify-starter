import SearchLayout from './SearchLayout';
// import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootReducer } from 'lib/redux/reducers';
import { useRouter } from 'next/router'

const SearchResult = () => {

  const history = useRouter();
  const text = history.query.text.toString();
  const { data } = useSelector((state: RootReducer) => state.scripts.searchResult);

  return (
    <SearchLayout
      searchText={text}
      scripts={data}
    />
  )
}

export default SearchResult
