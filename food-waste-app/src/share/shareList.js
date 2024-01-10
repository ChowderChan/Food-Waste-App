import React from 'react';
import { FacebookShareButton, InstagramShareButton } from 'react-share';

const ShareList = ({ username, shareableItems }) => {
  const generateCustomShareContent = () => {
    return shareableItems.map((item) => `${item.name} - ${item.category}`).join('\n');
  };

  return (
    <div>
      
      <FacebookShareButton
        url={`localhost:3000`}
        quote={`Check out ${username}'s Shareable Items List: \n${generateCustomShareContent()}`}
      >
        Share on Facebook
      </FacebookShareButton>

      
      <InstagramShareButton
        url={`localhost:3000`}
        title={`Check out ${username}'s Shareable Items List: \n${generateCustomShareContent()}`}
      >
        Share on Instagram
      </InstagramShareButton>
    </div>
  );
};

export default ShareList;