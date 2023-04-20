import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import { Skeleton } from './components/Skeleton';

import './scss/app.scss';

function App() {
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
