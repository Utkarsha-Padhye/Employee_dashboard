import React from 'react';
import "../App.css";

const Welcome = () => {
  return (
    <>
    <div className="welcome-message">
      <h1>Welcome to Employee Dashboard!</h1>
    </div>
    <div className = "para">
      <p>
      &nbsp; &nbsp; Welcome to our organization! 
        We are happy to have you here and are 
        confident that you will be a valuable addition to the team.
        </p>
      <p> &nbsp; &nbsp; On clicking Filter tab above, you will be redirected to Employee Database Page,
        Where you can search or can sort data accordingly.
        We want you to feel supported and valued as you start your journey with us, 
        so please don't hesitate to reach out if you have any questions
         or need help with anything.
      </p>
      {/* Additional content */}
    </div>
    </>
  );
};

export default Welcome;
