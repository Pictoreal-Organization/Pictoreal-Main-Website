import Hero from '../components/homepage/hero';
import AboutUs from '../components/homepage/aboutus';
import OurTeams from '../components/homepage/ourteams';
import EventCarousel from '../components/homepage/ourevents';
import RecentBlogs from '../components/homepage/recentblogs';
import PictoTalents from '../components/homepage/pictotalents';

export default function HomePage() {
  return (
    <div className='bg-paleskyblue'>
      <div>
        <h1 className='text-deepnavy'>Welcome to Pictoreal</h1>
        <p>This is the new homepage.</p>
      </div>
      
      <div>
        <Hero />
        <AboutUs />
        <RecentBlogs />
        <OurTeams />
        <PictoTalents />
        <EventCarousel />
      </div>
    </div>
  );
}