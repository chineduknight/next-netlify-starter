import { addComment, deleteComment, getScriptComments } from 'lib/redux/comments/action';
import { RootReducer } from 'lib/redux/reducers';
import { addFavourite, followUser, getScript, getUserInfoScript, removeFavorite, unfollowAUser } from 'lib/redux/scripts/action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ScriptPageLayout from 'components/scripts/ScriptPageLayout'
import { useRouter } from 'next/router'
import { PUBLIC_PATHS } from 'routes/pagePath';
import CustomSpinner from 'components/CustomSpinner';
import Empty from 'assets/empty.svg';
import { VStack, Text, Image } from '@chakra-ui/react';

const ScriptPage = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const slug = history.query.slug;
  const { data, processing, processed, success } = useSelector((state: RootReducer) => state.scripts.singleScript);
  const userInfo = useSelector((state: RootReducer) => state.scripts.userInfo);
  const user = useSelector((state: RootReducer) => state.auth.user);
  const comments = useSelector((state: RootReducer) => state.comments.allComments.data);
  useEffect(() => {
    dispatch(getScript(slug));
    dispatch(getScriptComments({ id: slug }));
    // check if user is logged in first
    if (user.success) {
      dispatch(getUserInfoScript(slug));
    }
  }, [dispatch, slug, user.success]);

  const [userComment, setUserComment] = useState("");
  const createComment = () => {
    if (user.success) {
      dispatch(addComment({ id: data.id, text: userComment }));
      setUserComment("");
    } else {
      history.push(PUBLIC_PATHS.LOGIN);
    }
  }
  const handleDeleteComment = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment({ id }))
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

  const handleFavoriting = () => {
    if (userInfo.success && userInfo.data.hasFavorited) {
      dispatch(removeFavorite({ id: data.id }))
    } else {
      dispatch(addFavourite({ id: data.id }))
    }
  }
  const addOrRemoveFollowing = () => {
    if (userInfo.success && userInfo.data.isFollowing) {
      dispatch(unfollowAUser(data.uploadedBy))
    } else {
      dispatch(followUser(data.uploadedBy))
    }
  }
  return (
    <>
      {
        processing || userInfo.processing ? <CustomSpinner /> :
          // true ? <CustomSpinner /> :
          processed && success ?
            <ScriptPageLayout
              script={data}
              userInfo={userInfo.data}
              postComment={createComment}
              comments={comments}
              onCommentChange={(e) => setUserComment(e.target.value)}
              userComment={userComment}
              deleteComment={handleDeleteComment}
              handleFavoriting={handleFavoriting}
              addOrRemoveFollowing={addOrRemoveFollowing}
            /> : <VStack>
              <Text mt={4}> Script not found</Text>
              <Image p={2} src={Empty} alt='nothing found' />
            </VStack>

      }
    </>
  )
}

export default ScriptPage


