import React, { useState } from 'react';
import type { HomeProps } from 'types/Props';
import EmailSignUpForm from 'components/email-sign-up-form/EmailSignUpForm';

const EmailSignUp = ({isLoggedIn}: HomeProps) => (
    <div className='email_sign_up'>
      <h1 className='email_sign_up__title'>이메일 회원가입</h1>
      <div className='email_sign_up__container'>
        <EmailSignUpForm />
      </div>
    </div>
  )

export default EmailSignUp;
