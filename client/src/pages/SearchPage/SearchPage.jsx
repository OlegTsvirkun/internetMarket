import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ContentWrapper } from '../../components/ContentWrapper';
import { Goods } from '../../components/Goods';
import { Button } from '../../components/Button';
import { searchingGoods } from '../../store/categorySlice';
import styles from './SearchPage.module.scss';

export const SearchPage = ({}) =>{
	const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
    // console.log(searchParams.get('q'));
    const query = searchParams.get('s') || ''
 const searchValue = searchParams.get('q')+query
 const dispatch = useDispatch()
 const navigate = useNavigate()

 console.log(query,'query');
 useEffect(() => {
   dispatch(searchingGoods(location.search))
  //  console.log(searchValue);
  }, [searchParams]);
  const {isLoading, goods} = useSelector(state=> state.category)

  
  
  return (
    <div className={styles.searchPage}>
       <ContentWrapper className = {styles.backButton}>
        <Button  onClick={() => navigate(-1)} isBackButton={true}>
  					Назад
  				</Button>
     </ContentWrapper>
    {!Object.keys(goods)[0] && <div>Товар з такою назвою відсутній</div>}
   { isLoading ? <div className='Skeleton'>Loading...</div>:<Goods goods= {goods}/>}
   
  </div>
)};

