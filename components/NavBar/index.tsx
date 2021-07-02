import { useState } from "react";
import { RootReducer } from "lib/redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "lib/redux/auth/action";
import { useRouter } from 'next/router'
import { PUBLIC_PATHS } from 'routes/pagePath';
import { searchScript, searchResult } from 'lib/redux/scripts/action';
import NavBarLayout from './NavBarLayout';
import { useBoolean } from '@chakra-ui/react';
import { convertParamsToString } from 'helpers/stringManipulation';
const NavBar = () => {
  const history = useRouter();
  const [searchText, setsearchText] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const user = useSelector<RootReducer, any>((state) => state.auth.user);
  const searchData = useSelector<RootReducer, any>((state) => state.scripts.search.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
    history.push(PUBLIC_PATHS.LOGOUT);
  };
  const [showDropdown, setshowDropdown] = useBoolean();

  const [currentCat, setcurrentCat] = useState("All");

  const onSearchChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue || searchValue === "") {
      setshowDropdown.off();
    } else {
      let query;
      if (currentCat === "Composer") {
        query = `composer=${searchValue}`
      } else if (currentCat === "Custom Category") {
        query = `category=others&customCategory=${searchValue}`
      } else {
        query = `name=${searchValue}&category=${currentCat}`
      }
      dispatch(searchScript(`?${query}`))

    }
    setsearchText(searchValue)
    setshowDropdown.on();
  }
  const clickedSearchTerm = (term) => {
    console.log("pushing");
    setshowDropdown.off()
    setsearchText(term)
    dispatch(searchResult(`?name=${term}&category=${currentCat}`))
    const url = convertParamsToString(PUBLIC_PATHS.SEARCH_RESULT, { text: term })
    history.push(url)
  }
  const handleHide = () => {
    setshowDropdown.off()
  }
  return <NavBarLayout
    handleLogout={handleLogout}
    onSearchChange={onSearchChange}
    clickedSearchTerm={clickedSearchTerm}
    handleHide={handleHide}
    user={user}
    searchData={searchData}
    searchText={searchText}
    showDropdown={showDropdown}
    currentCat={currentCat}
    setcurrentCat={setcurrentCat}
    showSearch={showSearch}
    setshowSearch={setshowSearch}
  />

}
export default NavBar;