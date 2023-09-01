// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, firestore } from '../../../config/firebase';

// import { useAuthContext } from '../../Context/AuthContext'
// const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

// export default function Signup() {
//   const [state, setState] = useState(initialState)
//   const { dispatch } = useAuthContext()
//   const handleChange = e => {
//     setState(s => ({ ...s, [e.target.name]: e.target.value }))
//   }

//   const handleSignup = (e) => {
//     e.preventDefault()
//     const { email, password, } = state
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//         addUserDoc(user)
//         window.notify("user SignUp successfuly", "success")
//       })
//       .catch((error) => {
//         window.notify("something want worng", "error")
//         // ..
//       });
//     setState(initialState)
//   }

//   const addUserDoc = async (user) => {
//     const { firstName, lastName, password } = state
//     console.log(firstName, lastName, password);
//     console.log(user);
//     try {
//       await setDoc(doc(firestore, "users", user.uid), {
//         firstName: firstName,
//         lastName: lastName,
//         email: user.email,
//         Password: password,
//         uid: user.uid
//       });
//       dispatch({ type: "LOGIN" })
//       console.log("add user in firestore");
//     }
//     catch (err) {
//       console.error(err)
//       console.log("something wants wrong");
//     }


//   }

//   return (
//     <div className="formDiv">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-6  col-lg-4 ">

//             <div className="card pt-4 px-2">
//               <h2 className='text-center pb-3'>Sign Up</h2>
//               <div className="row">
//                 <div className="col-6">
//                   <div className="mb-3">
//                     <input type="text" className="form-control" id="firstName" placeholder='FirstName' name='firstName' value={state.firstName} onChange={handleChange} />
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <div className="mb-3">
//                     <input type="text" className="form-control" id="lastName" placeholder='LastName' name='lastName' value={state.lastName} onChange={handleChange} />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="mb-3">
//                     <input type="email" className="form-control" id="email" placeholder='Email' name='email' value={state.email} onChange={handleChange} />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="mb-3">
//                     <input type="password" className="form-control" id="password" placeholder='Password' name='password' value={state.password} onChange={handleChange} />

//                   </div>
//                   <div className="mb-3">
//                     <input type="password" className="form-control" id="confirmPassword" placeholder='Confirm Password' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />

//                   </div>
//                   <div className="mb-3  text-center ">
//                     <div><input type="checkbox" />I accept the Terms of Use & Privacy Policy</div>
//                     <button className="btn btn-secondary text-white w-50 my-3" onClick={handleSignup} >Submit</button>
//                     <div>Already have an account? <Link to='/auth/signin' className='text-white'>Signin here</Link> </div>

//                   </div>

//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }















import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase'; // Update the import statement for firebase configuration
import { createUserWithEmailAndPassword } from 'firebase/auth';

import './signup.css';

const initialState = {
  email: '',
  password: '',
  confirmPassword: ''
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password, confirmPassword } = state;

    if (confirmPassword !== password) {
      window.toastify("Passwords don't match" , "error");
      return;
    }

    setIsProcessing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        window.toastify('A new user has been added successfully', 'success');
        console.log(user);
      })
      .catch(err => {
        // window.toastify('Something went wrong while creating user with email and password', 'error');
        window.notify('Something went wrong while creating user with email and password', 'error');
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
    <div className="py-5 auth bg-primary "  style={containerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="card p-4 p-md-5">
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="email"
                      className="form-control"
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
                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" disabled={isProcessing}>
                      {!isProcessing ? (
                        <span>Register</span>
                      ) : (
                        <div className="spinner spinner-grow spinner-grow-sm"></div>
                      )}
                    </button>
                    <div>Already have an account? <Link to='/auth/signin' className='text-dark mt-5 py-5'>Signin here</Link> </div>
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

