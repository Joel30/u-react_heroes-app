import { useMemo } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
 
export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // const params = new URLSearchParams(location.search);
  // const q = params.get('q') ?? '';

  const q = useMemo(()=> {
    const p = new URLSearchParams(location.search);
    return p.get('q') ?? '';
  }, [location.search]);
  

  //O se puede usar:
  //https://www.npmjs.com/package/query-string
  /*
  import queryString from 'query-string';
  cosnt {q = ''} = queryString.parse(location.search);
  */

  const [values, handleInputChange, reset] = useForm({searchText: q});
  const heroesFiltered = useMemo(()=> getHeroesByName(q), [q]);


  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${values.searchText}`); //mandar query parameters
  }
  
  return (
    <>
      <h1>Búsquedas</h1>
      <hr/>

      <div className="row">
        <div className="col-5">
          <h4>Burcar</h4>
          <hr/>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar un Héroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={values.searchText}
              onChange={handleInputChange}
            />

            <button
              className="btn btn-outline-primary mt-2"
              type="submit"
            >
              Buscar...
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultado</h4>
          <hr/>

          {
            (q === '') 
            ? <div className="alert alert-info"> Buscar un héroe </div>
            : (heroesFiltered.length === 0)
              && <div className="alert alert-danger"> No hay resultados: { q } </div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>
      </div>
    </>
  );
}