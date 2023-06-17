import React from 'react'
import { Col, Row, Card } from "reactstrap";
import FullLayout from '../src/layouts/FullLayout';


const mongoose = require('mongoose');
import Product from '../models/Product';
import User from "../models/User";
import Order from "../models/Order";


const dashboard = ({ pd, products, user, tshirt, SportsWear, Shorts, Ethnix, order, revenue }) => {
  return (
    <>
      <FullLayout>


        <div>
          {/***Sales & Feed***/}
          <Row>
            <Col lg="12" sm="12">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Users</h5>
                        <p className="card-text">Total users: {user}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Products</h5>
                        <p className="card-text">Total Products: {pd}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Orders</h5>
                        <p className="card-text">Total orders: {order}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Tshirts</h5>
                        <p className="card-text">Total Tshirts: {tshirt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">SportsWear</h5>
                        <p className="card-text">Total Products: {SportsWear}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Shorts</h5>
                        <p className="card-text">Total Shorts: {Shorts}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Ethnix</h5>
                        <p className="card-text">Total Ethnix: {Ethnix}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Total Earning</h5>
                        <p className="card-text">Total Earning: </p>
                        {Object.keys(revenue).map((e) => {
                          return <h3 key={revenue[e]._id} className="mb-4">{revenue[e].totalPrice}</h3>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        <h5 className="card-title">Total Product Sold</h5>
                        <p className="card-text">Total Product Sold: </p>
                        {Object.keys(revenue).map((e) => {
                          return <h3 key={revenue[e]._id} className="mb-4">{`${revenue[e].totalPrice}`}</h3>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* <TopCards/>  */}
            </Col>
            <Col sm="12" lg="6" xl="7" xxl="8">
              {/* <SalesChart /> */}
              {/* <TopCards/>  */}
            </Col>
            <Col sm="12" lg="6" xl="5" xxl="4">
              {/* <Feeds />  */}
            </Col>
          </Row>
          {/***Table ***/}
          <Row>
            <Col lg="12" sm="12">
              <Card>

                {/* <CardSubtitle classNameName="mb-2 text-muted" tag="h6">
        Overview of the projects
      </CardSubtitle>
      <div classNameName="table-responsive">
        <Table classNameName="text-nowrap mt-3 align-middle" borderless>
          <thead>
            <tr>
              <th>Team Lead</th>
              <th>Project</th>

              <th>Status</th>
              <th>Weeks</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((tdata, index) => (
              <tr key={index} classNameName="border-top">
                <td>
                  <div classNameName="d-flex align-items-center p-2">
                    <Image
                      src={tdata.avatar}
                      classNameName="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div classNameName="ms-3">
                      <h6 classNameName="mb-0">{tdata.name}</h6>
                      <span classNameName="text-muted">{tdata.email}</span>
                    </div>
                  </div>
                </td>
                <td>{tdata.project}</td>
                <td>
                  {tdata.status === "pending" ? (
                    <span classNameName="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                  ) : tdata.status === "holt" ? (
                    <span classNameName="p-2 bg-warning rounded-circle d-inline-block ms-3" />
                  ) : (
                    <span classNameName="p-2 bg-dark rounded-circle d-inline-block ms-3" />
                  )}
                </td>
                <td>{tdata.weeks}</td>
                <td>{tdata.budget}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div> */}




              </Card>
            </Col>
          </Row>
          {/***Blog Cards***/}
          <Row>
            {/* {BlogData.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.title}>
              <Blog
                image={blg.image}
                title={blg.title}
                subtitle={blg.subtitle}
                text={blg.description}
                color={blg.btnbg}
                />
            </Col>
          ))} */}
          </Row>
        </div>
      </FullLayout>

    </>
  )
}

export default dashboard

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
  let tshirt = await Product.count({ "category": "Tshirt" });
  let SportsWear = await Product.count({ "category": "SportsWear" });
  let Shorts = await Product.count({ "category": "Shorts" });
  let Ethnix = await Product.count({ "category": "Ethnix" });
  let user = await User.find().count();
  let order = await Order.find().count();
  let revenue = await Order.aggregate([{ $group: { _id: null, totalPrice: { "$sum": "$amount" } } }])

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      pd: JSON.parse(JSON.stringify(pd)),
      user: JSON.parse(JSON.stringify(user)),
      tshirt: JSON.parse(JSON.stringify(tshirt)),
      SportsWear: JSON.parse(JSON.stringify(SportsWear)),
      Shorts: JSON.parse(JSON.stringify(Shorts)),
      Ethnix: JSON.parse(JSON.stringify(Ethnix)),
      order: JSON.parse(JSON.stringify(order)),
      revenue: JSON.parse(JSON.stringify(revenue)),

    }, // will be passed to the page component as props
  }
}


