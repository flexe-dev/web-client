import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <section className="flex relative flex-auto flex-col items-center justify-center">
      <h1>Sorry this page could not be found</h1>
      <h2>The link you followed may be incorrect</h2>
      <Link className="underline" href={"/"}>
        Go back to the home page
      </Link>
    </section>
  );
};

export default ErrorPage;
