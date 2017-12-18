import React from 'react'
import SocialLogin from 'react-social-login'
 
const Button = ({ children, triggerLogin, ...props }) => (
  		<div class="col-sm" onClick={triggerLogin} {...props}>
            <a href="javascript:void(0)" class="btn-facebook">
              <i class="icon ion-social-facebook"></i>
              { children }
            </a>
          </div>
)
 
  // <button onClick={triggerLogin} {...props}>
  // <i class="icon ion-social-facebook"></i>
  //   { children }
  // </button>

export default SocialLogin(Button)