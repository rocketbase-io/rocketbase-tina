import * as React from "react";

export const Wave = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    viewBox="0 0 1355 272"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      fill="currentColor"
      d="M1354.54,0.22c-139.361,3.241 -203.316,34.78 -300.416,52.612c-112.659,20.692 -200.147,-5.945 -311.12,7.926c-76.519,9.565 -100.516,40.012 -231.853,57.468c-136.662,18.164 -175.815,-10.126 -293.283,15.853c-115.057,25.447 -217.864,101.098 -217.864,138.541l1355.1,-0.195l-0.564,-272.205Z"
    ></path>
  </svg>
);
