import FeatureCard from '../components/homeCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaRegSmileBeam, FaMagic, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted =  () => {
   
      fetch('http://localhost:3000/getStarted',{
         method : 'GET', 
         credentials: 'include',
      })
      .then(res => {

        if(res.status != 200) {
          return navigate('/login')
        }
          navigate('/todo')
      })
      .catch(err => console.log('catched', err))

    
    }
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-blue-500 to-green-500 text-white">
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-4 text-white"
        >
          Level Up Your Productivity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-white/80 max-w-xl mb-8"
        >
          Moiz's Todo App isn't just a task manager — it's your personal productivity companion.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="bg-white hover:bg-gray text-black px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition"
        >
          Get Started
        </motion.button>
      </section>

      <section className="py-16 px-6 bg-white/10 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Why Moiz Todo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard icon={<FaTasks />} title="Organized" desc="Group your tasks by categories and priorities." />
          <FeatureCard icon={<FaMagic />} title="Elegant UI" desc="Enjoy a rich design with animations and smooth UX." />
          <FeatureCard icon={<FaRegSmileBeam />} title="Simple to Use" desc="Add, edit and track tasks with ease." />
        </div>
      </section>

      <footer className="bg-gradient-to-r from-yellow-400 via-blue-500 to-green-500 mt-20 p-6 text-center text-sm text-white/60">
        Made with ❤️ by Moiz | Connect: <FaGithub className="inline mx-2" /> <FaLinkedin className="inline" />
      </footer>
    </div>
  );
}


