import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEmailSignUpFormValues } from 'types/FormValues';
import 'components/email-sign-up-form/style/EmailSignUpForm.css';

const EmailSignUpForm = () => {
  /**
   * Form Examples
   * https://react-hook-form.com/kr/get-started/#Quickstart
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmailSignUpFormValues>();

  const [data, setData] = useState<IEmailSignUpFormValues>({
    id: '',
    pw: '',
    pwConfirm: '',
    name: '',
    email: '',
    age: 0,
  });

  const onSubmit = (formData: IEmailSignUpFormValues) => {};

  return (
    <>
      <form className='sign_up__form' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='sign_up__form__id_input'
          placeholder='Input ID'
          {...register('id', { required: 'ID는 필수 항목임' })}
        />
        {errors.id && <p>{errors.id.message}</p>}

        <input
          className='sign_up__form__pw_input'
          placeholder='Input PassWord'
          type='password'
          {...register('pw', { required: 'PW는 필수 항목임' })}
        />
        {errors.pw && <p>{errors.pw.message}</p>}

        <input
          className='sign_up__form__pw_confirm_input'
          placeholder='confirm password'
          type='password'
          {...register('pwConfirm', { required: 'PwConfirm은 필수 항목임' })}
        />
        {errors.pwConfirm && <p>{errors.pwConfirm.message}</p>}

        <input
          className='sign_up__form__email_input'
          placeholder='Input email'
          {...register('email', { required: 'Email은 필수 항목임' })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          className='sign_up__form__name_input'
          placeholder='Input name'
          {...register('name', { required: 'Name은 필수 항목임' })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          className='sign_up__form__age_input'
          placeholder='Input Age'
          {...register('age', { required: 'Age는 필수 항목임' })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <button className='sign_up__form__submit_button' type='submit'>
          회원가입
        </button>
      </form>

      <div className='sign_up_form__test'>
        <p>ID : {data.id}</p>
        <p>PW : {data.pw}</p>
        <p>Confirm Pw : {data.pwConfirm}</p>
        <p>Email : {data.email}</p>
        <p>Name : {data.name}</p>
        <p>Age : {data.age}</p>
      </div>
    </>
  );
};

export default EmailSignUpForm;
