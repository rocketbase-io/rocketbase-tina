import Link from "next/link";

export const Button = (props: {
  buttonText: string;
  buttonHref: string;
  buttonTarget: "_blank" | "_self";
}) => {
  return (
    <a
      href={props.buttonHref}
      target={props.buttonTarget}
      className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer !no-underline "
    >
      {props.buttonText}
    </a>
  );
};
