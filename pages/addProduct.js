/* eslint-disable react-hooks/rules-of-hooks */
import { React, useState, useEffect } from 'react';
import FullLayout from '../src/layouts/FullLayout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addProduct = () => {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [avialableQty, setAvialableQty] = useState('')
  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     router.push('/')
  //   }
  // },)

  const handleChange = (e) => {
    if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    else if (e.target.name == 'slug') {
      setSlug(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setDesc(e.target.value)
    }
    else if (e.target.name == 'img') {
      setImg(e.target.value)
    }
    else if (e.target.name == 'category') {
      setCategory(e.target.value)
    }
    else if (e.target.name == 'size') {
      setSize(e.target.value)
    }
    else if (e.target.name == 'color') {
      setColor(e.target.value)
    }
    else if (e.target.name == 'price') {
      setPrice(e.target.value)
    }
    else if (e.target.name == 'avialableQty') {
      setAvialableQty(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { title, slug, desc, img, category, color, size, price, avialableQty }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProduct`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let respose = await res.json()
    setTitle('')
    setSlug('')
    setDesc('')
    setImg('')
    setCategory('')
    setColor('')
    setSize('')
    setPrice('')
    setAvialableQty('')
    toast.success('Product Added Successfully!.', {
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
  return (
    <>
      <FullLayout>
        <div className="row">
          <div className="col-lg-12">
            
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
                            value={title} onChange={handleChange}

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
                            value={slug} onChange={handleChange}
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
                            value={desc} onChange={handleChange}
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
                            value={img} onChange={handleChange}
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
                            value={category} onChange={handleChange}

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
                            value={size} onChange={handleChange}
                          />

                        </div>
                      </div>
                    </div>

                    <div className="row">
                
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor='color'>color</label>
                            <input name='color' type="text" className="form-control" 
                            value={color} onChange={handleChange}/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor='price'>price</label>
                            <input name='price' type="text" className="form-control" value={price} onChange={handleChange}/>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor='avialableQty'>avialableQty</label>
                            <input name='avialableQty' type="text" className="form-control" value={avialableQty} onChange={handleChange}/>
                          </div>
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
                          <i className="ti ti-device-floppy me-1 fs-4"></i>
                          Add Product
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

export default addProduct