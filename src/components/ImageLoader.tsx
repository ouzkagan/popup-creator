import Image from 'next/image';

interface Loader {
  src: string;
  width: number;
  quality: number;
}
// interface ImageProps extends Loader {
//   layout: string;
// }
const myLoader = ({ src, width, quality }: Loader) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
};
