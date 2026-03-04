import { motion } from "framer-motion";

const sparks = new Array(10).fill(null);

const FloatingElements = () => {
  return (
    <div className="ambient-layer" aria-hidden="true">
      <motion.div
        className="orb orb-a"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-b"
        animate={{ x: [0, -30, 20, 0], y: [0, 35, -12, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-c"
        animate={{ x: [0, 25, -22, 0], y: [0, -22, 28, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pipeline-grid" />

      {sparks.map((_, index) => (
        <motion.span
          key={`spark-${index}`}
          className="spark"
          style={{
            left: `${8 + index * 9}%`,
            animationDelay: `${index * 0.35}s`,
          }}
          animate={{ y: [0, -80, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
