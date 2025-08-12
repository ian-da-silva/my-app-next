// lib/fetchers.ts
import "server-only";
import { Listing } from "@/components/listings/listing-card";
import { Auction } from "@/components/listings/auction-card";

const API = process.env.API_URL ?? "http://192.168.65.128:3000/api";

export async function fetchFeatured(): Promise<Listing[]> {
  const r = await fetch(`${API}/listings?featured=1`, { next: { revalidate: 60 } });
  if (!r.ok) return [];
  return r.json();
}

export async function fetchAuctionsEnding(limit = 9): Promise<Auction[]> {
  const r = await fetch(`${API}/auctions?endingSoon=1&limit=${limit}`, { next: { revalidate: 30 } });
  if (!r.ok) return [];
  return r.json();
}

export async function fetchMostWanted(limit = 9): Promise<any[]> {
  const r = await fetch(`${API}/games/most-wanted?limit=${limit}`, { next: { revalidate: 120 } });
  if (!r.ok) return [];
  return r.json();
}

export async function fetchNewest(pageSize = 24): Promise<Listing[]> {
  const r = await fetch(`${API}/listings?sort=newest&limit=${pageSize}`, { cache: "no-store" });
  if (!r.ok) return [];
  return r.json();
}

export async function fetchPriceDrops(limit = 9): Promise<Listing[]> {
  const r = await fetch(`${API}/listings?priceDrop=1&limit=${limit}`, { next: { revalidate: 60 } });
  if (!r.ok) return [];
  return r.json();
}
