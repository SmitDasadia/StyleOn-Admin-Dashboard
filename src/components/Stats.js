import { Container, Row, Col } from 'react-bootstrap';
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const Stats = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="stat-box">
            <UserCircleIcon className="icon" />
            <h3>Total Users</h3>
            <p>1000</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-box">
            <ShoppingCartIcon className="icon" />
            <h3>Total Orders</h3>
            <p>500</p>
          </div>
        </Col>
        {/* ... */}
      </Row>
    </Container>
  );
};

export default Stats;
