import { mount } from "enzyme";
import { MemoryRouter, Route, Routes} from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom',() => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Pruebas en el <Navbar />', () => {

  const dispatch = jest.fn();
  
  const valueContext = {
    user: {
      name:'Joel', 
      logged:true
    },
    dispatch,
  };

  const wrapper = mount(<AuthContext.Provider value={valueContext}>
    <MemoryRouter initialEntries={['/']}> {/** Cuanso se esta usando el navigate */}
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </MemoryRouter>
  </AuthContext.Provider>);
  
  test('debe de mostrar correctamente', () => {    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Joel');
  });

  test('debe de llamar el logout, llamar el nabigate con los argumentos', () => {
    // const wrapper = mount(<AuthContext.Provider value={valueContext}>
    //   <MemoryRouter initialEntries={['/']}>
    //     <Navbar />
    //   </MemoryRouter>
    // </AuthContext.Provider>);

    wrapper.find('button').simulate('click');
    //wrapper.find('button').prop('onClick')();
    
    expect(mockNavigate).toHaveBeenCalledWith('/login', {replace: true});
    expect(dispatch).toHaveBeenCalledWith({'type': types.logout});
    expect(dispatch).toHaveBeenCalledTimes(1);

  });
});