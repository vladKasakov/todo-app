import { useEffect } from 'react';

import moon from '../../assets/icon-moon.svg';
import sun from '../../assets/icon-sun.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleTheme } from '../../store/reducers/themeSlice';
import styles from './Header.module.scss';

const Header = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const toggleTodoTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header className={styles.header}>
      <span>TODO</span>
      <button onClick={toggleTodoTheme}>
        <img
          src={theme === 'dark' ? sun : moon}
          alt={theme === 'dark' ? 'sun' : 'moon'}
        />
      </button>
    </header>
  );
};

export default Header;
