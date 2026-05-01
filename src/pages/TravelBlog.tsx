import { useState } from 'react';

const featuredPost = {
  title: 'The Neon Whispers of Tokyo',
  subtitle: 'Feature Story',
  date: 'May 24, 2024',
  excerpt: 'Navigating the bioluminescent canopulua of Shinjuku through the labyrinth of midnight wanderer.',
  author: { name: 'Elena Vance', role: 'Chief Voyager', img: 'https://images.unsplash.com/photo-1494790108755-2616b2ce5d2e?w=80&q=80' },
  img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
};

const latestPosts = [
  {
    id: 1,
    title: 'The Cobalt Hour in Paris',
    excerpt: 'When the iron giant wakes, the city holds its breath in shades of indigo and gold.',
    img: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=500&q=80',
  },
  {
    id: 2,
    title: 'Moonlight on the Caldera',
    excerpt: 'Silent streets, white walls, and the endless rhythmic sigh of the Aegean sea.',
    img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&q=80',
  },
  {
    id: 3,
    title: 'Auroras Over Abisko',
    excerpt: 'Chasing the green ghosts of the north across a frozen celestial playground.',
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=500&q=80',
  },
];

const trending = [
  { id: 1, title: 'Finding Solitude in the Scottish Highlands', read: '4.6 in reads', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=80' },
  { id: 2, title: 'The Marble Heart of Agra', read: '7.6 in reads', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=80&q=80' },
  { id: 3, title: 'Lake Brienz: A Turquoise Dream', read: '5.6 in reads', img: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?w=80&q=80' },
];

const TravelBlog = () => {
  const [subEmail, setSubEmail] = useState('');

  return (
    <div className="min-h-screen bg-tct-dark">
      {/* Featured Hero Post */}
      <section className="relative h-[65vh] overflow-hidden">
        <img src={featuredPost.img} alt={featuredPost.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-tct-darker/30 via-tct-dark/40 to-tct-dark" />
        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="tct-badge">{featuredPost.subtitle}</span>
              <span className="text-tct-muted text-xs">{featuredPost.date}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black text-tct-white leading-tight mb-4">
              {featuredPost.title}
            </h1>
            <p className="text-tct-muted leading-relaxed mb-6 max-w-lg">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-3">
              <img src={featuredPost.author.img} alt={featuredPost.author.name} className="w-10 h-10 rounded-full object-cover border-2 border-tct-accent2" />
              <div>
                <p className="text-tct-white text-sm font-medium">{featuredPost.author.name}</p>
                <p className="text-tct-muted text-xs">{featuredPost.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Latest Posts */}
          <div className="lg:col-span-2">
            <h2 className="section-label mb-8">Latest Reflections</h2>
            <div className="space-y-6">
              {latestPosts.map(post => (
                <div key={post.id} className="tct-card rounded-2xl overflow-hidden group cursor-pointer" onClick={() => {}}>
                  <div className="grid md:grid-cols-2">
                    <div className="img-overlay h-52 md:h-auto">
                      <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-2xl text-tct-white mb-3 leading-tight">{post.title}</h3>
                        <p className="text-tct-muted text-sm leading-relaxed">{post.excerpt}</p>
                      </div>
                      <button className="text-tct-accent2 text-sm flex items-center gap-2 mt-4 hover:gap-3 transition-all">
                        READ STORY <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending */}
            <div>
              <h3 className="section-label mb-5">Trending Tales</h3>
              <div className="space-y-4">
                {trending.map(item => (
                  <div key={item.id} className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-tct-text text-sm font-medium leading-tight group-hover:text-tct-white transition-colors">{item.title}</p>
                      <p className="text-tct-muted text-xs mt-1">{item.read}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe */}
            <div className="tct-card rounded-2xl p-6">
              <h3 className="font-display text-xl text-tct-white mb-2">Join the Expedition</h3>
              <p className="text-tct-muted text-sm mb-5">Get curated midnight dispatches and exclusive stories delivered to your inbox.</p>
              <input
                type="email"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                placeholder="Email Address"
                className="tct-input text-sm mb-3"
              />
              <button className="btn-primary w-full text-sm py-3">Subscribe to Journal</button>
            </div>

            {/* Archive */}
            <div>
              <h3 className="section-label mb-5">Archive</h3>
              <div className="space-y-3">
                {['Winter 2023 Dispatches', 'The Mediterranean Series', 'Solo Wanderlust Collection'].map(item => (
                  <button key={item} className="w-full flex justify-between items-center text-tct-muted text-sm hover:text-tct-text transition-colors py-2 border-b border-tct-mid/50">
                    <span>{item}</span>
                    <span className="text-tct-accent2">›</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TravelBlog;
