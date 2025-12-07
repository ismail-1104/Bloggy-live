import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="aboutContainer">
        <div className="aboutHeader">
          <h1 className="aboutTitle">About Me</h1>
        </div>
        
        <div className="aboutContent">
          <div className="aboutImageContainer">
            <img 
              className="aboutImage" 
              src={`${process.env.PUBLIC_URL}/profile.jpg`}
              alt="Mohammed Ismail Shaikh" 
            />
          </div>
          
          <div className="aboutText">
            <h2 className="aboutName">Mohammed Ismail Shaikh</h2>
            <h3 className="aboutRole">Software Developer</h3>
            
            <div className="aboutDescription">
              <p>
                Hello! I'm Mohammed Ismail Shaikh, a passionate software developer 
                dedicated to creating innovative and efficient web applications. 
                I specialize in full-stack development with expertise in modern 
                technologies like React, Node.js, and MongoDB.
              </p>
              
              <p>
                Through this blog, I share my insights, experiences, and knowledge 
                about software development, programming best practices, and the 
                latest trends in technology. My goal is to contribute to the 
                developer community and help others on their coding journey.
              </p>
              
              <p>
                I'm constantly learning and exploring new technologies to stay 
                current in this ever-evolving field. When I'm not coding, I enjoy 
                reading tech blogs, contributing to open-source projects, and 
                connecting with fellow developers.
              </p>
            </div>
            
            <div className="aboutSkills">
              <h4>Tech Stack</h4>
              <div className="skillTags">
                <span className="skillTag">React</span>
                <span className="skillTag">Node.js</span>
                <span className="skillTag">MongoDB</span>
                <span className="skillTag">Express.js</span>
                <span className="skillTag">JavaScript</span>
                <span className="skillTag">Full Stack Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
