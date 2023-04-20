import React from 'react'
import { useEffect, useState } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import { Skeleton } from '../components/Skeleton';
import Categories from '../components/Categories';

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://6440e954792fe886a898ea59.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setTimeout(() => {
                    setItems(arr)
                    setIsLoading(false)
                }, 1000)
            })
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </>
    )
}

export default Home
