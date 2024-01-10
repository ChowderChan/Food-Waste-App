import React from 'react';
import { FacebookShareButton, InstagramShareButton } from 'react-share';

const ShareList = ({ username, shareableItems }) => {
  const generateCustomShareContent = () => {
    // Customize the shareable content based on your requirements
    return shareableItems.map((item) => `${item.name} - ${item.category}`).join('\n');
  };

  return (
    <div>
      {/* Facebook Share Button for the custom shareable content */}
      <FacebookShareButton
        url={`https://your-app-url.com/login-signup`} // Replace with your login/signup page URL
        quote={`Check out ${username}'s Shareable Items List: \n${generateCustomShareContent()}`}
      >
        Share on Facebook
      </FacebookShareButton>

      {/* Instagram Share Button for the custom shareable content */}
      <InstagramShareButton
        url={`localhost:3000`} // Replace with your login/signup page URL
        title={`Check out ${username}'s Shareable Items List: \n${generateCustomShareContent()}`}
      >
        Share on Instagram
      </InstagramShareButton>
    </div>
  );
};

export default ShareList;