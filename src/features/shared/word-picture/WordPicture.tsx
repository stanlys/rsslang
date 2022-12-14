import React, { CSSProperties, HTMLAttributes } from 'react';
import { Image } from 'react-bootstrap';
import styles from './WordPicture.module.scss';
import noImagePlaceholder from '../../../assets/no-image-placeholder.jpg';

interface WordPictureProps extends HTMLAttributes<HTMLElement> {
  imageSrc: string;
  diameter?: string;
}

const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  // eslint-disable-next-line no-param-reassign
  event.currentTarget.src = noImagePlaceholder;
};

const WordPicture = ({
  imageSrc,
  diameter = '2rem',
  ...otherProps
}: WordPictureProps): JSX.Element => {
  return (
    <Image
      src={imageSrc}
      className={`${styles.wordPicture} ${otherProps?.className ?? ''}`}
      style={{ '--diameter': diameter } as CSSProperties}
      roundedCircle
      thumbnail
      onError={imageOnErrorHandler}
    />
  );
};

export default WordPicture;
