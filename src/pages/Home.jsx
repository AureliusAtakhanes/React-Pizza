import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import { Skeleton } from '../components/Skeleton';
import Categories from '../components/Categories';
import { Pagination } from '../components/Pagination';

const Home = () => {
    const dispatch = useDispatch()
    const { categoryId, sort, currentPage } = useSelector(state => state.filter)

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = async () => {
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        try {
            const res = await axios.get(`https://6440e954792fe886a898ea59.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
            setItems(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }

    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPizzas();

    }, [categoryId, sort.sortProperty, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const skeletons = [... new Array(6).map((_, index) => <Skeleton key={index} />)]

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
    )
}

export default Home
