import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginFormValues } from 'types/FormValues';
import 'components/login-form/style/LoginForm.css';

const LoginForm = () => {
  /**
   * Form Examples
   * https://react-hook-form.com/kr/get-started/#Quickstart
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [data, setData] = useState<LoginFormValues>({
    id: '',
    pw: '',
  });

  const onSubmit = (formData: LoginFormValues) => {
    setData(formData);
  };

  return (
    <>
      <form className='login_form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='login_form__title'>이메일 로그인</h1>
        <input
          className='login_form__id_input'
          placeholder='Input ID'
          {...register('id', { required: '필수 항목임' })}
        />
        {errors.id && <p>{errors.id.message}</p>}

        <input
          className='login_form__pw_input'
          placeholder='Input PassWord'
          type='password'
          {...register('pw', { required: '필수 항목임' })}
        />
        {errors.pw && <p>{errors.pw.message}</p>}

        <button className='login__form__submit_button' type='submit'>
          로그인
        </button>

        <div className='login_form__test'>
          <p>login form test area</p>
          <p>ID : {data.id}</p>
          <p>PW : {data.pw}</p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
