import { Card, Image } from 'react-bootstrap';
import teamMembers from './teamMembers';
import styles from './TeamSection.module.scss';
import github from '../../../assets/github.png';

const TeamSection = (): JSX.Element => {
  return (
    <section className={styles.section}>
      <h4 className={styles.title}>RSSBand</h4>
      <div className={styles.teamWrapper}>
        {teamMembers.map(({ id, ghLink, imgSrc, name, role, contribution }) => (
          <Card className={`${styles.card}`} key={id}>
            <Card.Img src={imgSrc} alt={`${role}-${name}`} />
            <Card.Body className={styles.cardBody}>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{role}</Card.Text>
              <ul className={styles.featureList}>
                {contribution.map((feature: string) => (
                  <li key={feature} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card.Body>
            <Card.Body className={styles.cardFooter}>
              <a href={ghLink} title="Check Github account">
                <Image className={styles.logoGitHub} src={github} />
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
