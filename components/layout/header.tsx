import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Button } from "tinacms";
import { Icon } from "../util/icon";

export const Header = ({ data, dark }) => {
  const theme = useTheme();

  const headerColor = {
    default:
      "text-white dark:text-white from-gray-50 to-white dark:from-gray-700 dark:to-gray-800",
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
    blue: "bg-blue-700 text-white hover:bg-blue-700 md:bg-transparent md:!text-blue-300",
    teal: "bg-teal-700 text-white hover:bg-teal-700 md:bg-transparent md:!text-teal-300",
    green:
      "bg-green-700 text-white hover:bg-green-700 md:bg-transparent md:!text-green-300",
    red: "bg-red-700 text-white hover:bg-red-700 md:bg-transparent md:!text-red-300",
    pink: "bg-pink-700 text-white hover:bg-pink-700 md:bg-transparent md:!text-pink-300",
    purple:
      "bg-purple-700 text-white hover:bg-purple-700 md:bg-transparent md:!text-purple-300",
    orange:
      "bg-orange-700 text-white hover:bg-orange-700 md:bg-transparent md:!text-orange-300",
    yellow:
      "bg-yellow-700 text-white hover:bg-yellow-700 md:bg-transparent md:!text-yellow-300",
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

  const { isDark, toggleDarkMode } = useTheme();

  return (
    <div
      className={`bg-gradient-to-b ${headerColorCss} ${
        dark ? "!text-gray-900" : ""
      }`}
    >
      <Container size="custom" className="py-0 absolute z-10 w-full">
        <div className="flex items-center justify-between flex-wrap pl-5 pr-5">
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
                <img
                  src={data?.image}
                  className={`h-11 ${dark ? "invert" : ""} dark:invert-0`}
                ></img>
              </a>
            </Link>
          </h4>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className={`max-md:dark:text-white inline-flex items-center p-2 ml-3 text-sm  rounded-lg md:hidden hover:bg-gray-600/30 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-600/30 dark:focus:ring-gray-600 `}
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
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-transparent md:bg-transparent dark:border-gray-700 max-md:dark:text-white dark:text-white">
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
                      }  block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0  dark:hover:bg-gray-700 md:dark:hover:bg-transparent hover:text-black dark:hover:text-white transition duration-150 ease-out`}
                    >
                      <Link href={`${prefix}/${item.href}`} passHref>
                        <a className="select-none	text-base inline-block tracking-wide font-regular transition duration-150 ease-out opacity-70 hover:opacity-100 py-2">
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
      <div
        className="absolute right-3 top-5 z-10 cursor-pointer select-none "
        onClick={toggleDarkMode}
      >
        <Icon
          data={{
            name: "CloudMoon",
            colorClass: "white",
            sizeClass: "small",
          }}
          className={`${dark ? "text-gray-900" : ""} dark:text-white`}
          svgProps={{ weight: isDark ? "fill" : "regular" }}
        ></Icon>
      </div>
    </div>
  );
};
