import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const WhoItsForSection = () => {
  const idealFor = [
    'Founders & Co-founders',
    'CEOs & Managing Directors',
    'Business Owners & Partners',
    'Senior Decision-Makers',
    'Leaders seeking trusted connections',
    'Entrepreneurs focused on long-term growth',
  ];

  const notFor = [
    'Students or fresh graduates',
    'Job seekers looking for employment',
    'Those seeking quick, transactional networking',
    'Anyone not willing to actively participate',
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Is IBC Right For You?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Who It's For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              IBC is designed for leaders who value serious growth, trusted connections, 
              and long-term relationships within the Indian business community.
            </p>
          </AnimatedSection>

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ideal For */}
            <motion.div 
              className="bg-card p-8 rounded-2xl border border-primary/20 shadow-premium"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  IBC is Ideal For
                </h3>
              </div>
              <ul className="space-y-4">
                {idealFor.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Not For */}
            <motion.div 
              className="bg-card p-8 rounded-2xl border border-border shadow-premium"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  IBC May Not Be For
                </h3>
              </div>
              <ul className="space-y-4">
                {notFor.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                className="mt-6 p-4 bg-muted/50 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-muted-foreground">
                  We maintain a curated membership to ensure every interaction 
                  within the community is valuable for all members.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;