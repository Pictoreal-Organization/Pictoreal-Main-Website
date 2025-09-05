const OurTeams = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center py-10">
      {/* Title */}
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Our Teams
      </h2>

      <div className="flex w-10/12 max-w-6xl gap-10">
        {/* Left Menu */}
        <div className="flex flex-col gap-4 w-1/3">
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Design
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Editorial
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Pictosocial
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Social Media
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> PictoTech
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Photography
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Marketing
          </button>
          <button className="bg-white rounded-full shadow px-6 py-3 text-left font-semibold text-gray-700 hover:bg-gray-100 flex items-center">
            <span className="mr-3">|</span> Production
          </button>
        </div>

        {/* Right Content */}
        <div className="bg-white rounded-2xl shadow p-6 w-2/3">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Design Team</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            tristique mi at sem pulvinar, at vehicula lorem fermentum. Aenean
            eget lectus risus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vivamus tristique mi at sem pulvinar, at vehicula
            lorem fermentum. Aenean eget lectus risus. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Vivamus tristique mi at sem
            pulvinar, at vehicula lorem fermentum. Aenean eget lectus risus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
