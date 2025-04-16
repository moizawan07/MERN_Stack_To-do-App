import { motion } from 'framer-motion';

function FeatureCard({ icon, title, desc }) {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white/10 p-6 rounded-xl shadow-xl text-center backdrop-blur-md"
      >
        <div className="text-4xl text-white mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70">{desc}</p>
      </motion.div>
    );
}

export default FeatureCard