import classes from './Header.module.css';

/* 
Quest. 목록들과 로그아웃 버튼은 리덕스에서 로그인했을 때만 나타내기 
즉, '사용자 인증상태'는 전역으로 관리해야한다. 
*/

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth'

const Header = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      { isAuth && (
          <nav>
            <ul>
                <>
                <li>
                  <a href='/'>My Products</a>
                </li>
                <li>
                  <a href='/'>My Sales</a>
                </li>
                </>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </nav>
        ) 
      }
    </header>
  );
};

export default Header;
