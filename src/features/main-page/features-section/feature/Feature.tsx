import { Card } from 'react-bootstrap';
import styles from './Feature.module.scss';

interface FeatureCardProps {
  imageURL: string;
  title: string;
  description: string;
}

const Feature = ({ imageURL, title, description }: FeatureCardProps): JSX.Element => {
  return (
    <Card className={styles.card}>
      <Card.Img src={imageURL} className={styles.cardImage} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Feature;
