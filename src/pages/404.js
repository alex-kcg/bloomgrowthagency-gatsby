import * as React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFoundPage = () => (
  <Layout pageTitle='Page not found'>
    <main className={`404-template`}>
      <header className="navbar-container z-50 w-full">
        <Navbar useLink={true} />
      </header>
      <section className="relative z-20 container mx-auto px-4 pt-30 pb-20 md:pt-48">
        <h1 className="font-serif font-light tracking-snug text-4xl mb-20 md:text-8xl">
          Page not found
        </h1>
      </section>
      <Footer className="container mx-auto px-4 pb-20" />
    </main>
  </Layout>
);

export default NotFoundPage;
