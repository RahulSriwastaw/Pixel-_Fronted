import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useCreators() {
  return useQuery({
    queryKey: [api.creators.list.path],
    queryFn: async () => {
      const res = await fetch(api.creators.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch creators");
      return api.creators.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreator(id: number) {
  return useQuery({
    queryKey: [api.creators.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.creators.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch creator");
      return api.creators.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
