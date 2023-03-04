import React from 'react'

const Loader = ({width, height}) => {
    const circleCommonClasses = `${width} ${height} bg-blue rounded-full`;
  return (
    <div className='flex'>
        <div className={`${circleCommonClasses} mr-1 animate-bounce`} />
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`} />
        <div className={`${circleCommonClasses} animate-bounce400`} />
    </div>
  )
}

export default Loader;