/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';

import Product from '../models/Product';
const mongoose = require('mongoose');



const viewProducts = ({products}) => {
  return (
    <FullLayout>

    <Card>
      <CardBody>
        <CardTitle tag="h5">Project Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the projects
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle border-2 rounded" borderless>
            <thead>
              <tr>
              <th>No</th>
                <th>Img</th>
                <th>Title/Slug</th>
                <th>catgory</th>
                <th>size</th>
                <th>color</th>
                <th>Qty</th>
                <th>price</th>
                
              </tr>
            </thead>
            <tbody>
              {products.map((tdata, index) => (
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
    return {
      props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
  }