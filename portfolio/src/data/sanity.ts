import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: 'ubpspdu3',
  dataset: 'production', 
  useCdn: true,
  apiVersion: '2023-01-01',
});

const builder = createImageUrlBuilder(client);

/**
 * Returns a Sanity image URL builder with CDN-level optimizations pre-applied:
 * Callers can still chain additional transforms (e.g., `.width(800)`) on the returned builder.
 */
export function urlFor(source: SanityImageSource) {
  return builder
    .image(source)
    .auto('format')
    .quality(80)
    .fit('max');
}