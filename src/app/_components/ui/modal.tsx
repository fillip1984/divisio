import { scrollbarWidth } from "@xobotyi/scrollbar-width";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
}) {
  const width = scrollbarWidth();
  // prevent body from being scrollable while modal is present
  // See: https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
  useEffect(() => {
    if (isOpen) {
      // console.log(`scrollbar width: ${width}`)
      document.body.classList.add("overflow-hidden", `pr-[${width}px]`);
    } else {
      document.body.classList.remove("overflow-hidden", `pr-[${width}px]`);
    }
  }, [isOpen, width]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[999] bg-black/60"
          />

          {/* main content */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="z-[1000] rounded-xl bg-foreground"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
