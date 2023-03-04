import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state/authSlice';
import { useLoginUserMutation } from '../../state/api';

const loginInitialValues = {
    username: '',
    password: ''
};

const LoginCard = () => {
    const [ hidePassword, setHidePassword ] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser] = useLoginUserMutation();

    const formik = useFormik({
        initialValues: loginInitialValues,
        // I just wanna validate when user clik submit button
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            const loginPromise = loginUser(values).unwrap();
            toast.promise(loginPromise, {
                loading: 'Sabar gaes...',
                success: (res) => <b>{res.msg}</b>,
                error: (res) => <b>{res.data.msg}</b>
            }).then((data) => {
                dispatch(
                    setLogin({
                        user: data.userData,
                        token: data.token
                    })
                )
            }).then(() => navigate('/home'));
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
        <div className={containerStyle}
        >
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
                <div className='relative'>
                    <input 
                        type={hidePassword ? 'password' : 'text'}
                        placeholder='Password'
                        value={formik.initialValues.password}
                        className={inputStyle}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password}
                    <div 
                        className='absolute right-3 top-[15px] cursor-pointer'
                        onClick={() => setHidePassword(!hidePassword)}
                    >
                        {hidePassword 
                            ? <BiHide className='text-lg text-deep-blue dark:text-white' /> 
                            : <BiShow className='text-lg text-deep-blue dark:text-white' />}
                    </div>         
                </div>
                <button
                    type='submit'
                    className={btnStyle}
                >
                    Login
                </button>
            </form>
            <div className='text-center mt-10'>
                <Link className='w-fit cursor-pointer text-blue'>
                    Lupa password?
                </Link>
            </div>
        </div>
        <div className='mt-20 text-center'>
            <span className='text-deep-blue dark:text-[#C8C8C8]'>Belum punya akun?{" "}</span>
            <Link 
                className='w-fit cursor-pointer text-blue'
                to='/register'
            >
                Daftar
            </Link>
        </div>
    </div>
  )
}

export default LoginCard;