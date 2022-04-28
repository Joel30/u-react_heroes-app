import { Link } from "react-router-dom";
// const heroImages = require.context('../../assets', true);
import { heroImages } from "../../helpers/heroImages";

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters
}) => {

  // const imagePath = `/assets/${id}.jpg`;  // desde [public/assets]
  
  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card" >
        <div className="row no-gutters">
          <div className="col-4">
            <img 
              // src={imagePath}  // desde [public/assets] 
              src={heroImages(`./${id}.jpg`)} // añadir [.default] para imganes, si no funciona
              className="card-img" 
              alt={superhero} 
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>
              {
                (alter_ego !== characters) && 
                  <p className="text-muted">{characters}</p>
              }
              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>
              <Link to={`/hero/${id}`}>
                Más...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}