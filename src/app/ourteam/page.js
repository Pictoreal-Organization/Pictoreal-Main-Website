import React from 'react';
import TeamMember from './TeamMember';

const Team = () => {
  const Title = ({ text, style }) => {
    return (
      <div className="text-3xl md:text-5xl font-bold text-center mb-10 -mt-3 font-heading text-[#111C33]" style={style}>
        {text}
      </div>
    );
  };
  const Position = ({ text, style }) => {
    return (
      <div className="font-heading font-bold text-2xl md:text-3xl mb-4 text-center text-[#111C33]" style={style}>
        {text}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center flex-col items-center md:bg-cover bg-no-repeat py-10" style={{ backgroundImage: "url('images/our_team/x27884380_stain_halftone_background 1.svg')" }}>

      <div className="max-w-4xl flex flex-col items-center px-4 md:w-3/4">
        <Title text="TEAM PHOTO" />

        {/* Team Photo*/}
        <div className="flex justify-center mb-12 w-full md:w-3/4">
        <TeamMember
            names={["TEAM PICTOREAL"]}
            imageSrc="/Pictofam.jpeg"
            altText="team pictoreal"
            hoverKey="team pictoreal"
            responsiveMobile={true} //  special prop
            height={500}  
          />
        </div>

        <Title text="MEET OUR TEAM" />

        {/* Magazine Coordinator */}
        <div className="flex flex-col items-center mb-12 w-full md:w-3/4 max-w-xl">
          <Position text="Magazine Coordinator"/>
          <TeamMember
            names={["Mrs. Asmita Joshi"]}
            imageSrc="/our_team/asmita-joshi.jpg"
            altText="Magazine Coordinator"
            hoverKey="magazine_coordinators"
            responsiveMobile={true} //  special prop
            height={400}  
          />

        </div>

        {/* Grid for team roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto w-full">
          {/* Magazine Secretaries */}
          <div className="flex flex-col items-center">
            <Position text="Magazine Secretary"/>
            <TeamMember
              names={["Omkar Desai"]}
              imageSrc="/our_team/V29_TEAM/V29_MagazineSecretary.JPG"
              altText="Magazine Secretary"
              hoverKey="magazine_secretary"
            />
          </div>

          {/* Joint Secretaries */}
          <div className="flex flex-col items-center">
            <Position text="Joint Secretary"/>
            <TeamMember
              names={["Harshit Vora"]}
              imageSrc="/our_team/V29_TEAM/v29_jointSecretary.JPG"
              altText="Joint Secretary"
              hoverKey="joint_secretary"
            />
          </div>

          {/* General Secretaries */}
          <div className="flex flex-col items-center">
            <Position text="General Secretaries"/>
            <TeamMember
              names={["Shraddha Dolas", "Sukanya Gupta"]}
              imageSrc="/our_team/V29_TEAM/V29_GeneralSecretary.JPG"
              altText="General Secretaries"
              hoverKey="general_secretaries"
            />
          </div>

          {/* Treasurer */}
          <div className="flex flex-col items-center">
            <Position text="Treasurer"/>
            <TeamMember
              names={["Pratik Chavan"]}
              imageSrc="/our_team/V29_TEAM/V29_treasurer.jpg"
              altText="Treasurer"
              hoverKey="treasurer"
              height={330}  
            />
          </div>

          {/* Editorial Incharge */}
          <div className="flex flex-col items-center">
            <Position text="Editorial Incharge"/>
            <TeamMember
              names={["Ayan Pathan"]}
              imageSrc="/our_team/V29_TEAM/V29_EditorialIncharge.jpg"
              altText="Editorial Incharge"
              hoverKey="editorial_incharge"
              height={400}  
            />
          </div>

          {/* Design Heads */}
          <div className="flex flex-col items-center">
            <Position text="Design Heads"/>
            <TeamMember
              names={["Salina Tamboli", "Khushi Sarda", "Bhagyashree Shirapure","Srushti Malvadkar"]}
              imageSrc="/our_team/V29_TEAM/V29_DesignHeads.jpg"
              altText="Design Heads"
              hoverKey="design_heads"
            />
          </div>

          {/* Editorial Heads */}
          <div className="flex flex-col items-center">
            <Position text="Editorial Heads"/>
            <TeamMember
              names={["Kalyani Deshpande", "Aaliya Phirphire", "Kasturi Vaidya"]}
              imageSrc="/our_team/V29_TEAM/V29_EditorialHeads.jpg"
              altText="Editorial Heads"
              hoverKey="editorial_heads"
            />
          </div>

          {/* Management Team */}
          <div className="flex flex-col items-center">
            <Position text="Management Heads"/>
            <TeamMember
              names={["Jayesh Zanwar", "Mrudul Ganvir", "Palak Rathi", "Aditya Deshpande"]}
              imageSrc="/our_team/V29_TEAM/V29_Management_Heads.JPG"
              altText="Event Managers"
              hoverKey="event_managers"
            />
          </div>

          {/* Public Relations Officers */}
          <div className="flex flex-col items-center">
            <Position text="Public Relations Officers"/>
            <TeamMember
              names={["Mahi Bhati", "Tanishka Kankal"]}
              imageSrc="/our_team/V29_TEAM/V29_PROs.jpg"
              altText="Public Relations Officers"
              hoverKey="public_relations_officers"
            />
          </div>

          {/* Social Media Heads */}
          <div className="flex flex-col items-center">
            <Position text="Social Media Heads"/>
            <TeamMember
              names={["Shrawani Choukone", "Kumud Kojabe", "Shravani Nikam"]}
              imageSrc="/our_team/V29_TEAM/V29_SocialMediaHeads.jpg"
              altText="Social Media Heads"
              hoverKey="social_media_heads"
            />
          </div>

          {/* Tech Heads */}
          <div className="flex flex-col items-center">
            <Position text="Tech Heads"/>
            <TeamMember
              names={["Hemangi Patil", "Jayachandra Vandanapu", "Mahi Goel"]}
              imageSrc="/our_team/V29_TEAM/V29_TechHeads.JPG"
              altText="Tech Heads"
              hoverKey="tech_heads"
            />
          </div>

          {/* Marketing Heads */}
          <div className="flex flex-col items-center">
            <Position text="Marketing Heads"/>
            <TeamMember
              names={["Sarthak Shastri", "Hiten Chhajed"]}
              imageSrc="/our_team/V29_TEAM/V29_MarketingHeads.jpg"
              altText="Marketing Heads"
              hoverKey="marketing_heads"
            />
          </div>

          {/* Photography Heads */}
          <div className="flex flex-col items-center">
            <Position text="Photography Heads"/>
            <TeamMember
              names={["Sanika Joshi", "Trupti Gawali"]}
              imageSrc="/our_team/V29_TEAM/V29_PhotographyHeads.jpg"
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