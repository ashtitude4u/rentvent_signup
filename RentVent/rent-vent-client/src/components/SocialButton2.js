import React from 'react'
import SocialLogin2 from 'react-social-login'
 
const Button = ({ children, triggerLogin, ...props }) => (
         <div class="row row-xs signin-social">
  		    <div class="col-sm" onClick={triggerLogin} {...props}>
            <a href="javascript:void(0)" class="btn-google">
              <i class="icon ion-social-google"></i>
                            { children }
            </a>
          </div>
          </div>   
)

export default SocialLogin2(Button)