import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "/",
      alt: "Home",
    },
    {
      id: 2,
      link: "/snapshot",
      alt: "Snapshot",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-black bg-gray-100 fixed nav">
      <div></div>
      <ul className="flex">
        {links.map(({ id, link, alt }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-black duration-200 link-underline"
          >
            <Link href={link}>{alt}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
