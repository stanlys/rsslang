import Feature from './feature/Feature';
import featuresData from './featuresData';
import styles from './FeaturesSection.module.scss';

const FeaturesSection = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <h4 className={styles.title}>our advantages</h4>
      <div className={styles.featuresWrapper}>
        {featuresData.map((feature) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Feature key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
