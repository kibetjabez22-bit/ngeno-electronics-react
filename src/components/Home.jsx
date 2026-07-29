import"./Home.css";
import background from "../assets/background.png"
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Founder from "../components/Founder";
import Reviews from "../components/Reviews";



function Home() {
  return (
    <>
      <Hero />
      <Founder />
      <Categories />
      <FeaturedProducts />
      <Reviews />
    </>
  );
}

export default Home;
