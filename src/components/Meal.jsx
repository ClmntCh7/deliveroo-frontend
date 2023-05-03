import replaceDotByComa from "../utils/replaceDotByComa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meal = ({ meal, handleAddToCart }) => {
  return (
    <article onClick={handleAddToCart}>
      <div>
        <h3>{meal.title}</h3>
        {meal.description && (
          <p className="meal-description">{meal.description}</p>
        )}
        <div className="price-popular">
          <p>{replaceDotByComa(meal.price)} €</p>
          {meal.popular && (
            <p className="popular">
              <FontAwesomeIcon icon="star" /> Populaire
            </p>
          )}
        </div>
      </div>
      {meal.picture && <img src={meal.picture} alt={meal.title} />}
    </article>
  );
};

export default Meal;
