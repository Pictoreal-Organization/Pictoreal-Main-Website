import Link from 'next/link';
import Image from 'next/image';

export default function MagazineCard({ magazine }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row md:max-w-lg w-10/12 mb-3 p-4">
      {/* Image Container */}
      <div className="md:w-1/3 flex justify-center items-center">
        <Image
          src={magazine.imgLink}
          alt={magazine.title}
          width={180}
          height={270}
          className="object-contain rounded-s"
        />
      </div>

      {/* Magazine Information */}
      <div className="md:w-2/3 md:pl-6 flex flex-col justify-between mt-4 md:mt-0">
        <div>
          <h2 className="text-xl font-bold text-[#556270] mb-2 font-raleway">{magazine.title}</h2>
          <p className="text-gray-600 text-md">Volume {magazine.volume}</p>
        </div>

        {/* Open the magazine in a new tab */}
        <a
          href={magazine.iFrameSrc}
          target="_blank"  // Open link in a new tab
          rel="noopener noreferrer"  // Security measure for external links
        >
          <button className="bg-[#8C3B62] hover:bg-[#692648] text-white font-bold py-2 px-4 rounded mt-4">
            Read More
          </button>
        </a>
      </div>
    </div>
  );
}
