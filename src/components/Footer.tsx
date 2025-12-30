import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-semibold tracking-wide">IBC</span>
            <span className="text-primary-foreground/70 text-sm font-display">
              Indian Business Circle
            </span>
          </div>

          {/* Tagline */}
          <p className="text-primary-foreground/60 text-sm font-display italic">
            Meet. Connect. Grow.
          </p>

          {/* Copyright */}
          <p className="text-primary-foreground/50 text-sm">
            © {currentYear} IBC. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;