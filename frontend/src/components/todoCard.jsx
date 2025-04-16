import { motion } from 'framer-motion';
function StatCard({ title, count, color, icon }) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`p-8 rounded-xl shadow-lg ${color} text-white flex items-center justify-start`}
      >
        {icon}
        <div className="ml-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-3xl font-bold mt-2">{count}</p>
        </div>
      </motion.div>
    );
}

export default StatCard