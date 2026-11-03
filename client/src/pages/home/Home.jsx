import CallToAction from "./CallToAction";
import Categories from "./Categories";
import FeatureJobs from "./FeatureJobs";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeatureJobs />
      <HowItWorks />
      <CallToAction />
    </>
  );
};

export default Home;
