import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast, Toaster } from 'react-hot-toast'
import { registerValidation } from '../../helper/validate';
import { useRegisterUserMutation } from '../../state/api';

const registerInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: '',
  gender: ''
};

const RegisterCard = () => {
  const [ hidePassword, setHidePassword ] = useState(true);
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();

  const formik = useFormik({
    initialValues: registerInitialValues,
    validate: registerValidation,
    // I just wanna validate when user click submit
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const registerPromise = registerUser(values).unwrap();
      toast.promise(registerPromise, {
        loading: "Sabar gaes..",
        success: (res) => <b>{res.msg}</b>,
        error: (res) => <b>{res.data.msg}</b>
      }).then((data) => {
        localStorage.setItem('userId', data.userId);
      }).then(() => navigate('/register/username'))
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
          className='flex flex-col'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex gap-x-4'>
            {/* FIRST NAME */}
            <div>
              <input 
                  type='text'
                  placeholder='First Name'
                  value={formik.initialValues.firstName}
                  className={inputStyle}
                  {...formik.getFieldProps('firstName')}
              />
              {formik.errors.firstName}
            </div>
            {/* LAST NAME */}
            <div>
              <input 
                  type='text'
                  placeholder='Last Name'
                  value={formik.initialValues.lastName}
                  className={inputStyle}
                  {...formik.getFieldProps('lastName')}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <input 
                type='email'
                placeholder='Email'
                value={formik.initialValues.email}
                className={inputStyle}
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email}
          </div>

          {/* PASSWORD */}
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

          {/* BIRTHDAY */}
          <div className='mt-2'>
            <p className='font-sans mb-1 text-lg text-deep-blue dark:text-white'>Tanggal Lahir?</p>
            <input 
              type="date" 
              value={formik.initialValues.birthday}
              className='bg-[#B8B8B8] dark:bg-[#333333] w-[70%] text-deep-blue dark:text-white mb-2 py-3 rounded-md pl-3 focus:outline-none placeholder:text-lg'
              {...formik.getFieldProps('birthday')}
            />
          </div>

          {/* GENDER */}
          <div className='mt-2'>
            <p className='font-sans mb-1 text-lg text-deep-blue dark:text-white'>Jenis Kelamin?</p>
            <fieldset 
              value={formik.initialValues.gender}
              {...formik.getFieldProps('gender')} 
              className='border border-[#B8B8B8] dark:border-[#333333] p-3 rounded-md w-full flex justify-between items-center'
            >
              <div className='flex items-center'>
                <input 
                  type="radio" 
                  id="Laki Laki" 
                  value="Man" 
                  name="gender"
                  className='w-4 h-4 text-blue/80 bg-gray-100 border-gray-300 focus:ring-blue' 
                />
                <label 
                  htmlFor="Laki Laki"
                  className='ml-2 text-md font-medium text-deep-blue dark:text-white'
                >
                  Laki Laki
                </label>
              </div>

              <div className='flex items-center'>
                <input 
                  type="radio" 
                  id="Perempuan" 
                  value="Woman" 
                  name="gender"
                  className='w-4 h-4 text-blue/80 bg-gray-100 border-gray-300 focus:ring-blue' 
                />
                <label 
                  htmlFor="Perempuan"
                  className='ml-2 text-md font-medium text-deep-blue dark:text-white'
                >
                  Perempuan
                </label>
              </div>
            </fieldset>
          </div>

          <button
            type='submit'
            className={btnStyle}
            >
                Register
          </button>
        </form>

        <div className='mt-10 xs:mt-5 text-center'>
          <span className='text-deep-blue dark:text-[#C8C8C8]'>Sudah punya akun?{" "}</span>
            <Link 
                className='w-fit cursor-pointer text-blue'
                to='/'
            >
                Login
            </Link>
        </div>

    </div>
    </div>
  )
}

export default RegisterCard;