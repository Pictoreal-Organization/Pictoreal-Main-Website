
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { magazines } from '../MagazinesPage';

export default function VolumePage() {
  const router = useRouter();
  const { volume } = router.query;

  const [magazine, setMagazine] = useState(null);

  useEffect(() => {
    if (volume) {
      const foundMagazine = magazines.find(mag => mag.volume === parseInt(volume, 10));
      setMagazine(foundMagazine);
    }
  }, [volume]);

  if (!magazine) {
    return <div className="text-center text-2xl py-12">Magazine not found</div>;
  }

  return (
    <>
      <section className="min-h-screen bg-[url('/images/27884380_stain_halftone_background.svg')] bg-cover bg-fixed bg-center py-12 flex items-center justify-center">
        <div className="w-full max-w-screen-lg h-screen flex items-center justify-center"> {/* Full screen height and center content */}
          <iframe
            src={magazine.iFrameSrc}
            width="100%"
            height="100%" 
            allowFullScreen
            className="border border-gray-300 rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>
    </>
  );
}
