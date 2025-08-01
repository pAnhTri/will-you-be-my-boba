"use client";

import { Button, Affix, Transition } from "@mantine/core";
import React from "react";
import { LuArrowUp } from "react-icons/lu";

interface ScrollToTopProps {
  scrollPosition: {
    y: number;
  };
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollToTop = ({ scrollPosition, scrollAreaRef }: ScrollToTopProps) => {
  return (
    <Transition
      mounted={scrollPosition.y > 100}
      transition="fade"
      duration={400}
      timingFunction="ease-in-out"
    >
      {(styles) => (
        <Affix position={{ bottom: 20, right: 20 }} style={styles}>
          <Button
            variant="filled"
            color="blue"
            onClick={() =>
              scrollAreaRef.current!.scrollTo({ top: 0, behavior: "smooth" })
            }
            classNames={{
              root: "w-16 h-16 rounded-full",
            }}
          >
            <LuArrowUp size={24} />
          </Button>
        </Affix>
      )}
    </Transition>
  );
};

export default ScrollToTop;
