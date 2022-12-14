import TeamSection from './team-section/TeamSection';
import TitleSection from './title-section/TitleSection';
import Features from './features-section/FeaturesSection';

const MainPage = (): JSX.Element => {
  return (
    <>
      <TitleSection />
      <Features />
      <TeamSection />
    </>
  );
};

export default MainPage;
