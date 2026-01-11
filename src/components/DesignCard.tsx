import { Link } from "wouter";
import { Star, Heart, Clock, ShoppingCart } from "lucide-react";
import { type DesignWithCreator } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface DesignCardProps {
  design: DesignWithCreator;
}

export function DesignCard({ design }: DesignCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/design/${design.id}`} className="group block h-full">
        <div className="h-full flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img 
              src={design.image} 
              alt={design.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {design.badge && (
                <Badge className="bg-gradient-to-r from-accent to-pink-500 border-none shadow-lg text-white font-semibold">
                  {design.badge}
                </Badge>
              )}
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
                {design.category}
              </Badge>
            </div>

            {/* Hover Actions */}
            <div className="absolute bottom-3 right-3 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
              <div className="bg-white/90 dark:bg-black/90 p-2 rounded-full shadow-lg hover:text-red-500 cursor-pointer transition-colors">
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {design.title}
              </h3>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-2 mt-auto pt-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-muted shrink-0">
                <img src={design.creator.profileImage} alt={design.creator.user.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm text-muted-foreground truncate">
                by <span className="text-foreground font-medium">{design.creator.user.name}</span>
              </span>
            </div>
            
            <div className="h-px bg-border/50 my-1" />

            {/* Stats Footer */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-foreground">{Number(design.rating).toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{design.deliveryTimeHours}h</span>
                </div>
              </div>
              <div className="font-display font-bold text-lg text-primary">
                ${Number(design.price).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
