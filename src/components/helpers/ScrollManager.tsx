import { useEffect } from 'react';
import { useScroll } from '../../store/useScroll.ts';

export const ScrollManager = () => {
  const {
    updateScrollPercentage,
  } = useScroll((state) => {
    return {
      updateScrollPercentage: state.updateScrollPercentage,
    };
  });

  const handleScroll = () => {
    updateScrollPercentage(window.scrollY / window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <></>
  );
}
