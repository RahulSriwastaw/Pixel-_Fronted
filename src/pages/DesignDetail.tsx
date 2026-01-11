import { useRoute, useLocation, Link } from "wouter";
import { useDesign, useDesignReviews } from "@/hooks/use-designs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Heart, Share2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function DesignDetail() {
  const [, params] = useRoute("/design/:id");
  const [, setLocation] = useLocation();
  const id = Number(params?.id);
  const { data: design, isLoading } = useDesign(id);
  const { data: reviews } = useDesignReviews(id);

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!design) return <div className="min-h-screen flex items-center justify-center">Design not found</div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Image */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted aspect-[16/9] relative group"
            >
              <img 
                src={design.image} 
                alt={design.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                 {design.badge && (
                  <Badge className="bg-gradient-to-r from-accent to-pink-500 border-none shadow-lg text-white font-semibold text-lg px-4 py-1">
                    {design.badge}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display">About this design</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>{design.description}</p>
                <p>Perfect for content creators looking to increase their CTR. High resolution source files included.</p>
              </div>

              {/* Reviews Section */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold font-display mb-6">Reviews</h3>
                <div className="space-y-6">
                  {reviews?.map((review) => (
                    <div key={review.id} className="bg-card p-6 rounded-xl border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{review.userName}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                  {(!reviews || reviews.length === 0) && (
                    <p className="text-muted-foreground italic">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Main Action Card */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-xl shadow-black/5">
                <h1 className="text-2xl font-display font-bold mb-2">{design.title}</h1>
                <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                   <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-medium text-foreground">{Number(design.rating).toFixed(1)}</span>
                  <span>({design.ordersCount} orders)</span>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary">${Number(design.price).toFixed(2)}</span>
                  <span className="text-muted-foreground text-sm">USD</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span><span className="font-bold text-foreground">{design.deliveryTimeHours} Hours</span> Delivery</span>
                  </div>
                   <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Unlimited Revisions</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    onClick={() => setLocation(`/order/${id}`)}
                  >
                    Order Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Heart className="w-4 h-4" /> Save to Wishlist
                  </Button>
                </div>
              </div>

              {/* Creator Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">Creator</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                    <AvatarImage src={design.creator.profileImage} />
                    <AvatarFallback>{design.creator.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/creator/${design.creator.id}`} className="font-bold text-lg hover:text-primary transition-colors block">
                      {design.creator.user.name}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">{design.creator.bio}</p>
                  </div>
                </div>
                <Link href={`/creator/${design.creator.id}`}>
                  <Button variant="secondary" className="w-full">View Profile</Button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
