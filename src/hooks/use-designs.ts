import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useDesigns(filters?: {
  category?: string;
  sort?: 'popular' | 'newest' | 'rating' | 'price_asc' | 'price_desc';
  creatorId?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [api.designs.list.path, filters],
    queryFn: async () => {
      // Build query string manually since filters might be undefined
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.sort) params.append('sort', filters.sort);
      if (filters?.creatorId) params.append('creatorId', String(filters.creatorId));
      if (filters?.search) params.append('search', filters.search);
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const url = `${api.designs.list.path}${queryString}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch designs");
      return api.designs.list.responses[200].parse(await res.json());
    },
  });
}

export function useDesign(id: number) {
  return useQuery({
    queryKey: [api.designs.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.designs.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch design");
      return api.designs.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useDesignReviews(id: number) {
  return useQuery({
    queryKey: [api.designs.getReviews.path, id],
    queryFn: async () => {
      const url = buildUrl(api.designs.getReviews.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return api.designs.getReviews.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
