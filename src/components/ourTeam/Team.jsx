import React from 'react';
import TeamMember from './TeamMember'; // Adjust path accordingly

const Team = () => {
  const Title = ({ text, style }) => {
    return (
      <h1 className={`text-4xl font-bold text-center mb-10 mt-6`} style={style}>
        {text}
      </h1>
    );
  };

  return (
    <div className="container mx-auto p-5 my-5 w-full md:w-3/4 bg-cover bg-no-repeat" style={{ backgroundImage: "url('images\our_team\x27884380_stain_halftone_background 1.svg')" }}>

    <div className="container mx-auto my-5 w-full md:w-3/4">
      <Title 
        text="TEAM PHOTO" 
        style={{color: "var(--firefly)" }} 
      />
    
      <div className="flex flex-wrap justify-around gap-3">
        <TeamMember
          names={["TEAM PICTOREAL"]}
          imageSrc="our_team/slide_img_1.jpg"
          altText="team pictoreal"
          hoverKey="team pictoreal"
        />
      </div>

      <Title 
        text="MEET OUR TEAM" 
        style={{ color: "var( --lynch)" }} 
      />

      <Title 
        text="Magazine Coordinators" 
        style={{color: "var(--firefly)" }} 
      />
      {/* Magazine Coordinators */}
      <div className='grid grid-cols-1 justify-items-center'>
        <div className='grid lg:grid-cols-2 justify-items-center gap-y-10 mg:gap-0'>
          <TeamMember
            names={["Mr. Amol Chavan"]}
            imageSrc="/our_team/amol-chavan.jpg"
            altText="Magazine Coordinators"
            hoverKey="magazine_coordinators"
            className="mb-5"
          />
          <TeamMember
            names={["Mr. Pankaj Patil"]}
            imageSrc="/our_team/Pankaj-Patil.jpg"
            altText="Magazine Coordinators"
            hoverKey="magazine_coordinators"
            className="mt-5"
          />
        </div>
        
        {/* Magazine Secretaries */}
        <Title 
        text="Magazine Secretaries" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Amulya Agrawal", "Prem Rahinj"]}
          imageSrc="/our_team/magazine-secretaries.JPG"
          altText="Magazine Secretaries"
          hoverKey="magazine_secretaries"
        />

        {/* Joint Secretaries */}
        <Title 
        text="Joint Secretaries" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Sampada Tagalpallewar", "Kshitij Dhake"]}
          imageSrc="/our_team/joint-secretaries.JPG"
          altText="Joint Secretaries"
          hoverKey="joint_secretaries"
        />

        {/* External Affairs Officers */}
        <Title 
        text="General Secretaries" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Aarya Badhe", "Unnati Rathi"]}
          imageSrc="/our_team/general-secretaries.JPG"
          altText="General Secretaries"
          hoverKey="general_secretaries"
        />

        {/* Treasurer */}
        <Title 
        text="Treasurer" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Kartik Tichkule"]}
          imageSrc="/our_team/TR.JPG"
          altText="Treasurer"
          hoverKey="treasurer"
        />
        
        {/* Design Heads */}
        <Title 
        text="Design Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Saanvi Bhavsar", "Anjani Gulve", "Sanvi Waghmode"]}
          imageSrc="/our_team/design-heads.JPG"
          altText="Design Heads"
          hoverKey="design_heads"
        />
        
        {/* Editing Heads */}
        <Title 
        text="Editorial Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Spondon Nath", "Sanavi Kulkarni", "Ayan Pathan"]}
          imageSrc="/our_team/editorial-heads.JPG"
          altText="Editorial Heads"
          hoverKey="editorial_heads"
        />
        
        {/* Picto-Social Heads */}
        <Title 
        text="Picto-Social Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Dhanashri Mahadik", "Harshit Vora", "Sukanya Gupta"]}
          imageSrc="/our_team/picto-social-heads.JPG"
          altText="Picto-Social Heads"
          hoverKey="picto_social_heads"
        />
        
        {/* Event Managers */}
        <Title 
        text="Event Managers" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Vedika Bopche", "Omkar Desai", "Jeet Amin"]}
          imageSrc="/our_team/event-managers.JPG"
          altText="Event Managers"
          hoverKey="event_managers"
        />
        
        {/* Public Relations Officers */}
        <Title 
        text="Public Relations Officers" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Shraddha Dolas", "Trishit Guin", "Maria Shaikh"]}
          imageSrc="/our_team/public-relations-officers.JPG"
          altText="Public Relations Officers"
          hoverKey="public_relations_officers"
        />
        
        {/* Social Media Heads */}
        <Title 
        text="Social Media Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Pushkar Mulajkar", "Aditya Tidake", "Samierra Arora"]}
          imageSrc="/our_team/social-media-heads.JPG"
          altText="Social Media Heads"
          hoverKey="social_media_heads"
        />
        
        {/* Tech Heads */}
        <Title 
        text="Tech Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Madhura Deshmukh", "Manas Gawali", "Riddhi Lahare"]}
          imageSrc="/our_team/tech-heads.JPG"
          altText="Tech Heads"
          hoverKey="tech_heads"
        />

        {/* Marketing Heads */}
        <Title 
        text="Marketing Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Manas Yeola", "Pratik Chavan", "Gauravi Muttha"]}
          imageSrc="/our_team/marketing-heads.JPG"
          altText="Marketing Heads"
          hoverKey="marketing_heads"
        />

        {/* Video Editing Heads */}
        <Title 
        text="Video Editing Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Vihan Wani", "Pranav Wagh"]}
          imageSrc="/our_team/video-editing-heads.JPG"
          altText="Video Editing Heads"
          hoverKey="video_editing_heads"
        />

        {/* Photography Heads */}
        <Title 
        text="Production Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Shantanu Sable", "Mahesh Loya"]}
          imageSrc="/our_team/photography-heads.JPG"
          altText="Photography Heads"
          hoverKey="photography_heads"
        />
      </div>
    </div>
  </div>
  );
};

export default Team;
