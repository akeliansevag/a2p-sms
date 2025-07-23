import Banner from "./components/Banner";
import Glance from "./components/Glance";
import Header from "./components/Header";
import LogoMarquee from "./components/LogoMarquee";

export default function Home() {
  return (
   <div>
      <Header />
      <Banner />
      <LogoMarquee />
      <Glance />
   </div>
  );
}
