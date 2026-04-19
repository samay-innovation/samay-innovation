import { motion } from 'framer-motion';
import { services } from '../../data/services';
import ServiceIcon from '../ui/ServiceIcon';
import Button from '../ui/Button';

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center gap-8 mb-16">
          <div className="w-12 h-12 rounded-full border-2 border-text-primary dark:border-dark-text-primary flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold">S</span>
          </div>
          <div className="h-px bg-border-light dark:bg-border-dark flex-1" />
        </div>

        <div className="mb-16">
          <h2 className="text-xs font-light tracking-widest uppercase text-text-tertiary dark:text-dark-text-tertiary mb-4">
            SERVICES.
          </h2>
          <p className="text-4xl md:text-5xl font-light text-text-primary dark:text-dark-text-primary max-w-2xl">
            Comprehensive Design Solutions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Icon */}
              <div className="mb-6">
                <ServiceIcon
                  lucideIcon={service.icon.charAt(0).toUpperCase() + service.icon.slice(1).replace(/-./g, x => x[1].toUpperCase())}
                  size="xl"
                  className="text-text-primary dark:text-dark-text-primary group-hover:text-accent-primary dark:group-hover:text-accent-secondary transition-colors duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-light mb-3 text-text-primary dark:text-dark-text-primary">
                {service.name}
              </h3>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-text-tertiary dark:text-dark-text-tertiary flex items-center"
                  >
                    <span className="w-1 h-1 bg-text-tertiary dark:bg-dark-text-tertiary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" href="/services">
            ALL SERVICES
          </Button>
        </div>
      </div>
    </section>
  );
}
