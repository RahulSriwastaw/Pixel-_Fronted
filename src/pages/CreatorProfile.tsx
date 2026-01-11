import { useRoute } from "wouter";
import { useCreator } from "@/hooks/use-creators";
import { useDesigns } from "@/hooks/use-designs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MessageSquare, ShieldCheck, Mail, Globe, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function CreatorProfile() {
  const [, params] = useRoute("/creator/:id");
  const id = Number(params?.id);
  
  const { data: creator, isLoading: isCreatorLoading } = useCreator(id);
  const { data: designs, isLoading: isDesignsLoading } = useDesigns({ creatorId: id });

  if (isCreatorLoading) return <div className="min-h-screen bg-background flex items-center justify-center font-display text-xl animate-pulse">Loading profile...</div>;
  if (!creator) return <div className="min-h-screen flex flex-col items-center justify-center font-display">
    <h2 className="text-2xl font-bold mb-4">Creator not found</h2>
    <Link href="/creators">
      <Button variant="outline">Back to Creators</Button>
    </Link>
  </div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Creator Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border shadow-xl overflow-visible">
              <CardContent className="pt-0 p-6 flex flex-col items-center text-center">
                <div className="relative -mt-16 mb-4">
                  <Avatar className="w-32 h-32 border-8 border-background shadow-2xl">
                    <AvatarImage src={creator.profileImage} />
                    <AvatarFallback className="text-2xl">{creator.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-background" />
                </div>

                <h1 className="text-2xl font-bold font-display mb-1">{creator.user.name}</h1>
                <p className="text-sm text-muted-foreground mb-4">@{creator.user.username}</p>

                <div className="flex items-center gap-1 text-amber-500 mb-6 font-semibold">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{Number(creator.rating).toFixed(1)}</span>
                  <span className="text-muted-foreground font-normal ml-1">Rating</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Orders</p>
                    <p className="font-bold text-lg">{creator.totalOrders}</p>
                  </div>
                   <div className="p-3 bg-muted/50 rounded-xl">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Response</p>
                    <p className="font-bold text-lg">~2h</p>
                  </div>
                </div>

                <div className="space-y-3 w-full">
                  <Button className="w-full gap-2">
                    <Mail className="w-4 h-4" /> Message
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Globe className="w-4 h-4" /> Website
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="w-full text-left space-y-4">
                  <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {creator.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="secondary">Photoshop</Badge>
                    <Badge variant="secondary">Illustrator</Badge>
                    <Badge variant="secondary">Figma</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-4">
               <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold">Verified Designer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This creator has been manually verified by our design review team.
              </p>
            </div>
          </div>

          {/* Main Content - Portfolio */}
          <div className="lg:col-span-3 space-y-8 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-display">Portfolio</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{designs?.length || 0}</span> designs
              </div>
            </div>

            {isDesignsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[1, 2, 4].map(i => (
                  <div key={i} className="aspect-[4/3] bg-muted rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {designs?.map((design) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden border-border/50 shadow-lg hover:shadow-2xl transition-all group">
                      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                        <img 
                          src={design.image} 
                          alt={design.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <Link href={`/design/${design.id}`}>
                            <Button variant="secondary" size="sm">View Details</Button>
                          </Link>
                          <Button size="sm">Order Now</Button>
                        </div>
                        {design.badge && (
                          <Badge className="absolute top-4 left-4 shadow-lg">{design.badge}</Badge>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg font-display line-clamp-1 group-hover:text-primary transition-colors">
                            {design.title}
                          </h3>
                          <span className="font-bold text-primary">${Number(design.price).toFixed(0)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="font-medium text-foreground">{Number(design.rating).toFixed(1)}</span>
                          </div>
                          <span>{design.ordersCount} orders</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
            
            {(!designs || designs.length === 0) && !isDesignsLoading && (
              <div className="bg-muted/30 border border-dashed border-border rounded-3xl p-20 text-center">
                <LayoutGrid className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold font-display mb-2">No designs yet</h3>
                <p className="text-muted-foreground">This creator hasn't uploaded any designs to their portfolio yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
