import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <section className="flex flex-col">
      <h1>Sorry this page could not be found</h1>
      <h2>The link you followed may be incorrect</h2>
      <Link href={"/"}>Go back to the home page</Link>
    </section>
  );
};

export default ErrorPage;
