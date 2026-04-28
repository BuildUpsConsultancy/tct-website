import React, { useState } from 'react';
import ScrollToTop from '../components/ScrollToTop';
import { Star, ArrowRight, Hotel, Plane, Map, Camera, Shield, Headphones, Users, TrendingUp, Globe, Mail, ChevronDown, ChevronUp } from 'lucide-react';

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<number>(0);

  const destinations = [
    {
      id: 1,
      country: 'Greece',
      name: 'Santorini Nights',
      rating: 4.9,
      price: 2499,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1JHxqXs-d79kxtga3t1mjKv2Fv6v3nR8oqqN8n9bQUThMmqyQDd178P6c1HZXqzCpdAxOi7wEuYXi7Ch_LRDHQui1FmZ3kcGu9epPTDH4de00klkrDK619fM_hgQGMPPu1C75jov3ozg0dSlWQJTAKXQaGCx3RGpahr7IHOuCNN9GwjxjZyv0W1e4BFRjbqbGj-WMtOjB6r7CJ97K7v_vULcn2isWq0JVrJhhGAC7BFtVKv5xjmRASqlrL4UocH3hCNCzwECwfeBJ'
    },
    {
      id: 2,
      country: 'Peru',
      name: 'Machu Picchu Peak',
      rating: 4.8,
      price: 3150,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZl-kjyppu7VJzo2E60r8EHJWbWBwXjBgldbriDiFDry44u0o_P9rXUWApuYT5-q4mhE8qo3LBwYPiT-SdEcvZl3dlCGYle4VvUlH6mkoF8moGf91TF8kV9aSZ1rCFUgNY8nZxWyCO5pkzGxAC6tBYtOE4K3PO7MsMg4SDqxCSfhvE_1g_B0Rn-47sN9-yEdDMrAlTEQNc7k1_vMiFuCwT7KxzXcMqlDeGlYCCAF9lrB48edtn9ixv1XEAN3Mqv6y2fgLf2hZ5DBqd'
    },
    {
      id: 3,
      country: 'Japan',
      name: 'Kyoto Zen Gardens',
      rating: 5.0,
      price: 1890,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeWg8RkNoeCHD4GrxGNc7h3-DoASEWy5tPb-HastEHv6-u91GJX6tY-XLA4P3-XJqwW2jWPV77NTle-e81HHbw_8-CEWnlrdb91YJOCdgpe2ky5KRimKT3whl-85tTkd-UQQHdXynkP9Xn81jgKgr5Y_0_3f3YHKC_GUdcQIB25p9IksHPAQE9Jb62gGXzR9n5mP1xyljsJT2rInpqwcAN9pbbM7nfSENDoPauZiwc1_c8f1P1mSas6Om9m1-gt9tNedQkeB5CZIHH'
    },
    {
      id: 4,
      country: 'United Kingdom',
      name: 'London Midnight',
      rating: 4.7,
      price: 1200,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHdENKle-Wv4v5ia5wA7eHFSY1Ohcw549Owvjct5o2fZixiYZNlKUITAiz6Gol62jyYQZF3YF1LTc2utiHFFfWGNaZQwW4yuwxBNIXaOBV1YLzC_EN2oztHMaa2F9J2pU002B9u6Cp6MVFO6VAHFL8unKQpPxWzqIfHmpqil2hr58smQxYhH4Q2Z0s_19NoZ5pac4A2Aop-pA6riDH7m7nU3MslswARSjDaHbpFAACXYyDxLltB4HTa3WegUhZfpb2Bh4h5QhCQbvH'
    }
  ];

  const services = [
    {
      icon: Plane,
      title: 'Premium Flights',
      description: 'First-class travel arrangements with private jets and priority boarding to over 500 destinations worldwide.'
    },
    {
      icon: Hotel,
      title: 'Luxury Stays',
      description: 'Access to the world\'s most exclusive boutique hotels, private villas, and five-star resorts.'
    },
    {
      icon: Map,
      title: 'Expert Guided Tours',
      description: 'Local specialists reveal hidden gems and insider secrets that transform ordinary trips into unforgettable adventures.'
    },
    {
      icon: Camera,
      title: 'Photography Experiences',
      description: 'Capture cinematic memories with professional guides during golden hour at breathtaking locations.'
    },
    {
      icon: Shield,
      title: 'Complete Travel Insurance',
      description: 'Comprehensive coverage including medical emergencies, trip cancellation, and baggage protection.'
    },
    {
      icon: Headphones,
      title: '24/7 Concierge Support',
      description: 'Dedicated support team available round-the-clock for any assistance or special requests during your journey.'
    }
  ];

  const testimonials = [
    {
      quote: "The attention to detail was beyond my expectations. Every evening felt like a scene from a movie I didn't want to end.",
      author: 'Elena Vance',
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqwWILib3GpQ0KaJL-l8dBN324OE49hbqkddlzONGVf7BzFFOc5k6R5wkZRAr-4RtJtWrm4gBJJFER13u_FSXqr3T-9tDuNZPGpQJLy1fJqHNb_eD3enVCfeGVxWZwLWTFDX47v9fEQp6w7RQC3brfTLqAPyFajF3P8Sc3tNs4nQ2OBSzWt78HChsdjNAOg91RajCH4FOCB6OOBBauyUYOnGYJLJ0gcOQbDEVVxG4Lr2QtZfwVDdsMRdadKu-nVDKvvdDuQ-HpsJvu'
    },
    {
      quote: "Midnight Voyager transformed my perception of travel. It wasn't just a trip; it was a curated adventure of the soul.",
      author: 'Marcus Thorne',
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_xhHDgceKSi4051O2BceM8v8hWdxxL5X3euUCc5CrsZWhUO1fLNV6fumdTefFTdSAkt_ATFVUOhC1cH2L-ISgvU7da_oGjzDz9PJH4LV87wZkyfwGixszMGr_89HXK_NjE-_UljHLIH-QotUhY00BxsM6A0-77qMEvg0DLDgyf74SbuU69ts3Oi15Kh2jIpi14-LLVQA5DvyoOVqX6xdtd2IYkAOeaM5_a2tuaeybg8i_odQzUtZUW5MXdUDf6HN7hWA_Mlj-2fnK'
    },
    {
      quote: "Effortless elegance from booking to return. I've never felt so taken care of in foreign lands. Simply elite service.",
      author: 'Sophia Rossi',
      rating: 5,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBby4ghFF5chaymaaSqdni4PUnBUA8tikKt5k0xCtgsBCJ7VlU9H2WwfseaFVzTlcPC7u1VnS-vr0vZsrODzLHZZjvZ2PNHDcvTe9gnPeSj_VLeT5KIY6FQ-6PaWZv-B8WSnKqZMq6cxNjBejtHMqi6ml8Yyq7rbYwEm4qwxOuXcx3eC91GtRUqoUZP2rbZjguR0HuR7Hk4e41YyNNzSSbkqDlI2hhoqtgRFU7j_FQ1G4id67KTK_6vsMwDUZEDjBnw2BwySpNpOae5'
    }
  ];

  const faqs = [
    {
      question: 'How personalized are the itineraries?',
      answer: 'Every trip is custom-built from the ground up based on your stylistic and destination preferences. No two Voyager trips are ever the same.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation up to 30 days before your trip with full refund. For bookings within 30 days, we work with you to reschedule.'
    },
    {
      question: 'Do you provide solo travel arrangements?',
      answer: 'Absolutely! We specialize in solo traveler experiences with optional group connections if desired.'
    },
    {
      question: 'Can we book commercial flights through you?',
      answer: 'Yes, we arrange both private jets and premium commercial flights depending on your preferences and budget.'
    },
    {
      question: 'Is there emergency on-trip support?',
      answer: 'Our 24/7 concierge team is always available for any emergencies or assistance you need during your journey.'
    }
  ];

  const partners = ['SKYWARD', 'LUXURY VILLA', 'OCEANIC', 'ELITE JET', 'NOMADIC', 'PRIME STAY', 'VANTAGE', 'HORIZON'];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="hero"
            className="w-full h-full object-cover brightness-[0.4] contrast-[1.1]"
            src="/images/image_1.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[0.9]">
              Escape to <br />
              <span className="text-primary">Nature's Paradise</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light">
              Discover tropical wonders hidden within lush coconut palm forests. Experience authentic island adventures, pristine beaches, and cultural immersion in one of Earth's most enchanting destinations.
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <button className="px-8 py-4 rounded-full bg-primary text-on-primary font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2 hover:scale-105">
                Explore Destinations <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-secondary/30 text-secondary font-bold text-lg hover:border-secondary transition-all hover:bg-secondary/5">
                View Packages
              </button>
            </div>

            <div className="flex gap-12 items-center flex-wrap">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">10K+</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Destinations</span>
              </div>
              <div className="h-10 w-px bg-sky-400/20"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">50K+</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Travelers</span>
              </div>
              <div className="h-10 w-px bg-sky-400/20"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">4.9</span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Transition */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[100px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.21,103.53,119.14,103.53,177.27,95.8,241,87.29,286.39,70.52,321.39,56.44Z" fill="#051426"></path>
          </svg>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section id="destinations" className="relative py-24 bg-background px-8">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 120%22><path d=%22M0,50 Q300,0 600,50 T1200,50%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22/></svg>')] bg-repeat"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-2 block">Curation</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Most Loved Places</h2>
            </div>
            <button className="text-secondary font-semibold hover:underline decoration-2 underline-offset-8">
              Explore All
            </button>
          </div>

          {/* Destination Cards - Update styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <div key={destination.id} className="group relative rounded-xl bg-black/70 border border-primary/20 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:bg-black/80 glow-hover">
                <div className="h-64 overflow-hidden relative">
                  <img
                    alt={destination.country}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={destination.image}
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1 bg-black/60 backdrop-blur">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{destination.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{destination.country}</p>
                  <h3 className="text-xl font-bold text-white mb-4">{destination.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">
                      From <span className="text-white text-lg">${destination.price.toLocaleString()}</span>
                    </span>
                    <button className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Background */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/image_2.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-8 border-r border-primary/20 last:border-none">
              <span className="text-5xl font-extrabold text-primary mb-2">1,240</span>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Trips Completed</span>
            </div>
            <div className="flex flex-col items-center text-center p-8 border-r border-primary/20 last:border-none">
              <span className="text-5xl font-extrabold text-primary mb-2">15+</span>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Years Experience</span>
            </div>
            <div className="flex flex-col items-center text-center p-8 border-r border-primary/20 last:border-none">
              <span className="text-5xl font-extrabold text-primary mb-2">98%</span>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Guest Satisfaction</span>
            </div>
            <div className="flex flex-col items-center text-center p-8">
              <span className="text-5xl font-extrabold text-primary mb-2">50K+</span>\n              <span className="text-sm font-bold text-white tracking-widest uppercase">Happy Explorers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative py-32 bg-background px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Exclusive Offers</span>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Curated Packages <br />
              for the Bold
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
              Our signature packages combine luxury transit with off-the-grid experiences. From mountain sanctuaries to bustling neon cityscapes, we tailor every moment.
            </p>
            <button className="px-10 py-4 rounded-full bg-primary text-on-primary font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20">
              Browse All Packages
            </button>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/60 relative group">
              <img
                alt="Adventure"
                className="w-full h-[500px] object-cover brightness-75 contrast-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSCCZeJejn1UI8BV5rBevrl1NvMmqo4QXhEwP4iQgj9PJlQ404eR_IQLZZnGKuTHh5TYz5jgVbSdehQ2u7ODRZ4W49AUbb8Tz1ruBy55nkeq8iYRSx9nfniaCfJ6AofF6pgSL8oL8BvOULhJ2NYWrRuph5hxCTw1B3Qpu9nViBH9VwYzbzHA-KlFFfRsMlVz5-N_oqCtM50sGNhI5lro399qtOrJTpz_YUeIpVJ6kvG1E5K6V9Hi0qU6iupnAPRyDp6t6WwTQrOdN_"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur p-6 rounded-2xl border border-primary/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-bold text-xl">The Aurora Expedition</h4>
                    <p className="text-slate-300 text-sm">Norway & Iceland • 12 Days</p>
                  </div>
                  <span className="bg-primary text-on-primary font-bold px-3 py-1 rounded text-sm">$4,200</span>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-slate-300">
                    <Hotel className="w-4 h-4" /> 5-Star Stay
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-300">
                    <Plane className="w-4 h-4" /> Private Jet
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-300">
                    <Users className="w-4 h-4" /> Guided
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Background */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/image_3.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/45 z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-2 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Full-Service Experiences</h2>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">Everything you need for an unforgettable island adventure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="p-10 rounded-2xl bg-black/70 border border-primary/30 transition-all duration-300 group backdrop-blur-sm hover:border-primary/60 hover:bg-black/80 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center mb-6 group-hover:from-primary/60 group-hover:to-primary/30 transition-all">
                    <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/image_4.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(30%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Guest Adventures</h2>
            <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">Real stories from explorers who discovered paradise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-black/70 backdrop-blur-md border border-primary/20 relative hover:border-primary/40 transition-all hover:bg-black/80">
                <Mail className="text-primary text-6xl opacity-15 absolute -top-6 left-4" />
                <p className="text-slate-200 mb-8 pt-4 italic leading-relaxed font-light">\"{testimonial.quote}\"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40">
                    <img alt="User" className="w-full h-full object-cover" src={testimonial.image} />
                  </div>
                  <div>
                    <p className="text-white font-bold">{testimonial.author}</p>
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Background */}
      <section id="contact" className="relative py-24 px-8 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/image_5.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Common Questions</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Have questions about your next adventure? We have answers. Our team is ready to help you plan the perfect getaway.
            </p>
            <div className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all cursor-pointer">
              Contact our team <ArrowRight className="w-5 h-5 inline" />
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-black/70 border border-primary/20 cursor-pointer transition-all hover:border-primary/40 hover:bg-black/80"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? -1 : index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-white font-bold text-lg">{faq.question}</h4>
                  {expandedFAQ === index ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
                </div>
                {expandedFAQ === index && (
                  <div className="mt-4 text-slate-300 text-sm leading-relaxed border-t border-primary/10 pt-4">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#0a1422] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-20 whitespace-nowrap items-center opacity-40 hover:opacity-80 transition-opacity overflow-x-auto">
            {[...partners, ...partners].map((partner, idx) => (
              <span key={idx} className="text-3xl font-black text-white italic tracking-tighter flex-shrink-0">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </>
  );
}
