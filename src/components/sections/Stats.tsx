import { motion } from 'framer-motion';
import { STATS } from '../../lib/constants';

const stats = [
  { label: 'Projects Completed', value: STATS.projectsCompleted },
  { label: 'Happy Clients', value: STATS.happyClients },
  { label: 'Years Experience', value: STATS.yearsExperience },
  { label: 'Awards Won', value: STATS.awards },
];

export default function Stats() {
  return (
    <section className="py-24 md:py-32 bg-[#fafaf8]">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#ddd8d0]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="px-6 md:px-10 py-8 md:py-0 text-center first:pl-0 last:pr-0"
            >
              <div
                className="text-5xl md:text-7xl font-light text-[#0b1012] mb-3 leading-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#0b1012]/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
