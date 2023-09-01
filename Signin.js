// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../../config/firebase';

// const initialState = { 
//   email: "",
//    password: "",

//    };


// export default function Signin() {
//   const [state, setState] = useState(initialState);

//   const handleChange = e => {
//     setState(s => ({ ...s, [e.target.name]: e.target.value }))
//   }

//   const handleSignin = e => {
//     e.preventDefault()
//     const { email, password } = state
//     signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
      
      
//      window.notify("user Signin successfuly", "success")
//      // ...
//     })
//     .catch((error) => {
//       window.notify("something want worng", "error")
    
//     });
// setState(initialState)


//   }

//   return (



    
    // <div className="formDiv">
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       <div className="col-12 col-md-6  col-lg-4 ">
    //         <form>
    //           <div className="card pt-4 px-2">
    //             <h2 className='text-center pb-3'>Log in</h2>

    //             <div className="row">
    //               <div className="col-12">

    //                 <div className="mb-3">
    //                   <input type="email" className="form-control" id="email" placeholder='Email' name='email' value={state.email} onChange={handleChange} />
    //                 </div>
    //               </div>
    //               <div className="col-12">
    //                 <div className="mb-3">
    //                   <input type="password" className="form-control" id="password" placeholder='Password' name='password' value={state.password} onChange={handleChange} />
    //                 </div>
    //                 <div className="mb-3">
    //                 <Link to='/auth/signin' className='text-white float-end nav-link'>Forget Password?</Link>
    //                 </div>
    //               </div>
    //               <div className="col-12">
    //                 <div className="mb-3  text-center ">
    //                   <button className="btn btn- text-white w-50 my-3" onClick={handleSignin} >SignIn</button>
    //                   <div>If don't have an account? <Link to='/auth/signup' className='text-white'>SignUp here</Link> </div>
                     
    //                 </div>
    //               </div>
    //             </div>

    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div >
    // </div >





    // demoooooooooooooooooooooooo   codddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeee




//     <div className="py-5 auth bg-primary">
//       <div className="container">
//         <div className="row">
//           <div className="col">
//             <div className="card p-4 p-md-5" style={{width:"50%"}} >
//               <h2 className="text-center mb-4">Login</h2>
              
//               <form>
//                 <div className="row">
//                   <div className="col-12 mb-3">
//                     <input
//                       type="email"
//                       className="form-control"
//                       placeholder="Email"
//                       name="email"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
                
//                 <div className="row">
//                   <div className="col-12 mb-3">
//                     <input
//                       type="password"
//                       className="form-control"
//                       placeholder="Password"
//                       name="password"
//                       onChange={handleChange}
//                     />
//                   </div>
             
//                 <div className="col-12">
//                  <div className="mb-3  text-center ">
//                    <button className="btn btn-primary text-white w-50 my-3" onClick={handleSignin} >SignIn</button>
//                   <div>If don't have an account? <Link to='/auth/signup' className='text-dark'>SignUp here</Link> </div>
                     
//                     </div>
//             </div>




//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>




//   )
// }











import React, { useState } from 'react';
 import { auth } from '../../../config/firebase';
 import { Link } from 'react-router-dom'
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


import  './signin.css';

const initialState = {
  email: '',
  password: '',
  
};

export default function Signin() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);


  // we are gonna use usenavigate hook for navigate when we log in

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password } = state;

 

    setIsProcessing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // window.toastify('Logged In', 'success');
        window.notify('Logged In', 'success');
      
        console.log(user);

        // here we used this hook 
        navigate("/")
      })
      .catch(err => {
        window.toastify('Something went wrong while creating user with email and password', 'error');
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };


const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};



  return (
    <div className=" auth bg-primary"  style={containerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="card p-4" id='card'>
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="email"
                      className="form-control "
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
             
                  <div className="col-12 md-6">
                    <button className="btn btn-primary" id='loginButton' disabled={isProcessing}>
                      {!isProcessing ? (
                        <span>Login</span>
                      ) : (
                        <div className="spinner spinner-grow spinner-grow-sm"></div>
                      )}
                    </button>

                    <div className='mx-7'>If don't have an account? <Link to='/auth/signup' className='text-dark'>SignUp here</Link> </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
