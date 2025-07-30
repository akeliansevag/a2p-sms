import Banner from "./components/Banner";
import FAQs from "./components/FAQs";
import Footer from "./components/Footer";
import Glance from "./components/Glance";
import GlobalReach from "./components/GlobalReach";
import Header from "./components/Header";
import HowItWorks from "./components/HowItWorks";
import KeyFeatures from "./components/KeyFeatures";
import LogoMarquee from "./components/LogoMarquee";
import Messaging from "./components/Messaging";
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
      <KeyFeatures />
      <HowItWorks />
      <GlobalReach />
      <Messaging />
      <FAQs />
      <Footer />
   </div>
  );
}
