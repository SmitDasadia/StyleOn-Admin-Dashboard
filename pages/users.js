/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';
import { useState } from "react";
import User from '../models/User';
const mongoose = require('mongoose');






const users = ({ products }) => {
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
        product.name.toLowerCase().includes(search.toLowerCase())
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
                    <CardTitle tag="h5">All Users</CardTitle>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-sm-10">
                                <form className="form-inline">
                                    <div className="input-group">
                                        <input className="form-control rounded-pill py-2" type="text"
                                            placeholder="Search products by Name"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)} />

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className="table-responsive">
                        <Table className="text-nowrap mt-3 align-middle border-2 rounded" borderless>
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="cursor-pointer" onClick={() => handleSort("No")}>No {sort.column === "No" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    
                                    <th className="cursor-pointer" onClick={() => handleSort("name")}>Name {sort.column === "name" ? (sort.order === "asc" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("email")}>Email {sort.column === "email" ? (sort.order === "email" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("phone")}>Phone {sort.column === "phone" ? (sort.order === "phone" ? "▲" : "▼") : null}</th>
                                    
                                    <th className="cursor-pointer" onClick={() => handleSort("pincode")}>Pincode {sort.column === "pincode" ? (sort.order === "pincode" ? "▲" : "▼") : null}</th>
                                    <th className="cursor-pointer" onClick={() => handleSort("country")}>Country {sort.column === "country" ? (sort.order === "country" ? "▲" : "▼") : null}</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{index + 1}</td>
                                        
                                        <td>
                                            <div className="ms-3">
                                                <h6 className="mb-0">{tdata.name}</h6>
                                            </div>
                                        </td>
                                        <td>{tdata.email}</td>
                                        {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td> */}
                                        <td>{tdata.phone}</td>
                                        <td>{tdata.pincode}</td>
                                        <td>{tdata.country}</td>
                                        {/* <td>{tdata.price}</td> */}
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

export default users;



export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        })
    }
    let products = await User.find();
    let pd = await User.find().count();
    return {
        props: { products: JSON.parse(JSON.stringify(products)), products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
}