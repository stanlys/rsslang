import Chart from './Chart';
import styles from './Statistics.module.scss';

const LongTermStatistics = (): JSX.Element => {
  return (
    <section className={styles.infoArea}>
      <Chart />
    </section>
  );
};

export default LongTermStatistics;
