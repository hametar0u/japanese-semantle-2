import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: "100vh"
  },
  in: {
  opacity: 1,
    y: 0,

  },
  out: {
    opacity: 0,
    y: "100vh"
  }
};

const pageTransitions = {
  type: "tween",
  ease: "anticipate"
};

export const SlidingWrapper = ({children}) => {
  return ( 
    <motion.div 
    className="p-10 mb-10 bg-cardbg rounded-xl"
    exit="out" 
    animate="in"
    initial="initial"
    variants={pageVariants}
    transition={pageTransitions}
    >
      {children}
    </motion.div>  
  );
}