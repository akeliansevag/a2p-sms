import Banner from "./components/Banner";
import Glance from "./components/Glance";
import Header from "./components/Header";
import LogoMarquee from "./components/LogoMarquee";
import UseCases from "./components/UseCases";
import WhyMonty from "./components/WhyMonty";

export default function Home() {
  return (
   <div>
      <Header />
      <Banner />
      <LogoMarquee />
      <Glance />
      <WhyMonty />
      <UseCases />
   </div>
  );
}
