import { Globe, Mail, Phone, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Globe,
      label: 'Website',
      value: 'ibcgulf.com',
      href: 'https://ibcgulf.com',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@ibcgulf.com',
      href: 'mailto:contact@ibcgulf.com',
    },
    {
      icon: Phone,
      label: 'Mobile',
      value: '+971 58 557 0593',
      href: 'tel:+971585570593',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Have questions about IBC? We'd love to hear from you.
            </p>
          </AnimatedSection>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.icon === Globe ? '_blank' : undefined}
                rel={item.icon === Globe ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center p-6 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/15 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-foreground/30 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-primary-foreground/70 mb-1">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </motion.a>
            ))}
          </div>

          {/* Privacy Note */}
          <motion.div 
            className="flex items-center justify-center gap-3 text-sm text-primary-foreground/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Shield className="w-4 h-4" />
            <span>Your privacy is important to us. We never share your information.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;