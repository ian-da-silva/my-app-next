import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import BreadCrumb from "../components/BreadCrumb";
// import Carrousel from "./components/Carrousel";
import NavBar from "../components/NavBar";
// import Divider from "./components/Divider";
// import Card from "./components/Card";


export default function Home() {
  return (
    <main>
      <NavBar />
      <BreadCrumb />
      <h1>Bem vindo ao MercadoBG!</h1>
      <Link href="/users">users</Link>
      <ProductCard />
      <button className="btn">Default</button>
      <button className="btn rounded-lg">Default</button>
      <Footer />
    </main>
  );
}