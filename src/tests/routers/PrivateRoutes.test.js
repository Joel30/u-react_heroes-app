import {mount} from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRouter';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>Saliendo de aquí</span> 
}));

describe('Pruebas en <PrivateRoute />', () => {

  Storage.prototype.setItem = jest.fn();
  
  test('debe de mostrar el componente si está autenticado y guardar en el localStorage', ()=>{
    const contextValue = {
      user: {
        logged: true,
        name: 'Joel'
      }
    };

    const wrapper = mount(<AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <PrivateRoute>
          {/* Si estor autenticado debe de mostrar esto */}
          <h1>Private Component</h1>
        </PrivateRoute>
      </MemoryRouter>
    </AuthContext.Provider>);

    expect(wrapper.text().trim()).toBe('Private Component');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
  });

  test('debe de bloquear el compoennte si no está autenticado', ()=>{
    const contextValue = {
      user: {
        logged: false,
        name: 'Joel'
      }
    };

    const wrapper = mount(<AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute>
          {/* Si estor autenticado debe de mostrar esto */}
          <h1>Private Component</h1>
        </PrivateRoute>
      </MemoryRouter>
    </AuthContext.Provider>);

    expect(wrapper.text().trim()).toBe('Saliendo de aquí');
  });
});