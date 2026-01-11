import { useDesigns } from "@/hooks/use-designs";
import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  const { data: topDesigns, isLoading: isLoadingTop } = useDesigns({ sort: 'popular' });
  const { data: trendingDesigns, isLoading: isLoadingTrending } = useDesigns({ sort: 'rating' });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Premium Design Marketplace</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-foreground mb-6">
              Designs that make you <br />
              <span className="gradient-text">stand out instantly</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
              Access high-quality, conversion-optimized designs from the world's best creators. 
              YouTube thumbnails, social media posts, banners, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300">
                  Explore Designs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/creators">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-2 hover:bg-muted/50">
                  Find Creators
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500 fill-current" />
                Top Rated Designs
              </h2>
              <p className="text-muted-foreground mt-2">Highest quality picks from our community</p>
            </div>
            <Link href="/explore?sort=rating">
              <Button variant="ghost" className="hidden sm:flex group">
                View all <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoadingTop ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[400px] bg-muted/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {topDesigns?.slice(0, 4).map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                Trending Now
              </h2>
              <p className="text-muted-foreground mt-2">Popular designs getting attention this week</p>
            </div>
            <Link href="/explore?sort=popular">
              <Button variant="ghost" className="hidden sm:flex group">
                View all <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {isLoadingTrending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[400px] bg-muted/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingDesigns?.slice(0, 8).map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-24 bg-card border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {['YouTube Thumbnail', 'Social Media', 'Banner'].map((cat) => (
              <Link key={cat} href={`/explore?category=${cat}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] cursor-pointer">
                  {/* Abstract colorful backgrounds */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    cat === 'YouTube Thumbnail' ? 'from-red-500 to-orange-500' :
                    cat === 'Social Media' ? 'from-blue-500 to-purple-500' :
                    'from-emerald-500 to-teal-500'
                  } opacity-90 transition-opacity group-hover:opacity-100`} />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
                      {cat}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
