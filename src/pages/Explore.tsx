import { useDesigns } from "@/hooks/use-designs";
import { DesignCard } from "@/components/DesignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<'popular' | 'newest' | 'rating' | 'price_asc' | 'price_desc'>("popular");

  // Only pass category if it's not "all"
  const filters = {
    search: search || undefined,
    category: category === "all" ? undefined : category,
    sort
  };

  const { data: designs, isLoading } = useDesigns(filters);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-display font-bold mb-6">Explore Designs</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search designs..." 
                className="pl-10 h-12 text-lg bg-background border-border/60 focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] h-12 bg-background">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="YouTube Thumbnail">YouTube Thumbnail</SelectItem>
                  <SelectItem value="Poster">Poster</SelectItem>
                  <SelectItem value="Banner">Banner</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={(v: any) => setSort(v)}>
                <SelectTrigger className="w-[180px] h-12 bg-background">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[400px] bg-muted/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : designs?.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No designs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
            <Button 
              variant="link" 
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="mt-4 text-primary"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {designs?.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
