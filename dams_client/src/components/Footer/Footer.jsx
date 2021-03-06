import React from "react";
import { Container, Col, Row } from "react-bootstrap";
// css
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer__container">
      <Container fluid>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <ul className="footer__about">
              <strong>ABOUT US</strong>
              <hr />
              <li>TEST</li>
              <li>Diversity</li>
              <li>Accessibility</li>
              <li>Target Audiences</li>
            </ul>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <ul className="footer__community">
              <strong>FURTHER INFORMATIONS</strong>
              <hr />
              <li>Help </li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Trust & Safety</li>
            </ul>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <ul className="footer__support">
              <strong>CONTACT US</strong>
              <hr />
              <li>10000 Pristina, Kosovo</li>
              <li>info@gmail.com</li>
              <li>Mob: +38344223223</li>
              <li>Fax: +38338223223</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <hr />
      <h6 className="footer__copyright">
        © 2022 DAMS, Inc. All rights reserved
      </h6>
    </div>
  );
};

export default Footer;
