import React from 'react';
import { useUpdateUserInfoMutation } from '../../state/api';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';
import { IconButton } from '@material-tailwind/react';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { updateUser } from '../../state/authSlice';

const EditPage = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateUserInfo] = useUpdateUserInfoMutation();

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            bio: user.bio
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const updatePromise = updateUserInfo({ data: values, token });
            toast.promise(updatePromise, {
                loading: 'Sabar gaes...',
                success: <b>Okee</b>,
                error: <b>Error</b>
            }).then(({data}) => {
                dispatch(
                    updateUser({
                        user: data
                    })
                )
            }).then(() => navigate(`/profile/${user._id}`))
        }
    });

    const flexBetween = 'flex justify-between items-center';
    const lineStyle = 'w-full h-[1px] bg-black/40 dark:bg-white/40';
    const inputStyle = `bg-[#e0e0e0] dark:bg-[#333333] w-full text-deep-blue dark:text-white
                        placeholder:text-deep-blue placeholder:dark:text-white mb-2 py-3 rounded-md 
                        pl-3 focus:outline-none placeholder:text-lg`;

    return (
        <div className='w-full h-screen pb-[12rem]'>
            <Toaster position='top-center' reverseOrder={false} />
            {/* NAV */}
            <div className={`mx-3 p-1 ${flexBetween} xs:w-5/6 mx-auto`}>
                <IconButton onClick={() => navigate(`/profile/${user._id}`)}>
                    <MdOutlineArrowBack className='text-deep-blue text-3xl dark:text-white' />
                </IconButton>
                <p className='text-xl text-deep-blue dark:text-white'>
                    Edit Profile
                </p>
            </div>
            {/* LINE */}
            <div className={`${lineStyle}`} />
            <div className="xs:w-full xs:h-full xs:mt-8 xs:flex justify-center items-center">
                <div className='max-w-[500px] bg-black/30 dark:bg-white/30 backdrop-blur-3xl rounded-xl h-full xs:border p-2 m-10 xs:m-14 xs:p-10'>
                    <h1 className='text-center text-deep-blue dark:text-white text-2xl xs:text-3xl'>
                        Settings
                    </h1>
                    <div className='mt-8'>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='grid grid-cols-2 gap-2'
                        >
                            {/* FIRST NAME */}
                            <input
                                type='text' 
                                placeholder='First Name'
                                className={`col-span-1 ${inputStyle}`}
                                values={formik.initialValues.firstName}
                                {...formik.getFieldProps('firstName')}
                            />
                            {/* LAST NAME */}
                            <input 
                                type='text' 
                                placeholder='Last Name'
                                className={`col-span-1 ${inputStyle}`}
                                values={formik.initialValues.lastName}
                                {...formik.getFieldProps('lastName')}
                            />
                            {/* USERNAME */}
                            <input 
                                type='text' 
                                placeholder='Username'
                                className={`col-span-2 ${inputStyle}`}
                                values={formik.initialValues.username}
                                {...formik.getFieldProps('username')}
                            />
                            {/* BIO */}
                            <textarea 
                                type='text'
                                placeholder='Bio'
                                maxLength={150}
                                className={`col-span-2 ${inputStyle}`}
                                values={formik.initialValues.bio}
                                {...formik.getFieldProps('bio')}
                            />
                            <button 
                                type='submit' 
                                className='col-span-2 btn-bg mt-2 py-3 rounded-md'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPage;