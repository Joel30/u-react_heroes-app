import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {

  const {heroId} = useParams();
  const navigate = useNavigate();

  const  hero = useMemo(()=> getHeroById(heroId),[heroId]);
  
  const handleReturn = () => {
    navigate(-1); //recibe tambien string
  }
  
  if (!hero){
    //Sacar al usuario si pone una url que no existe
    return <Navigate to='/' /> //Se encarga de hacer la redirección exactamente cuando ya es posible hacerlo
    //?? retornar siempre un Componente o jsx ??
  }

  const {id, superhero, publisher, alter_ego, first_appearance, characters} = hero;

  const imagePath = `/assets/${id}.jpg`;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img 
          src={imagePath}
          alt={superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8 animate__animated animate__fadeInRight">
        <h3>{superhero}</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <b>Alter ego:</b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher:</b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance:</b>
            {first_appearance}
          </li>
        </ul>
        <h5 className="mt-5">Characters</h5>
        <p>{characters}</p>
        <button 
          className="btn btn-outline-info"
          onClick={handleReturn}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}