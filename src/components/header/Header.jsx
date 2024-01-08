import React from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className=" rounded-sm py-2 bg-gray-400 sticky top-0 px-3 z-50 shadow-xl">
      <Container>
        <nav className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <ul className="flex flex-wrap ml-auto text-neutral-950 font-bold text-1xl">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2
                 duration-200 hover:bg-blue-200 rounded-full hover:text-black hover:font-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
