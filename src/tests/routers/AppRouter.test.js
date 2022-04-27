import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en <AppRouter />', ()=> {

  const contextValueF = {
    user:{
      logged:false
    }
  };

  const contextValueT = {
    user:{
      logged:true,
      name:'Joel'
    }
  };
  
  test('debe de mostrar el login si no esta autenticado', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValueF}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text().trim()).toBe('Login');
    
  });

  test('debe de mostrar el componente de Marvel si está autenticado', () => {
    const wrapper = mount(<AuthContext.Provider value={contextValueT}>
      <AppRouter />
    </AuthContext.Provider>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});