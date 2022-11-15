import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../util/container";
import { useTheme } from ".";

export const Header = ({ data }) => {
  const theme = useTheme();

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-700 dark:to-gray-800",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 dark:border-blue-700",
    teal: "border-b-3 border-teal-200 dark:border-teal-700",
    green: "border-b-3 border-green-200 dark:border-green-700",
    red: "border-b-3 border-red-300 dark:border-red-700",
    pink: "border-b-3 border-pink-200 dark:border-pink-700",
    purple: "border-b-3 border-purple-200 dark:border-purple-700",
    orange: "border-b-3 border-orange-200 dark:border-orange-700",
    yellow: "border-b-3 border-yellow-300 dark:border-yellow-600",
  };

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  const [windowUrl, setUrl] = React.useState("");
  const isBrowser = typeof window !== "undefined";
  const hasUrl = isBrowser ? window.location.href : "";

  React.useEffect(() => {
    setUrl(hasUrl);
  }, [hasUrl]);

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  const [isActive, setIsActive] = useState(false);

  const toggleNav = (event) => {
    setIsActive((current) => !current);
  };

  return (
    <div className={`bg-gradient-to-b ${headerColorCss}`}>
      <Container size="custom" className="py-0 absolute z-10 w-full">
        <div className="flex items-center justify-between flex-wrap">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link href="/" passHref>
              <a className="flex items-center">
                {/* <Icon
                  parentColor={data.color}
                  data={{
                    name: data.icon.name,
                    color: data.icon.color,
                    style: data.icon.style,
                  }}
                  className="inline-block h-auto w-10 mr-1"
                />{" "}
                Tina Starter */}
                <img src={data?.image} className="h-11"></img>
              </a>
            </Link>
          </h4>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={`inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleNav}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={` w-6 h-6 ${
                isActive ? "rotate-90" : ""
              } transition-all`}
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${isActive ? "" : "hidden"}`}
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent md:bg-transparent dark:border-gray-700">
              {data.nav &&
                data.nav.map((item, i) => {
                  const activeItem =
                    item.href === ""
                      ? typeof location !== "undefined" &&
                        location.pathname == "/"
                      : windowUrl.includes(item.href);
                  return (
                    <li
                      key={`${item.label}-${i}`}
                      className={`${
                        activeItem ? activeItemClasses[theme.color] : ""
                      } text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    >
                      <Link href={`${prefix}/${item.href}`} passHref>
                        <a className="select-none	text-base inline-block tracking-wide font-regular transition duration-150 ease-out opacity-70 hover:opacity-100 py-8">
                          {item.label}
                        </a>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};
