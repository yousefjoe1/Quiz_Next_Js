"use client";
import React from "react";

import { motion } from "framer-motion";

const Transitions = ({ children,marginNum = 100 }: Readonly<{ children: React.ReactNode,marginNum:number }>) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, marginLeft: marginNum + 10 }}
      animate={{ opacity: 1, scale: 1,marginLeft:0 }}
      transition={{ duration: 0.5 ,delay: marginNum / 2}}
    >
      {children}
    </motion.div>
  );
};

export default Transitions;
