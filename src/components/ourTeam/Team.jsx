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
          names={["Chaitrali Ginimav", "Vineet Kothari"]}
          imageSrc="/our_team/DSC_5911.JPG"
          altText="Magazine Secretaries"
          hoverKey="magazine_secretaries"
        />

        {/* Joint Secretaries */}
        <Title 
        text="Joint Secretaries" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Gayatri Sawant", "Manthan Adhav"]}
          imageSrc="/our_team/DSC_5939.JPG"
          altText="Joint Secretaries"
          hoverKey="joint_secretaries"
        />

        {/* External Affairs Officers */}
        <Title 
        text="External Affairs Officers" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Advait Naik", "Anshika Singh"]}
          imageSrc="/our_team/DSC_5860.JPG"
          altText="External Affairs Officers"
          hoverKey="external_affairs_officers"
        />

        {/* PictoSocial Secretary */}
        <Title 
        text="PictoSocial Secretary" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Aarya Ghate"]}
          imageSrc="/our_team/picto-social-secretary.jpg"
          altText="PictoSocial Secretary"
          hoverKey="picto_social_secretary"
        />

        {/* Treasurer */}
        <Title 
        text="Treasurer" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Kashish Hase"]}
          imageSrc="/our_team/TR.JPG"
          altText="Treasurer"
          hoverKey="treasurer"
        />
        
        {/* Chief Designer */}
        <Title 
        text="Chief Designer" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Atharva Pardeshi"]}
          imageSrc="/our_team/atharva-pardeshi.JPG"
          altText="Chief Designer"
          hoverKey="chief_designer"
        />
        
        {/* Design Heads */}
        <Title 
        text="Design Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Prem Rahinj", "Amulya Agrawal", "Kshitij Dhake"]}
          imageSrc="/our_team/design-heads.JPG"
          altText="Design Heads"
          hoverKey="design_heads"
        />
        
        {/* Editing Heads */}
        <Title 
        text="Editing Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Revati Ranade", "Soham Phatak", "Shruti Mone"]}
          imageSrc="/our_team/DSC_4540.JPG"
          altText="Editing Heads"
          hoverKey="editing_heads"
        />
        
        {/* Picto-Social Heads */}
        <Title 
        text="Picto-Social Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Sanika Deshpande", "Aditya Choudhary", "Tanvi Somani"]}
          imageSrc="/our_team/DSC_4489.JPG"
          altText="Picto-Social Heads"
          hoverKey="picto_social_heads"
        />
        
        {/* Event Managers */}
        <Title 
        text="Event Managers" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Kartik Tichkule", "Aarya Badhe", "Hariom Gilda"]}
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
          names={["Unnati Rathi", "Shrihari Kulkarni", "Mahi Shah"]}
          imageSrc="/our_team/DSC_5995.JPG"
          altText="Public Relations Officers"
          hoverKey="public_relations_officers"
        />
        
        {/* Social Media Heads */}
        <Title 
        text="Social Media Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Anvitha Mayya", "Atharva Dhake", "Sampada Tagalpallewar"]}
          imageSrc="/our_team/DSC_5401.JPG"
          altText="Social Media Heads"
          hoverKey="social_media_heads"
        />
        
        {/* Tech Heads */}
        <Title 
        text="Tech Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Ria Narode", "Gaurav Waghmare", "Mansi Apet"]}
          imageSrc="/our_team/DSC_5457.JPG"
          altText="Tech Heads"
          hoverKey="tech_heads"
        />

        {/* Marketing Heads */}
        <Title 
        text="Marketing Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Samyak Bora", "Ajinkya Bobade"]}
          imageSrc="/our_team/DSC_4504.JPG"
          altText="Marketing Heads"
          hoverKey="marketing_heads"
        />

        {/* Video Editing Heads */}
        <Title 
        text="Video Editing Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Gaurav Waghmare", "Shrihari Kulkarni"]}
          imageSrc="/our_team/DSC_5406.JPG"
          altText="Video Editing Heads"
          hoverKey="video_editing_heads"
        />

        {/* Photography Heads */}
        <Title 
        text="Photography Heads" 
        style={{color: "var(--firefly)" }} 
        />
        <TeamMember
          names={["Dev Dandekar", "Yash Apotikar"]}
          imageSrc="/our_team/DSC_6009.JPG"
          altText="Photography Heads"
          hoverKey="photography_heads"
        />
      </div>
    </div>
  </div>
  );
};

export default Team;
