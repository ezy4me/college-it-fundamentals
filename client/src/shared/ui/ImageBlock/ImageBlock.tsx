import styles from './ImageBlock.module.scss';

export const ImageBlock = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <figure className={styles.wrapper}>
      <img {...props} className={styles.image} />
      {props.alt && <figcaption className={styles.caption}>{props.alt}</figcaption>}
    </figure>
  );
};
