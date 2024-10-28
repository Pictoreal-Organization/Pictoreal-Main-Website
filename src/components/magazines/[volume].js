// pages/magazines/[volume].js

import { useRouter } from 'next/router';
import { magazines } from '../../components/magazines'; // Adjust path as necessary

const MagazineDetails = () => {
  const router = useRouter();
  const { volume } = router.query;

  // Find the magazine by volume
  const magazine = magazines.find((mag) => mag.volume === parseInt(volume));

  if (!magazine) {
    return <div>Magazine not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{magazine.title}</h1>
      <img src={magazine.imgLink} alt={magazine.title} className="my-4" />
      <iframe
        src={magazine.iFrameSrc}
        className="w-full h-[500px]"
        title={magazine.title}
        frameBorder="0"
      />
    </div>
  );
};

export default MagazineDetails;
