/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';
import { useState } from "react";
import Product from '../models/Product';
const mongoose = require('mongoose');
import * as Icon from 'react-feather';




const viewProducts = ({ products }) => {
    const [sort, setSort] = useState({ column: "No", order: "asc" });
    const [search, setSearch] = useState("");

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


    return (
        <FullLayout>

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
                                    <th className="cursor-pointer" >Edit </th>
                                    <th className="cursor-pointer" >Delete </th>

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
                                        <td className="cursor-pointer"><button type="button" className="btn btn-success btn-md text-white"><i className='bi bi-pen '></i></button></td>
                                        <td className="cursor-pointer"><button type="button" className="btn btn-danger btn-md text-white"><i className='bi bi-trash '></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
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