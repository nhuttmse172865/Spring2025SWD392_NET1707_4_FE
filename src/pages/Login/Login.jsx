import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const navigate = useNavigate();
    const handleSignUpClick = () => {
        setIsSignUpActive(true);
      };
    
      const handleSignInClick = () => {
        setIsSignUpActive(false);
      };
    
  return (
 <>
  <div className="loginpage">
  <div class={`container ${isSignUpActive ? 'right-panel-active' : ''}`}  id="container">
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                   
                </div>
                <span>or use your email for registration</span>
                <div class="infield">
                    <input type="text" placeholder="Name" />
                    <label></label>
                </div>
                <div class="infield">
                    <input type="email" placeholder="Email" name="email"/>
                    <label></label>
                </div>
                <div class="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    
                </div>
                <span>or use your account</span>
                <div class="infield">
                    <input type="email" placeholder="Email" name="email"/>
                    <label></label>
                </div>
                <div class="infield">
                    <input type="password" placeholder="Password" />
                    <label></label>
                </div>
                <a href="#" class="forgot">Forgot your password?</a>
                <button >Sign In</button>
            </form>
        </div>
        <div class="overlay-container" id="overlayCon">
        
            <div class="overlay">
           
                <div class="overlay-panel overlay-left">
                <div>
            <button className='btn-back' onClick={() => navigate('/')}>Back to HomePage</button>
        </div>
                    <h1>Welcome Back!</h1>
                    <p>Sign in to continue your skin care journey</p>
                    <button onClick={handleSignInClick} >Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                <div>
                <button className='btn-back' onClick={() => navigate('/')}>Back to HomePage</button>
        </div>
                    <h1>Hello, Friend!</h1>
                    <p>Beautiful skin is not only about cosmetics, but also about knowledge. Sign up now for a personal consultation!</p>
                    <button onClick={handleSignUpClick}>Sign Up</button>
                </div>
            </div>
            
        </div>
    </div>
  </div>

    

 </>
    
  )
}

export default Login