import { motion } from "framer-motion";

const AnimateText = ({
  text,
  animate,
}: {
  text: string[];
  animate: boolean;
}) => {
  const animation = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.span
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      className="text-4xl font-thin text-white"
      transition={{ staggerChildren: 0.1 }}
    >
      {text.map((line, idx) => (
        <span key={idx} className="block">
          {line.split(" ").map((word, idx) => (
            <span key={idx} className="inline-block">
              {word.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  variants={animation}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

export default AnimateText;
