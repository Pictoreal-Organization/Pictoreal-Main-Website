import React from 'react';
import TeamMember from './TeamMember';

const Team = () => {
  const Title = ({ text, style }) => {
    return (
      <h1 className={`text-3xl font-bold text-center mb-10 mt-6 font-heading`} style={style}>
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

      {/* After TEAM PHOTO and "MEET OUR TEAM" */}

{/* Grid for team roles - two per row */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  
  {/* Magazine Coordinator */}
  <div className="flex flex-col items-center">
    {/* <Title text="Magazine Coordinator" style={{ color: "var(--firefly)" }} className="text-sm"/> */}
    <h4 className="font-heading" >Magazine Coordinator</h4>
    <TeamMember
      names={["Mrs. Asmita Joshi"]}
      imageSrc="/our_team/asmita-joshi.jpg"
      altText="Magazine Coordinator"
      hoverKey="magazine_coordinators"
    />
  </div>

  {/* Magazine Secretaries */}
  <div className="flex flex-col items-center">
    {/* <Title text="Magazine Secretaries" style={{ color: "var(--firefly)" }} /> */}
    <h4 className="font-heading" >Magazine Secretaries</h4>
    <TeamMember
      names={["Amulya Agrawal", "Prem Rahinj"]}
      imageSrc="/our_team/magazine-secretaries.JPG"
      altText="Magazine Secretaries"
      hoverKey="magazine_secretaries"
    />
  </div>

  {/* Joint Secretaries */}
  <div className="flex flex-col items-center">
    {/* <Title text="Joint Secretaries" style={{ color: "var(--firefly)" }} /> */}
    <h4 className="font-heading" >Joint Secretaries</h4>
    <TeamMember
      names={["Sampada Tagalpallewar", "Kshitij Dhake"]}
      imageSrc="/our_team/joint-secretaries.JPG"
      altText="Joint Secretaries"
      hoverKey="joint_secretaries"
    />
  </div>

  {/* General Secretaries */}
  <div className="flex flex-col items-center">
    {/* <Title text="General Secretaries" style={{ color: "var(--firefly)" }} /> */}
    <h4 className="font-heading" >General Secretaries</h4>
    <TeamMember
      names={["Aarya Badhe", "Unnati Rathi"]}
      imageSrc="/our_team/general-secretaries.JPG"
      altText="General Secretaries"
      hoverKey="general_secretaries"
    />
  </div>

  {/* Treasurer */}
  <div className="flex flex-col items-center">
    {/* <Title text="Treasurer" style={{ color: "var(--firefly)" }} /> */}
    <h4 className="font-heading" >Treasurer</h4>
    <TeamMember
      names={["Kartik Tichkule"]}
      imageSrc="/our_team/TR.JPG"
      altText="Treasurer"
      hoverKey="treasurer"
    />
  </div>

  {/* Design Heads */}
  <div className="flex flex-col items-center">
    {/* <Title text="Design Heads" style={{ color: "var(--firefly)" }} /> */}
    <h4 className="font-heading" >Design Heads</h4>
    <TeamMember
      names={["Saanvi Bhavsar", "Anjani Gulve", "Sanvi Waghmode"]}
      imageSrc="/our_team/design-heads.JPG"
      altText="Design Heads"
      hoverKey="design_heads"
    />
  </div>

        {/* Editing Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Editorial Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Editorial Heads</h4>
        <TeamMember
          names={["Spondon Nath", "Sanavi Kulkarni", "Ayan Pathan"]}
          imageSrc="/our_team/editorial-heads.JPG"
          altText="Editorial Heads"
          hoverKey="editorial_heads"
        />
  </div>
        
        
        {/* Picto-Social Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Picto-Social Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Picto-Social Heads</h4>
        <TeamMember
          names={["Dhanashri Mahadik", "Harshit Vora", "Sukanya Gupta"]}
          imageSrc="/our_team/picto-social-heads.JPG"
          altText="Picto-Social Heads"
          hoverKey="picto_social_heads"
        />
  </div>
        
        
        {/* Event Managers */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Event Managers" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Event Managers</h4>
        <TeamMember
          names={["Vedika Bopche", "Omkar Desai", "Jeet Amin"]}
          imageSrc="/our_team/event-managers.JPG"
          altText="Event Managers"
          hoverKey="event_managers"
        />
  </div>
        
        
        {/* Public Relations Officers */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Public Relations Officers" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Public Relations Officers</h4>
        <TeamMember
          names={["Shraddha Dolas", "Trishit Guin", "Maria Shaikh"]}
          imageSrc="/our_team/public-relations-officers.JPG"
          altText="Public Relations Officers"
          hoverKey="public_relations_officers"
        />
  </div>
        
        
        {/* Social Media Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Social Media Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Social Media Heads</h4>
        <TeamMember
          names={["Pushkar Mulajkar", "Aditya Tidake", "Samierra Arora"]}
          imageSrc="/our_team/social-media-heads.JPG"
          altText="Social Media Heads"
          hoverKey="social_media_heads"
        />
  </div>
        
        
        {/* Tech Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Tech Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Tech Heads</h4>
        <TeamMember
          names={["Madhura Deshmukh", "Manas Gawali", "Riddhi Lahare"]}
          imageSrc="/our_team/tech-heads.JPG"
          altText="Tech Heads"
          hoverKey="tech_heads"
        />
  </div>
        

        {/* Marketing Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Marketing Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Marketing Heads</h4>
        <TeamMember
          names={["Manas Yeola", "Pratik Chavan", "Gauravi Muttha"]}
          imageSrc="/our_team/marketing-heads.jpg"
          altText="Marketing Heads"
          hoverKey="marketing_heads"
        />
  </div>
        

        {/* Production Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Production Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Production Heads</h4>
        <TeamMember
          names={["Vihan Wani", "Pranav Wagh"]}
          imageSrc="/our_team/video-editing-heads.jpg"
          altText="Video Editing Heads"
          hoverKey="video_editing_heads"
        />
  </div>
        

        {/* Photography Heads */}
        <div className="flex flex-col items-center">
    {/* <Title 
        text="Photography Heads" 
        style={{color: "var(--firefly)" }} 
        /> */}
        <h4 className="font-heading" >Photography Heads</h4>
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