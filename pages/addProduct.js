/* eslint-disable react-hooks/rules-of-hooks */

import { React,useReducer } from 'react';
import FullLayout from '../src/layouts/FullLayout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addProduct2 = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(Object.keys(formData).length == 0){
            toast.error('Please fill all required fields!.', {
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
       
        console.log(formData)
        
    
      }
    
      const addProductReducer = (state, event) => {
        return {
          ...state,
          [event.target.name]: event.target.value,
          
        }
      }
    
      const[formData, setFromData]=useReducer(addProductReducer,{})
  return (
    <>
    <FullLayout>
      <div className="row">
        <div className="col-lg-12">
        <ToastContainer />
          
          <div className="card">
            <div className="card-header bg-dark">
              <h4 className="mb-0 text-white p-2 text-center">Add Product</h4>
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <div>
                <div className="card-body">
                  
                  <div className="row pt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor='title' className="control-label">Title</label>
                        <input
                          type="title"
                          id="title"
                          className="form-control"
                          name="title"
                           onChange={setFromData}

                        />

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 has-danger">
                        <label htmlFor='slug' className="control-label">Slug</label>
                        <input
                          type="slug"
                          id="slug"
                          className="form-control form-control-danger"
                          name='slug'
                            onChange={setFromData}
                        />

                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="row-md-6 ">
                      <div className="mb-3 has-success">
                        <label htmlFor='desc' className="control-label">Description</label>
                        <textarea
                          type="desc"
                          id="desc"
                          className="form-control form-control-danger"
                          name='desc'
                            onChange={setFromData}
                        />

                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor='img'>Image Url</label>
                        <input type="img"
                          id="img"
                          className="form-control form-control-danger"
                          name='img' 
                            onChange={setFromData}
                          />
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor='category' className="control-label">category</label>
                        <input
                          type="category"
                          id="category"
                          className="form-control"
                          name="category"
                            onChange={setFromData}

                        />

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 has-danger">
                        <label htmlFor='size' className="control-label">size</label>
                        <input
                          type="size"
                          id="size"
                          className="form-control form-control-danger"
                          name='size'
                            onChange={setFromData}
                        />

                      </div>
                    </div>

                    
                  </div>

                 
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor='color'>color</label>
                          <input name='color' type="text" className="form-control" 
                            onChange={setFromData}/>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor='price'>price</label>
                          <input name='price' type="text" className="form-control"  onChange={setFromData}/>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor='avialableQty'>avialableQty</label>
                          <input name='avialableQty' type="text" className="form-control"   onChange={setFromData}/>
                        </div>
                      </div>

                    </div>



                  
                </div>

               
                <div className="form-actions">
                  <div className="card-body text-center">
                    <button
                      type="submit"
                      className="btn btn-dark rounded-4 px-4 text-center"
                    >
                      <div className="d-flex align-items-center">
                      
                        Add Product
                        <i className="bi bi-plus px-1"></i>
                      </div>
                    </button>
                   
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FullLayout>


  </>
  )
}

export default addProduct2