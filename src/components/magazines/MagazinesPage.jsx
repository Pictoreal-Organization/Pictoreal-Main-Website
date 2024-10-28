import MagazineCard from "./MagazineCard";
export const magazines = [
  {
    volume : 26,
    title : 'Navras',
    imgLink : '/magazines/vol_2025_26.jpg',
    iFrameSrc : 'https://online.fliphtml5.com/ukioy/fyba/'
  },
  {
    volume : 25,
    title : 'Odyssey',
    imgLink : '/magazines/vol_2024_25.png',
    iFrameSrc : 'https://www.yumpu.com/xx/embed/view/hQFX2kOYlHIs8xA9'
  },
  {
    volume : 24,
    title : 'Phoenix',
    imgLink : '/magazines/vol_2023_24.png',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/s9BzGkJ7FHwVhtYP'
  },
  {
    volume : 23,
    title : 'Kshitij',
    imgLink : '/magazines/vol_2021_23.jpg',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/XfPDm7HNEop26LMr'
  },
  {
    volume : 22,
    title : 'Abstract',
    imgLink : '/magazines/vol_2020_22.png',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/3makuPpAxhKOsyoj'
  },
  {
    volume : 21,
    title : 'Alchemy',
    imgLink : '/magazines/vol_2019_21.jpg',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/1Nxq8IadrnWpzeBO'
  },
  {
    volume : 20,
    title : 'Perspective',
    imgLink : '/magazines/vol_2018_20.jpg',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/ZQWHTJI3yPDF8M1m'
  },
  {
    volume : 19,
    title : 'Change',
    imgLink : '/magazines/vol_2017_19.png',
    iFrameSrc : 'https://www.yumpu.com/en/embed/view/mi1wtA6cOuJpjSFY'
  },

];
// const MagazinesPage = () => {
//   return (
//     <section className="min-h-screen bg-[url('/images/27884380_stain_halftone_background.svg')] bg-center bg-[length:50%] py-12">
//       <h2 className="text-4xl font-raleway font-bold text-center mb-8 p-2 text-[#531733] ">MAGAZINES</h2>
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-0 max-w-screen-xl justify-items-center">
//         {magazines.map(magazine => (
//           <MagazineCard key={magazine.volume} magazine={magazine} />
//         ))}
//       </div>
//     </section>
//   );
// };

const MagazinesPage = () => {
  return (
    <section className="min-h-screen bg-[url('/images/27884380_stain_halftone_background.svg')] bg-center bg-[length:50%] py-12">
      <h2 className="text-4xl font-raleway font-bold text-center mb-8 p-2 text-[#531733]">MAGAZINES</h2>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-0 max-w-screen-xl justify-items-center">
        {magazines.map((magazine) => (
          <MagazineCard key={magazine.volume} magazine={magazine} />
        ))}
      </div>
    </section>
  );
};

export default MagazinesPage
