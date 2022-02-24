import { heroes } from "../data/heroes"

export const getHeroesByName = (name = '') => {

  console.log("eeeeeeeeeeeeeeeeer");
  if (name === '') {
    return [];
  }

  return heroes.filter(hero => hero.superhero.toLowerCase().includes(name.toLocaleLowerCase()));
}