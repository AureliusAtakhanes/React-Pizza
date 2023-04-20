import React from 'react'
import { useEffect, useState } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import { Skeleton } from '../components/Skeleton';
import Categories from '../components/Categories';
import { Pagination } from '../components/Pagination';

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetch(`https://6440e954792fe886a898ea59.mockapi.io/items?page=${currentPage}&limit=4`)
            .then((res) => res.json())
            .then((arr) => {
                setTimeout(() => {
                    setItems(arr)
                    setIsLoading(false)
                }, 1000)
            })
    }, [currentPage])

    const skeletons = [... new Array(6).map((_, index) => <Skeleton key={index} />)]

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </>
    )
}

export default Home
