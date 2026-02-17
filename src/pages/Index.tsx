import { useState, useCallback } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import FallingHearts from '@/components/FallingHearts';
import HeroSection from '@/components/HeroSection';
import LoveLetterSection from '@/components/LoveLetterSection';
import PhotoGallery from '@/components/PhotoGallery';
import LoveCalculator from '@/components/LoveCalculator';
import WhyILoveYou from '@/components/WhyILoveYou';
import SpicyGallery from '@/components/SpicyGallery';
import SurpriseButton from '@/components/SurpriseButton';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <FallingHearts />
          <HeroSection />
          <LoveLetterSection />
          <PhotoGallery />
          <LoveCalculator />
          <WhyILoveYou />
          <SpicyGallery />
          <SurpriseButton />
        </>
      )}
    </div>
  );
};

export default Index;
