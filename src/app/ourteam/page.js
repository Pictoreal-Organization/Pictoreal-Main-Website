import React from 'react';
import TeamMember from './TeamMember';
import { text } from 'stream/consumers';

const Team = () => {
  const Title = ({ text, style }) => {
    return (
      <h1 className={`text-3xl font-bold text-center mb-10 -mt-3 font-heading text-[#001730]`} style={style}>
        {text}
      </h1>
    );
  };

  return (
    <div className="w-full min-h-screen flex justify-center flex-col items-center md:bg-cover bg-no-repeat py-10" style={{ backgroundImage: "url('images/our_team/x27884380_stain_halftone_background 1.svg')" }}>

      <div className="max-w-4xl flex flex-col items-center px-4 md:w-3/4">
        <Title 
          text="TEAM PHOTO" 
          style={{ }} 
        />
      
        {/* Team Photo - Large and centered */}
        <div className="flex justify-center mb-12 w-3/4">
          <TeamMember
            names={["TEAM PICTOREAL"]}
            imageSrc="/our_team/slide_img_1.jpg"
            altText="team pictoreal"
            hoverKey="team pictoreal"
          />
        </div>

        <Title 
          text="MEET OUR TEAM" 
          style={{ }} 
        />

        {/* Magazine Coordinator - Centered and smaller than team photo */}
        <div className="flex flex-col items-center mb-12 w-3/4 max-w-xl">
          <h3 className="font-heading text-lg mb-4 text-center text-[#001730]">Magazine Coordinator</h3>
          <TeamMember
            names={["Mrs. Asmita Joshi"]}
            imageSrc="/our_team/asmita-joshi.jpg"
            altText="Magazine Coordinator"
            hoverKey="magazine_coordinators"
          />
        </div>

        {/* Grid for team roles - two per row, properly centered */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full">
          
          {/* Magazine Secretaries */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Magazine Secretaries</h4>
            <TeamMember
              names={["Amulya Agrawal", "Prem Rahinj"]}
              imageSrc="/our_team/magazine-secretaries.JPG"
              altText="Magazine Secretaries"
              hoverKey="magazine_secretaries"
            />
          </div>

          {/* Joint Secretaries */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Joint Secretaries</h4>
            <TeamMember
              names={["Sampada Tagalpallewar", "Kshitij Dhake"]}
              imageSrc="/our_team/joint-secretaries.JPG"
              altText="Joint Secretaries"
              hoverKey="joint_secretaries"
            />
          </div>

          {/* General Secretaries */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">General Secretaries</h4>
            <TeamMember
              names={["Aarya Badhe", "Unnati Rathi"]}
              imageSrc="/our_team/general-secretaries.JPG"
              altText="General Secretaries"
              hoverKey="general_secretaries"
            />
          </div>

          {/* Treasurer */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Treasurer</h4>
            <TeamMember
              names={["Kartik Tichkule"]}
              imageSrc="/our_team/TR.JPG"
              altText="Treasurer"
              hoverKey="treasurer"
            />
          </div>

          {/* Design Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Design Heads</h4>
            <TeamMember
              names={["Saanvi Bhavsar", "Anjani Gulve", "Sanvi Waghmode"]}
              imageSrc="/our_team/design-heads.JPG"
              altText="Design Heads"
              hoverKey="design_heads"
            />
          </div>

          {/* Editorial Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Editorial Heads</h4>
            <TeamMember
              names={["Spondon Nath", "Sanavi Kulkarni", "Ayan Pathan"]}
              imageSrc="/our_team/editorial-heads.JPG"
              altText="Editorial Heads"
              hoverKey="editorial_heads"
            />
          </div>
          
          {/* Picto-Social Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Picto-Social Heads</h4>
            <TeamMember
              names={["Dhanashri Mahadik", "Harshit Vora", "Sukanya Gupta"]}
              imageSrc="/our_team/picto-social-heads.JPG"
              altText="Picto-Social Heads"
              hoverKey="picto_social_heads"
            />
          </div>
          
          {/* Event Managers */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Event Managers</h4>
            <TeamMember
              names={["Vedika Bopche", "Omkar Desai", "Jeet Amin"]}
              imageSrc="/our_team/event-managers.JPG"
              altText="Event Managers"
              hoverKey="event_managers"
            />
          </div>
          
          {/* Public Relations Officers */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Public Relations Officers</h4>
            <TeamMember
              names={["Shraddha Dolas", "Trishit Guin", "Maria Shaikh"]}
              imageSrc="/our_team/public-relations-officers.JPG"
              altText="Public Relations Officers"
              hoverKey="public_relations_officers"
            />
          </div>
          
          {/* Social Media Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Social Media Heads</h4>
            <TeamMember
              names={["Pushkar Mulajkar", "Aditya Tidake", "Samierra Arora"]}
              imageSrc="/our_team/social-media-heads.JPG"
              altText="Social Media Heads"
              hoverKey="social_media_heads"
            />
          </div>
          
          {/* Tech Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Tech Heads</h4>
            <TeamMember
              names={["Madhura Deshmukh", "Manas Gawali", "Riddhi Lahare"]}
              imageSrc="/our_team/tech-heads.JPG"
              altText="Tech Heads"
              hoverKey="tech_heads"
            />
          </div>

          {/* Marketing Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Marketing Heads</h4>
            <TeamMember
              names={["Manas Yeola", "Pratik Chavan", "Gauravi Muttha"]}
              imageSrc="/our_team/marketing-heads.jpg"
              altText="Marketing Heads"
              hoverKey="marketing_heads"
            />
          </div>

          {/* Production Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Production Heads</h4>
            <TeamMember
              names={["Vihan Wani", "Pranav Wagh"]}
              imageSrc="/our_team/video-editing-heads.jpg"
              altText="Video Editing Heads"
              hoverKey="video_editing_heads"
            />
          </div>

          {/* Photography Heads */}
          <div className="flex flex-col items-center">
            <h4 className="font-heading text-lg mb-4 text-center text-[#001730]">Photography Heads</h4>
            <TeamMember
              names={["Shantanu Sable", "Mahesh Loya"]}
              imageSrc="/our_team/photography-heads.JPG"
              altText="Photography Heads"
              hoverKey="photography_heads"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Team;