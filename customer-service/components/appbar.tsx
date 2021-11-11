import Link from "next/link";

import Image from "next/image";

import { Navbar, Container, Nav } from "react-bootstrap";
const Appbar = () => {
  return (
    <Navbar
      fixed="top"
      expand="sm"
      bg="light"
      style={{ borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc" }}
    >
      <Container className="w-100">
        <Navbar.Brand>
          <Link href="/">
            <a>
              <Image
                src="/brand-logo-b.svg"
                alt="미남이시네요 로고"
                width="166"
                height="44"
              />
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="d-flex my-2">
            <Nav className="me-auto">
              <Nav.Item className="me-3 my-2">
                <Link href="/event">
                  <a className="text-dark">이벤트</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-3 my-2">
                <Link href="/review">
                  <a className="text-dark">시술후기</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-3 my-2">
                <Link href="https://www.youtube.com/">
                  <a className="text-dark d-flex justify-content-center">
                    <p className="me-1">미남TV</p>
                    <Image
                      src="/youtube_logo.svg"
                      alt="youtube 로고"
                      width="24"
                      height="16"
                    />
                  </a>
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Appbar;
