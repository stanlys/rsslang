import styles from './TitleSection.module.scss';
import introImage from '../../../assets/english-school.jpg';

const TitleSection = () => {
  return (
    <div className={styles.section}>
      <div>
        <img src={introImage} alt="intro" className={styles.introImage} />
      </div>
      <div className={styles.title}>
        <p className={styles.firstTitleLine}>online-</p>
        <p className={styles.secondTitleLine}>
          platform<span className={styles.secondTitleLineDot}>.</span>
        </p>
      </div>
      <p className={styles.subtitle}>for learning English</p>
      <p className={`${styles.description} fs-5 fw-semibold`}>
        Non-boring online English learning with fascinating games at any time convenient to you.
      </p>
    </div>
  );
};

export default TitleSection;
