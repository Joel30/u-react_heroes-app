import {mount} from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en <LoginComponent />', () => {
  const dispatch = jest.fn();

  const contextValue = {
    user: {
      logged:false
    },
    dispatch,
  }
  
  const wrapper = mount(<AuthContext.Provider value={contextValue}>
    {/* MemoryRouter ayuda a provveeer el contexto suficiente para probar, tomar el useNavigation */}
    <MemoryRouter initialEntries={['/login']}>
      {/* <LoginScreen /> */} {/* con esto no funciona [prop('onClick')] */} 
      <Routes> {/** Solo se maneja cunado se hace uso de rutas */}
        <Route path='/login' element={<LoginScreen />} />
      </Routes>
    </MemoryRouter>
  </AuthContext.Provider>)

  test('dede de hacer match con el snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('dede de realizar el dispatch y la navegación', () => {
    // wrapper.find('button').prop('onClick')(); // Realiza la misma operación que (1)
    const handleClick = wrapper.find('button').prop('onClick'); // (1)
    handleClick(); // (1)

    // wrapper.find('button').simulate('click');
    
    const data = {
      payload: {
        name: "Joel",
      },
      type: types.login
    }
    expect(dispatch).toHaveBeenCalledWith(data);
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', {replace:true});

    localStorage.setItem('lastPath', '/dc');
    handleClick();
    expect(mockNavigate).toHaveBeenCalledWith('/dc', {replace:true})
  });
});