import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { signIn } from './api/users';
import styles from './App.module.scss';
import { setAuthorizeUser } from './features/auth/authSlice';
import Footer from './features/main-page/footer/Footer';
import NavMenu from './features/main-page/nav-menu/NavMenu';
import { AuthState } from './model/AuthState';
import { getUserFromLocalStorage, removeItemFromLocalStorage } from './utils/localStorage';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  try {
    const exUser: AuthState = getUserFromLocalStorage<AuthState>('Auth');
    const userData = signIn({ ...exUser }).then(() => {
      dispatch(setAuthorizeUser({ ...exUser }));
    });
  } catch {
    removeItemFromLocalStorage('Auth');
  }

  return (
    <div className={styles.appRoot}>
      <NavMenu />
      <Container className="flex-grow-1 d-flex flex-column">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default App;
