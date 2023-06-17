/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Card, CardBody, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';
import Product from '../models/Product';
const mongoose = require('mongoose');
import { ToastContainer, toast } from 'react-toastify';





const viewProducts = ({ products }) => {
    const [sort, setSort] = useState({ column: "No", order: "asc" });
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        title: "",
        slug: "",
        desc: "",
        img: "",
        category: "",
        size: "",
        color: "",
        price: "",
        avialableQty: "",
    });

    const sortedProducts = [...products].sort((a, b) => {
        const isAsc = sort.order === "asc";
        if (a[sort.column] < b[sort.column]) {
            return isAsc ? -1 : 1;
        } else if (a[sort.column] > b[sort.column]) {
            return isAsc ? 1 : -1;
        } else {
            return 0;
        }
    });

    const filteredProducts = sortedProducts.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleSort = (column) => {
        if (sort.column === column) {
            setSort(prevSort => ({ ...prevSort, order: prevSort.order === "asc" ? "desc" : "asc" }));
        } else {
            setSort({ column, order: "asc" });
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setUpdatedProduct({
            title: product.title,
            slug: product.slug,
            desc: product.desc,
            img: product.img,
            category: product.category,
            size: product.price,
            color: product.color,
            price: product.price,
            avialableQty: product.avialableQty,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product/updateProduct?productId=${selectedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            const res = await response.json();
            if (res.success) {
                toast.success("Product has been Updated.", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setSelectedProduct(null);
                setUpdatedProduct({
                    title: "",
                    slug: "",
                    desc: "",
                    img: "",
                    category: "",
                    size: "",
                    color: "",
                    price: "",
                    avialableQty: "",
                });
            } else {
                toast.error('error in product updation!', {
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



            setIsEditModalOpen(false);

        } catch (error) {
            console.error('Error occurred while updating the product', error);
        }
    };


    const handleDeleteProduct = async () => {
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/product/deleteProduct?productId=${selectedProduct?._id}`,
            {
                method: 'DELETE',
            }
        );
        let response = await res.json();
        toast.success("Product has been deleted.", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        setIsModalOpen(false);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };



    return (
        <FullLayout>
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

            <Card>
                <CardBody>
                    <CardTitle tag="h5">All Products</CardTitle>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-sm-10">
                                <form className="form-inline">
                                    <div className="input-group">
                                        <input className="form-control rounded-pill py-2" type="text"
                                            placeholder="Search products by title"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)} />

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="table-responsive">
                        <Table className="text-nowrap mt-3 align-middle border-2 rounded" borderless>
                            <thead>
                                <tr>
                                    <th className="cursor-pointer" onClick={() => handleSort("No")}>No {sort.column === "No" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th>Img</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("title")}>Title/Slug {sort.column === "title" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("category")}>Category {sort.column === "category" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("size")}>Size {sort.column === "size" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("color")}>Color {sort.column === "color" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("avialableQty")}>Qty {sort.column === "avialableQty" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("price")}>Price {sort.column === "price" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center p-2">
                                                <img
                                                    src={tdata.img}

                                                    alt="avatar"
                                                    width="45"
                                                    height="45"
                                                />

                                            </div>
                                        </td>
                                        <td>
                                            <div className="ms-3">
                                                <h6 className="mb-0">{tdata.title}</h6>
                                                <span className="text-muted">{tdata.slug}</span>
                                            </div>
                                        </td>
                                        <td>{tdata.category}</td>
                                        {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td> */}
                                        <td>{tdata.size}</td>
                                        <td>{tdata.color}</td>
                                        <td>{tdata.avialableQty}</td>
                                        <td>{tdata.price}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-success btn-md text-white"
                                                onClick={() => handleEdit(tdata)}
                                            >
                                                <i className="bi bi-pen"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-md text-white ms-2"
                                                onClick={() => handleOpenModal(tdata)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={isEditModalOpen} toggle={() => setIsEditModalOpen(!isEditModalOpen)}>
                <ModalHeader toggle={() => setIsEditModalOpen(!isEditModalOpen)}>Edit Product</ModalHeader>
                <ModalBody>
                    {selectedProduct && (
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={updatedProduct?.title || selectedProduct.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="slug" className="form-label">Slug</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="slug"
                                    name="slug"
                                    value={updatedProduct?.slug || selectedProduct.slug}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Desc</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="desc"
                                    name="desc"
                                    value={updatedProduct?.desc || selectedProduct.desc}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label">Img</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="img"
                                    name="img"
                                    value={updatedProduct?.img || selectedProduct.img}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    className="form-control"
                                    id="category"
                                    name="category"
                                    value={updatedProduct?.category || selectedProduct.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Category</option>
                                    <option value="SportsWear">SportsWear</option>
                                    <option value="Tshirt">Tshirt</option>
                                    <option value="Ethinx">Ethinx</option>
                                    <option value="Shorts">Shorts</option>
                                    {/* Add more options here */}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="size" className="form-label">Size</label>
                                <select
                                    className="form-control"
                                    id="size"
                                    name="size"
                                    value={updatedProduct?.size || selectedProduct.size}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    {/* Add more options here */}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    value={updatedProduct?.color || selectedProduct.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={updatedProduct?.price || selectedProduct.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="avialableQty" className="form-label">AvialableQty</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="avialableQty"
                                    name="avialableQty"
                                    value={updatedProduct?.avialableQty || selectedProduct.avialableQty}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                    <Button color="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={isModalOpen} toggle={handleCloseModal}>
                <ModalBody>
                    Are you sure you want to delete the product: {selectedProduct?.title} {selectedProduct?._id}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteProduct}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </FullLayout>
    );
};

export default viewProducts;



export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        })
    }
    let products = await Product.find();
    let pd = await Product.find().count();
    return {
        props: { products: JSON.parse(JSON.stringify(products)), products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}