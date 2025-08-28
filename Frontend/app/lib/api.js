import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "j0vi15ks", 
  dataset: "production",
  apiVersion: "2023-10-01",
  useCdn: false, 
});


const builder = imageUrlBuilder(client);
export function urlFor(source) {
  return builder.image(source);
}

export async function getHomepage() {
  const query = `*[_type == "homepage"][0]{
    title,
    subtitle,
    "heroImage": heroImage.asset->url
  }`;
  return await client.fetch(query);
}

// Fetch all events
export async function getAllEvents() {
  const query = `*[_type == "event"] | order(date asc){
    slug,
    title,
    description,
    date,
    location,
    "image": image.asset->url
  }`;
  return await client.fetch(query);
}

// Fetch single event by slug
export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    slug,
    title,
    description,
    date,
    location,
    "image": image.asset->url
  }`;
  return await client.fetch(query, { slug });
}

// Fetch upcoming events
export async function getUpcomingEvents() {
  const now = new Date().toISOString();
  const query = `*[_type == "event" && date > $now] | order(date asc){
    slug,
    title,
    description,
    date,
    location,
    "image": image.asset->url
  }`;
  return await client.fetch(query, { now });
}

// Fetch past events
export async function getPastEvents() {
  const now = new Date().toISOString();
  const query = `*[_type == "event" && date <= $now] | order(date desc){
    slug,
    title,
    description,
    date,
    location,
    "image": image.asset->url
  }`;
  return await client.fetch(query, { now });
}