import Hero from '../components/homepage/hero';
import AboutUs from '../components/homepage/aboutus';
import OurTeams from '../components/homepage/ourteams';
import EventCarousel from '../components/homepage/ourevents';
import RecentBlogs from '../components/homepage/recentblogs';
import PictoTalents from '../components/homepage/pictotalents';

export default function HomePage() {
  return (
    <div className='bg-paleskyblue'>      
        <Hero />
        <AboutUs />
        <RecentBlogs />
        <OurTeams />
        <EventCarousel />
        <PictoTalents />
    </div>
  );
}