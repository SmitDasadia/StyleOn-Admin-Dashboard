/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';

import User from '../models/User';
const mongoose = require('mongoose');



const viewProducts = ({products}) => {
  return (
    <FullLayout>

    <Card>
      <CardBody>
        <CardTitle tag="h5" style={{padding: "20px"}}>Project Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6" style={{padding: "20px"}}>
          Overview of the projects
        </CardSubtitle>
        <div className="table-responsive" style={{padding: "20px"}}>
          <Table className="text-nowrap mt-3 align-middle border-2 rounded " borderless>
            <thead>
              <tr>
              <th>No</th>
                {/* <th>Img</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {products.map((tdata, index) => (
                <tr key={index} className="border-top" style={{padding: "20px"}}>
                    <td>{index + 1}</td>
                  {/* <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.img}
                        
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      
                    </div>
                  </td> */}
                  <td>
                  <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        
                      </div>
                  </td>
                  <td>
                  <span className="text-muted">{tdata.email}</span>
                  </td>
                  <td>{tdata.phoneNumber}</td>
                  {/* <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td> */}
                  <td>{tdata.address}</td>
                  <td>{tdata.pincode}</td>
                  {/* <td>{tdata.avialableQty}</td>
                  <td>{tdata.price}</td> */}
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
    let products = await User.find();
    return {
      props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
    }
  }