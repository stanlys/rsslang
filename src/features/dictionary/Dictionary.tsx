import { Outlet } from 'react-router-dom';
import ChaptersSelector from './chapters-selector/ChaptersSelector';
import styles from './Dictionary.module.scss';

const Dictionary = (): JSX.Element => {
  return (
    <div className={styles.dictionary}>
      <ChaptersSelector className={styles.ChaptersSelector} />
      <Outlet />
    </div>
  );
};

export default Dictionary;
