import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { usernameValidation } from '../../helper/validate';
import { useRegisterUsernameMutation } from '../../state/api';

const UsernameRegisterCard = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const [registerUsername] = useRegisterUsernameMutation();
    
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: usernameValidation,
        onSubmit: async (values) => {
            const userId = localStorage.getItem("userId");
            const registerUsernamePromise = registerUsername({ values, userId }).unwrap();
            toast.promise(registerUsernamePromise, {
                loading: "Sabar gaes..",
                success: (res) => <b>{res.msg}</b>,
                error: (res) => <b>{res.data.msg}</b>
            }).then(() => {
                localStorage.removeItem("userId")
            }).then(() => navigate('/'));
        }
    });

    const inputStyle = `bg-[#B8B8B8] dark:bg-[#333333] border border-black/20 dark:border-white/20 
                        w-full text-deep-blue dark:text-white xs:border-none
                        placeholder:text-deep-blue placeholder:dark:text-white mb-2 py-3 rounded-md 
                        pl-3 focus:outline-none placeholder:text-lg`

    const containerStyle = `w-[350px] xs:w-[400px] h-auto px-3 py-7 rounded-xl xs:bg-black/5 xs:dark:bg-white/5
                            backdrop-blur-sm xs:border border-black/30 dark:border-white/30`;
    
    const btnStyle = `btn-bg w-full mt-2 py-3 rounded-md`

  return (
    <div>
        <Toaster position='top-center' reverseOrder={false} />
        <div className={containerStyle}>
            {/* FORM */}
            <form 
                onSubmit={formik.handleSubmit}
                className='flex flex-col'
            >
                <div>
                    <input 
                        type='text'
                        placeholder='Username'
                        value={formik.initialValues.username}
                        className={inputStyle}
                        {...formik.getFieldProps('username')}
                    />
                    {formik.errors.username}
                </div>
                <button
                    disabled={!userId}
                    type='submit'
                    className={btnStyle}
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

export default UsernameRegisterCard;