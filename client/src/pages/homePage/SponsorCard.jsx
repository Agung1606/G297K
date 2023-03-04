import React, { useEffect, useState } from 'react';
import CoffeeImg from '../../assets/starbucks.jpg';
import CosmeticImg from '../../assets/cosmetic.jpeg';
import McdImg from '../../assets/mcd.png';

const advert = [
    {
      title: 'McDonald\'s',
      webUrl: 'www.mcdonalds.com',
      imgUrl: McdImg
    },
  {
    title: 'MikaCosmetics',
    webUrl: 'www.mikacosmetics.com',
    imgUrl: CosmeticImg
  },
  {
    title: 'Starbucks',
    webUrl: 'www.starbucks.com',
    imgUrl: CoffeeImg
  },
];

// `${import.meta.env.VITE_BASE_URL}assets/${advert[index].imgUrl}`

const SponsorCard = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
                            setIndex((index) => {
                                if(index < advert.length-1) {
                                    return index + 1;
                                }
                                return 0;
                            })
                        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='min-w-[300px] max-w-[350px] bg-[#f0f0f0] dark:bg-[#252425] rounded-lg shadow-md p-4'>
            <div className='text-center'>
                <h1 className='text-deep-blue dark:text-white font-semibold text-2xl'>
                    Sponsor
                </h1>
                {/* LINE */}
                <div className='w-full h-[1px] my-4 bg-black/40 dark:bg-white/40' />
            </div>
            <div className='text-center mb-1'>
                <h3 id='test' className='text-2xl text-deep-blue dark:text-white tracking-wider'>
                    {advert[index].title}
                </h3>
                <h6 className='text-dark-grey dark:text-[#C8C8C8] cursor-pointer'>
                    {advert[index].webUrl}
                </h6>
            </div>
            <div>
                <img 
                    src={advert[index].imgUrl}
                    alt='advert-img'
                    className='rounded-sm text-deep-blue dark:text-white'
                />
            </div>
        </div>
    )
}

export default SponsorCard