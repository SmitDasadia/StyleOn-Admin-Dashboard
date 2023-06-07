/* eslint-disable @next/next/no-img-element */
import React ,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'mongoose';
import { useRouter } from 'next/router';

const Login = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/dashboard')
    }
  })
  

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }

    else if (e.target.name == 'name') {
      setName(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/adminLogin`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let respose = await res.json()
    console.log(respose)
    setName('')
    setEmail('')
    setPassword('')
    if (respose.success) {
      localStorage.setItem('token', respose.token)
      toast.success('You are successfully logged in.', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}/dashboard`)
      }, 4000);
    } else {
      toast.error('Invalid Credentials.', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>



      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <div className="position-relative overflow-hidden radial-gradient min-vh-100">
          <div className="position-relative z-index-5">
            <div className="row">
              <div className="col-lg-6 col-xl-8 col-xxl-8">
                <a href="./index.html" className="text-nowrap logo-img d-block px-4 py-9 pb-5 pb-xl-0 w-100">
                  <img src="../../dist/images/logos/dark-logo.svg" width="180" alt="" />
                </a>
                <div className="d-none d-lg-flex align-items-center justify-content-center">
                  <img src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/backgrounds/login-security.svg" alt="" className="img-fluid" width="500" />
                </div>
              </div>
              <div className="col-lg-6 col-xl-4 col-xxl-4">
                <div className="card mb-0 shadow-none rounded-0 min-vh-100 h-100">
                  <div className="d-flex align-items-center w-100 h-100">
                    <div className="card-body px-xxl-5">
                      <h2 className="mb-3 fs-7 fw-bolder">Welcome to Modernize</h2>
                      <p className=" mb-9">Your Admin Dashboard</p>
                     
                      
                      <form onSubmit={handleSubmit} className="mt-8 " method="POST">
                      <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input value={name} onChange={handleChange} name="name" type="name" className="form-control" id="nmae" aria-describedby="name" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                          <input value={email} onChange={handleChange} name="email" type="email" className="form-control" id="email" aria-describedby="email" />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                          <input value={password} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                       
                        <button type='submit' className="btn btn-primary w-100 py-8 mb-4 rounded-2">Sign In</button>
                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login