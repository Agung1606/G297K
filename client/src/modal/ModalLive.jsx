import React from 'react';
import { 
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

/* Modal LiveStream Component */
const ModalLive = ({ openLive, handleLiveOpen }) => {
  return(
    <Dialog 
      open={openLive} 
      handler={handleLiveOpen}
      className="w-[350px] max-w-[360px] bg-[#252425]"
    >
        <DialogHeader className='flex justify-center items-center text-white'>
          <h1>G297K</h1>
        </DialogHeader>
        <div className='w-full h-[1px] bg-blue/50' />
        <DialogBody>
          <h3 className='text-lg text-white text-center'>
            Maaf fitur ini sedang dalam proses pengembangan
          </h3>
        </DialogBody>
        <h6 className='text-center text-sm text-white font-itim'>
          Developer: agung saputra
        </h6>
        <DialogFooter>
          <button 
            className="text-white px-4 py-1 text-lg rounded-md bg-red hover:bg-red/60"
            onClick={handleLiveOpen}
          >
            Tutup
          </button>
        </DialogFooter>
    </Dialog>
  );
};

export default ModalLive