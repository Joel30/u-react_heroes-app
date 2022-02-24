import { Route, Routes } from "react-router-dom";

import { DcScreen } from "../components/dc/DcScreen";
import { HeroScreen } from "../components/hero/HeroScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { Navbar } from "../components/ui/NavBar";

export const DashboardRoutes = () =>{
  return (
    <>
     {/* En rutas Hijas no es necesario colocar un 'BrowserRouter' de r-r-dom*/}
      <Navbar />
      
      <div className="container">
        <Routes>
          <Route path="marvel" element={<MarvelScreen/>} />
          <Route path="dc" element={<DcScreen/>} />
          <Route path="search" element={<SearchScreen/>} />

          {/* heroId es un argumento obligatorio */}
          <Route path="hero/:heroId" element={<HeroScreen/>} /> 
          <Route path="/"  element={<MarvelScreen/>} />
        </Routes>
      </div>
    </>
  );
}