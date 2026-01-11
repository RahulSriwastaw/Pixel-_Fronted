import { useCreators } from "@/hooks/use-creators";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, LayoutGrid } from "lucide-react";
import { Link } from "wouter";

export default function Creators() {
  const { data: creators, isLoading } = useCreators();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 border-b border-border mb-12">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Top Creators</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Work with talented designers from around the globe.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />
            ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators?.map((creator) => (
              <Card key={creator.id} className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-lg">
                  <AvatarImage src={creator.profileImage} />
                  <AvatarFallback>{creator.user.name[0]}</AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold font-display mb-1">{creator.user.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 mb-4 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{Number(creator.rating).toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({creator.totalOrders} orders)</span>
                </div>
                
                <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">{creator.bio}</p>
                
                <div className="mt-auto flex gap-3 w-full">
                  <Button variant="outline" className="flex-1">Contact</Button>
                  <Link href={`/creator/${creator.id}`} className="flex-1">
                    <Button className="w-full gap-2">
                      <LayoutGrid className="w-4 h-4" /> Portfolio
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
