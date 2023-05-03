import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Meal from "./components/Meal";
import logo from "./assets/logo.png";

// Icons
import { counter, library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo--m4snx7ydrpgs.code.run/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const [addedMeal, setAddedMeal] = useState([]);

  const handleAddToCart = (elem) => {
    const newTab = [...addedMeal];
    if (!newTab.find((element) => element.id === elem.id)) {
      elem.quantity = 1;
      elem.total = Number(elem.price);
      newTab.push(elem);
    } else {
      elem.quantity = elem.quantity + 1;
      elem.total = Number(elem.total) + Number(elem.price);
    }
    setAddedMeal(newTab);
  };

  // const sumCartTotal = (arr) => {
  //   let sum = 0;
  //   for (let i = 0; i < arr.length; i++) {
  //     sum += arr[i].total;
  //   }
  //   return sum.toFixed(2);
  // };

  const handleRemoveQty = (elem) => {
    const addedMealCopy = [...addedMeal];
    if (elem.quantity <= 1) {
      addedMealCopy.splice(
        addedMealCopy.indexOf(
          addedMealCopy.find((element) => element.id === elem.id)
        ),
        1
      );
      addedMealCopy.indexOf(
        addedMealCopy.find((element) => element.id === elem.id)
      );
    }
    elem.quantity = elem.quantity - 1;
    elem.total -= Number(elem.price);
    setAddedMeal(addedMealCopy);
  };

  const handleAddQty = (elem) => {
    elem.quantity = elem.quantity + 1;
    elem.total += Number(elem.price);
    const addedMealCopy = [...addedMeal];
    setAddedMeal(addedMealCopy);
  };

  let total = 0;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <header>
        <div className="container">
          <img src={logo} alt="" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="tartines" />
        </div>
      </section>
      <main>
        <div className="container">
          <section className="col-left">
            {data.categories.map((category) => {
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {category.meals.map((meal) => {
                        return (
                          <Meal
                            key={meal.id}
                            handleAddToCart={() => {
                              handleAddToCart(meal);
                            }}
                            meal={meal}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right">
            <button className={addedMeal.length === 0 ? "grey-out" : ""}>
              Valider mon panier
            </button>
            {addedMeal.length === 0 ? (
              <span>Votre panier est vide</span>
            ) : (
              <div>
                {addedMeal.map((elem) => {
                  total += Number(elem.price) * Number(elem.quantity);

                  return (
                    <>
                      <div className="addedProducts" key={elem.id}>
                        <button
                          className="quantityButton"
                          onClick={() => {
                            handleRemoveQty(elem);
                          }}
                        >
                          -
                        </button>
                        <span>{elem.quantity}</span>
                        <button
                          className="quantityButton"
                          onClick={() => {
                            handleAddQty(elem);
                          }}
                        >
                          +
                        </button>
                        <span>{elem.title}</span>
                        {elem.price === elem.total ? (
                          <span>{Number(elem.price).toFixed(2)}</span>
                        ) : (
                          // <span>{elem.total.toFixed(2)}</span>
                          <span>{Number(elem.total).toFixed(2)}</span>
                        )}
                      </div>
                    </>
                  );
                })}
                <div className="subTotal">
                  <div>
                    <span>Sous total</span>
                    <span>{Number(total).toFixed(2)}</span>
                    {/* <span>{sumCartTotal(addedMeal)}</span> */}
                  </div>
                  <div>
                    <span>Frais de livraison</span>
                    <span>{2.5}€</span>
                  </div>
                  <div>
                    <span>Total</span>
                    {/* <span>{Number(sumCartTotal(addedMeal)) + Number(2.5)}</span> */}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
