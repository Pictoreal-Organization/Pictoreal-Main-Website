import Hero from '../components/homepage/hero';
import AboutUs from '../components/homepage/aboutus';
import OurTeams from '../components/homepage/ourteams';
import OurEvents from '../components/homepage/ourevents';
import RecentBlogs from '../components/homepage/recentblogs';
import PictoTalents from '../components/homepage/pictotalents';

export default function HomePage() {
  return (
    <>
      <div>
        <h1>Welcome to Pictoreal</h1>
        <p>This is the new homepage.</p>
      </div>
      
      <div>
        <Hero />
        <AboutUs />
        <RecentBlogs />
        <OurTeams />
        <PictoTalents />
        <OurEvents />
      </div>
    </>
  );
}