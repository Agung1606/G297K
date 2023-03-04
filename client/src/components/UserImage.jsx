import React from 'react';

const UserImage = ({image, size="50px"}) => {
  // if user does not have profile picture then use default
  const img = image ? image : 'defaultAvatar.png';

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        cursor: "pointer",
      }}
    >
        <img
            src={`${import.meta.env.VITE_BASE_URL}assets/${img}`} 
            alt="user-image" 
            style={{ 
              objectFit: 'cover', 
              borderRadius: '50%', 
              width: size, 
              height: size 
          }}
        />
    </div>
  )
}

export default UserImage