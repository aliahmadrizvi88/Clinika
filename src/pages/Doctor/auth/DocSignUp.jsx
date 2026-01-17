import React, { useState } from 'react';
import Button_01 from '../../../components/Button_01';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

import {
  Mail,
  Eye,
  EyeOff,
  BriefcaseMedical,
  CreativeCommons,
} from 'lucide-react';

const DocSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="border border-gray-300 rounded-2xl text-center px-20 py-10">
        <div className="flex items-center gap-2">
          <img src="/public/favicon.svg" alt="" className="w-20" />
          <h1 className="text-4xl font-extrabold text-[#3bbb9c]">
            Doctor's SignUp
          </h1>
        </div>
        <p className="py-2 text-md font-light">
          Please enter your info according to the given Instructions
        </p>

        <form action="#">
          <span className="flex justify-center items-center gap-1 my-12">
            <Input type={'text'} label={'First Name'} id={'fistname'} />
            <Input type={'text'} label={'Last Name'} id={'lastname'} />
          </span>

          <span className="flex justify-center items-center gap-1 my-12">
            <Input type={'email'} label={'Email'} id={'email'} />
            <div className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] duration-300 cursor-pointer">
              <Mail strokeWidth={1.25} />
            </div>
          </span>

          <span className="flex justify-center items-center gap-1 my-12 ">
            <Input
              type={showPassword ? 'text' : 'password'}
              label={'Password'}
              id={'password'}
            />
            <button
              className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff strokeWidth={1.25} />
              ) : (
                <Eye strokeWidth={1.25} />
              )}
            </button>
          </span>

          <span className="flex justify-center items-center gap-1 my-12 ">
            <Input
              type={showConfirm ? 'text' : 'password'}
              label={'Confrim Password'}
              id={'confrim_password'}
            />
            <button
              onClick={() => setShowConfirm((prev) => !prev)}
              className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] cursor-pointer"
            >
              {showConfirm ? (
                <EyeOff strokeWidth={1.25} />
              ) : (
                <Eye strokeWidth={1.25} />
              )}
            </button>
          </span>

          <span className="flex justify-center items-center gap-1 my-12 ">
            <Input
              type={'text'}
              label={'Specialization'}
              id={'specialization'}
            />
            <div className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] cursor-pointer">
              <BriefcaseMedical strokeWidth={1.25} />
            </div>
          </span>

          <span className="flex justify-center items-center gap-1 my-12 ">
            <Input
              type={'text'}
              label={'Licence Number'}
              id={'licence_number'}
            />
            <div className="rounded-full border border-gray-300 p-3 hover:border-[#3bbb9c] hover:text-[#3bbb9c] cursor-pointer">
              <CreativeCommons strokeWidth={1.25} />
            </div>
          </span>

          <Button_01 label={'SignUp'} className="my-15" />
        </form>

        <Link to="/auth/doc-signIn" className="text-[#3bbb9c]">
          Already had a account?
        </Link>
      </div>
    </div>
  );
};

export default DocSignUp;
