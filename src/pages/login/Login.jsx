import React from 'react'
import './Login.css'
import Header from '../../components/customer/header/Header'
import LoginForm from '../../components/common/form/login/LoginForm'
import LoginContent from '../../components/common/form/login/content/LoginContent'

const Login = () => {
  return (
    <div className='relative'>
        <Header isShowButtonLogin={false} isShowSearch={false} />
        <div className='login-page-container'>
            <div id="container-login" className='container mx-auto container-content-login grid grid-cols-12'>
                <div className='col-span-4' id="container-form-login">
                    <LoginForm />
                </div>
                <div className='ml-7 col-span-8'>
                      <LoginContent />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login