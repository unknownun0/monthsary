"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Section1_Opening from "@/components/Section1_Opening";
import Section2_LoveLetter from "@/components/Section2_LoveLetter";
import Section3_BigQuestion from "@/components/Section3_BigQuestion";
import Section4_Calendar from "@/components/Section4_Calendar";
import Section5_DreamDate from "@/components/Section5_DreamDate";
import Section6_FavoriteFood from "@/components/Section6_FavoriteFood";
import Section7_SpecialMessage from "@/components/Section7_SpecialMessage";
import Section8_FinalSurprise from "@/components/Section8_FinalSurprise";
import Section9_Final from "@/components/Section9_Final";
import Gallery from "@/components/Gallery";
import FloatingHearts from "@/components/FloatingHearts";
import FloatingPetals from "@/components/FloatingPetals";
import MusicPlayer from "@/components/MusicPlayer";

const slideVariants = {
  initial: { opacity: 0, scale: 0.85, y: 40 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.85, y: -40 },
};

type Step =
  | "loading"
  | "opening"
  | "loveLetter"
  | "bigQuestion"
  | "calendar"
  | "dreamDate"
  | "favoriteFood"
  | "specialMessage"
  | "finalSurprise"
  | "gallery"
  | "final";

export default function Home() {
  const [step, setStep] = useState<Step>("loading");

  const goTo = useCallback((next: Step) => setStep(next), []);

  const handleLoadingComplete = useCallback(() => goTo("opening"), [goTo]);
  const handleOpen = useCallback(() => goTo("loveLetter"), [goTo]);
  const handleLetterDone = useCallback(() => goTo("bigQuestion"), [goTo]);
  const handleYes = useCallback(() => goTo("dreamDate"), [goTo]);
  const handleNeedCheck = useCallback(() => goTo("calendar"), [goTo]);
  const handleDateSelected = useCallback(() => goTo("dreamDate"), [goTo]);
  const handleDreamDateDone = useCallback(() => goTo("favoriteFood"), [goTo]);
  const handleFoodDone = useCallback(() => goTo("specialMessage"), [goTo]);
  const handleMessageDone = useCallback(() => goTo("finalSurprise"), [goTo]);
  const handleSurpriseDone = useCallback(() => goTo("gallery"), [goTo]);
  const handleGalleryDone = useCallback(() => goTo("final"), [goTo]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-romantic-cream via-romantic-light to-romantic-pink">
      <FloatingHearts count={12} />
      <FloatingPetals count={15} />
      <MusicPlayer />

      {step === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

      <AnimatePresence mode="wait">
        {step === "opening" && (
          <ModalWrapper key="opening">
            <Section1_Opening onOpen={handleOpen} />
          </ModalWrapper>
        )}
        {step === "loveLetter" && (
          <ModalWrapper key="loveLetter">
            <Section2_LoveLetter onDone={handleLetterDone} />
          </ModalWrapper>
        )}
        {step === "bigQuestion" && (
          <ModalWrapper key="bigQuestion">
            <Section3_BigQuestion onYes={handleYes} onNeedToCheck={handleNeedCheck} />
          </ModalWrapper>
        )}
        {step === "calendar" && (
          <ModalWrapper key="calendar">
            <Section4_Calendar onDateSelected={handleDateSelected} />
          </ModalWrapper>
        )}
        {step === "dreamDate" && (
          <ModalWrapper key="dreamDate">
            <Section5_DreamDate onDone={handleDreamDateDone} />
          </ModalWrapper>
        )}
        {step === "favoriteFood" && (
          <ModalWrapper key="favoriteFood">
            <Section6_FavoriteFood onDone={handleFoodDone} />
          </ModalWrapper>
        )}
        {step === "specialMessage" && (
          <ModalWrapper key="specialMessage">
            <Section7_SpecialMessage onDone={handleMessageDone} />
          </ModalWrapper>
        )}
        {step === "finalSurprise" && (
          <ModalWrapper key="finalSurprise">
            <Section8_FinalSurprise onDone={handleSurpriseDone} />
          </ModalWrapper>
        )}
        {step === "gallery" && (
          <ModalWrapper key="gallery">
            <Gallery onDone={handleGalleryDone} />
          </ModalWrapper>
        )}
        {step === "final" && (
          <ModalWrapper key="final">
            <Section9_Final />
          </ModalWrapper>
        )}
      </AnimatePresence>

      {step !== "loading" && (
        <footer className="fixed bottom-0 left-0 right-0 z-40 text-center py-4">
          <div className="glass rounded-full inline-block px-5 py-2">
            <p className="text-xs text-romantic-foreground/50 font-quicksand">
              Made with ❤️ by Earl John Gomez
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}
