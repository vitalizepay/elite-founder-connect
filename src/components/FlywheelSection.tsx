import flywheelNew from '@/assets/flywheel-new.png';

const FlywheelSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Curated Members',
      description: 'Every member is carefully selected to ensure quality and trust. We prioritize decision-makers who value long-term relationships.',
    },
    {
      number: '02',
      title: 'Continuous Learning',
      description: 'Six power workshops annually covering leadership, scaling, branding, technology, AI, and decision-making.',
    },
    {
      number: '03',
      title: 'Meaningful Connections',
      description: 'Monthly coffee networking creates genuine opportunities for business introductions and relationship building.',
    },
    {
      number: '04',
      title: 'IBC Stories',
      description: 'Share your business journey. Real stories of milestones, challenges, and insights that inspire the community.',
    },
    {
      number: '05',
      title: 'Stronger Community',
      description: 'Trust and familiarity compound over time. Active participation strengthens the entire network.',
    },
    {
      number: '06',
      title: 'More Opportunities',
      description: 'A virtuous cycle where quality attracts quality, creating exponential opportunities for all members.',
    },
  ];

  return (
    <section id="flywheel" className="relative py-24 bg-[#1a3d2e] overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gold/60 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gold/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4">
              How It Works
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              The IBC Value Flywheel
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Each element reinforces the next, creating a compounding effect 
              that continuously amplifies trust, learning, and opportunities.
            </p>
          </div>

          {/* Flywheel Image with slow rotation animation */}
          <div className="flex justify-center mb-16">
            <div className="relative max-w-lg group">
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl scale-110 group-hover:scale-125 transition-transform duration-700" />
              <img
                src={flywheelNew}
                alt="IBC Value Flywheel - Curated Members, Learning, Connections, Stories, Community, Opportunities"
                className="relative w-full h-auto rounded-lg animate-[spin_60s_linear_infinite] hover:animate-none transition-all"
              />
            </div>
          </div>

          {/* Steps Grid with staggered animations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-2 -left-2 text-6xl font-display font-bold text-white/10 group-hover:text-gold/30 transition-colors duration-300">
                  {step.number}
                </div>
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300 ml-4 mt-4 group-hover:translate-y-[-4px] group-hover:shadow-lg">
                  <h4 className="font-display text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="font-display text-xl text-white/80 italic">
              "Curated members → Learning → Connections → Visibility → Stronger community → More opportunities"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlywheelSection;
