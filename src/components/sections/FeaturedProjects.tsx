import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../../data/projects';

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="section-padding bg-bg-primary dark:bg-dark-bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2-mobile md:text-h2-desktop mb-4">
            Featured Projects
          </h2>
          <p className="text-body-large text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Explore our portfolio of award-winning interior design projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/portfolio/${project.slug}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-caption uppercase tracking-wider opacity-80 mb-2">
                              {project.category}
                            </p>
                            <h3 className="text-h4-mobile md:text-h4-desktop font-semibold mb-2">
                              {project.title}
                            </h3>
                            <p className="text-body-small opacity-80">{project.location}</p>
                          </div>
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-accent-primary p-2 rounded-full"
                          >
                            <ArrowUpRight size={20} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 bg-accent-primary hover:bg-accent-hover text-white font-light px-8 py-4 rounded-lg transition-all duration-300"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
