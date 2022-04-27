import { mount } from "enzyme";
  //Permite poder hacer evaluaciones y pruebas como si se estuviera en el navegador web
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Pruebas en <DashboardRoutes />', () => {

  const contextValue = {
    user: {
      logged:true,
      name:'Joel'
    }
  };
  
  test('debe de mostrarse correctamente de Marvel', () => {
    const wrapper = mount(<AuthContext.Provider value={contextValue}>
      {/* MemoryRouter ayuda a provveeer el contexto suficiente para probar, tomar el useNavigation */}
      <MemoryRouter initialEntries={['/']}>
        <DashboardRoutes />      
      </MemoryRouter>
    </AuthContext.Provider>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Joel');
    expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');
  });

  test('debe de mostrarse correctamente de DC', () => {
    const wrapper = mount(<AuthContext.Provider value={contextValue}>
      {/* MemoryRouter ayuda a provveeer el contexto suficiente para probar, tomar el useNavigation */}
      <MemoryRouter initialEntries={['/dc']}>
        <DashboardRoutes />      
      </MemoryRouter>
    </AuthContext.Provider>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('DCScreen');
  });
});