'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrapbookCover from './pages/ScrapbookCover';
import WelcomeLetter from './pages/WelcomeLetter';
import OurStory from './pages/OurStory';
import MemoryWall from './pages/MemoryWall';
import LittleThings from './pages/LittleThings';
import Proposal from './pages/Proposal';
import DateCalendar from './pages/DateCalendar';
import DateType from './pages/DateType';
import FinalLetter from './pages/FinalLetter';
import FinalScreen from './pages/FinalScreen';
import MusicPlayer from './shared/MusicPlayer';
import FloatingPetals from './shared/FloatingPetals';
import FloatingHearts from './shared/FloatingHearts';
import LoadingScreen from './shared/LoadingScreen';

const TOTAL_PAGES = 10;

export default function Scrapbook() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateType, setSelectedDateType] = useState<{ title: string; emoji: string; description: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const goToPage = useCallback((p: number, dir: number) => {
    setDirection(dir);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    if (page < TOTAL_PAGES - 1) goToPage(page + 1, 1);
  }, [page, goToPage]);

  const handlePrev = useCallback(() => {
    if (page > 0) goToPage(page - 1, -1);
  }, [page, goToPage]);

  const handleOpen = useCallback(() => {
    goToPage(1, 1);
  }, [goToPage]);

  if (loading) return <LoadingScreen />;

  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };

  const renderPage = () => {
    switch (page) {
      case 0: return <ScrapbookCover onOpen={handleOpen} />;
      case 1: return <WelcomeLetter onNext={handleNext} />;
      case 2: return <OurStory onNext={handleNext} onPrev={handlePrev} />;
      case 3: return <MemoryWall onNext={handleNext} onPrev={handlePrev} />;
      case 4: return <LittleThings onNext={handleNext} onPrev={handlePrev} />;
      case 5: return <Proposal onNext={handleNext} onPrev={handlePrev} />;
      case 6: return <DateCalendar onNext={(date) => { setSelectedDate(date); handleNext(); }} onPrev={handlePrev} />;
      case 7: return <DateType onNext={(type) => { setSelectedDateType(type); handleNext(); }} onPrev={handlePrev} />;
      case 8: return <FinalLetter onNext={handleNext} onPrev={handlePrev} />;
      case 9: return <FinalScreen onPrev={handlePrev} selectedDate={selectedDate} selectedDateType={selectedDateType} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9F5EF' }}>
      <FloatingPetals />
      <FloatingHearts />
      <MusicPlayer />

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === page ? '#D96C8A' : 'rgba(214, 179, 106, 0.3)',
              width: i === page ? 20 : 8,
            }}
            onClick={() => goToPage(i, i > page ? 1 : -1)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" style={{ fontFamily: 'var(--font-caveat)' }}>
        <span className="handwritten text-brown text-sm bg-paper px-3 py-1 rounded-full shadow-sm" style={{ background: '#FFFDF9' }}>
          Page {page + 1} of {TOTAL_PAGES}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
          style={{ perspective: 2000 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
