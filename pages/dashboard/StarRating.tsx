import styled from '@emotion/styled'
import { RootReducer } from 'lib/redux/reducers';
import { rateScript } from 'lib/redux/scripts/action';
import { useState } from 'react'
import Ratings from 'react-ratings-declarative';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { PUBLIC_PATHS } from 'routes/pagePath';

type StarRatingProps = {
  id?: string
  value?: number
  isEditable?: boolean
}

const StarRating = (props: StarRatingProps) => {
  const { id, value, isEditable = false } = props;
  const user = useSelector((state: RootReducer) => state.auth.user);
  const history = useRouter();
  const [rating, setRating] = useState(value);
  const dispatch = useDispatch();
  const changeRating = (rating) => {
    if (!user.success) {
      return history.push(PUBLIC_PATHS.LOGIN)
    }
    setRating(rating);
    dispatch(rateScript({ id, rating }))
  }
  return (
    <StarRating.Wrapper>
      <Ratings
        rating={rating}
        widgetRatedColors="#1f74bd"
        widgetHoverColors="#1f74bd"
        widgetDimensions="30px"
        changeRating={isEditable ? changeRating : null}
      >

        <Ratings.Widget
        />

        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    </StarRating.Wrapper>
  )
}
StarRating.Wrapper = styled.div`
.widget-container{
  padding:0 !important;
  svg{
    /* width:16px !important; // for the home page
    height:16px !important; */

    width:20px !important;
    height:20px !important;
  }
}
.widget-ratings{
  margin-right:4px;
}
`
export default StarRating
