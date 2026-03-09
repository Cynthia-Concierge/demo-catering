import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section — full-width image like the URBN site */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=85"
          alt="Catering event with wood-fired pizza"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        <div className="absolute bottom-16 left-8 md:left-16 z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-wide">
            ember & oak
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.4em] text-gray-300 mt-2">
            Wood-Fired Catering
          </p>
        </div>
      </section>

      {/* About Section — dark bg with description + CTA + testimonial */}
      <section id="about" className="bg-darkest py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-serif uppercase tracking-widest mb-8">
            Full Service Catering and Pizza Truck &mdash; Serving the San Diego, Orange, and Los Angeles Areas
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-4">
            The team behind Ember & Oak has been serving guests for over 10 years with award-winning
            food and a unique brand of hospitality. Our full-service catering division features custom
            wood-fired pizza trucks, and we work with our clients to create menus specifically for each
            event and budget. Let&apos;s work together to craft the perfect menu for your guests.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-8">
            If you are looking for catering in San Diego, Orange County, or Los Angeles,
            contact us at <span className="text-gold">619-555-0142</span> for a consultation.
          </p>

          <a
            href="/book"
            className="inline-block px-8 py-3 bg-gold text-black font-semibold text-sm uppercase tracking-widest hover:bg-gold-hover transition-colors"
          >
            Reserve the Truck
          </a>
        </div>

        {/* Testimonial */}
        <div id="reviews" className="max-w-3xl mx-auto mt-16 text-center border-t border-white/10 pt-10">
          <p className="text-gray-300 italic text-sm md:text-base leading-relaxed">
            &ldquo;The pizza truck was an absolute hit at our work event! The pizzas were not only delicious
            but also a fun and unique catering option that everyone loved. The team couldn&apos;t stop raving
            about the variety of flavors and the quality of the food. On top of that, we captured some
            fantastic photos of our group enjoying the experience, which made the event even more memorable.
            Highly recommend this pizza truck for any gathering&mdash;it&apos;s a guaranteed crowd-pleaser!&rdquo;
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-widest mt-4">
            Veronica V. &mdash; Google Review
          </p>
        </div>
      </section>

      {/* Services Grid — 2x2 alternating image/text like URBN */}
      <section id="services" className="grid grid-cols-1 md:grid-cols-2">
        {/* Top-left: text */}
        <div className="bg-dark flex flex-col items-center justify-center p-12 md:p-16 text-center min-h-[300px]">
          <h3 className="text-lg md:text-xl uppercase tracking-widest font-serif mb-4">
            On and Off-Site Catering
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Arrange the perfect catered meal, prepared and served at your location or one of ours.
          </p>
          <a href="/book" className="text-gold mt-6 text-lg hover:translate-x-1 transition-transform inline-block">
            &rarr;
          </a>
        </div>

        {/* Top-right: image */}
        <div className="relative min-h-[300px] md:min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
            alt="Catering event setup"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom-left: image */}
        <div className="relative min-h-[300px] md:min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
            alt="Wood-fired pizza preparation"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom-right: text */}
        <div className="bg-dark flex flex-col items-center justify-center p-12 md:p-16 text-center min-h-[300px]">
          <h3 className="text-lg md:text-xl uppercase tracking-widest font-serif mb-4">
            Reserve the Truck
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Reserve our wood-fired pizza truck to feed (and entertain) your guests.
          </p>
          <a href="/book" className="text-gold mt-6 text-lg hover:translate-x-1 transition-transform inline-block">
            &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}
