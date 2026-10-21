const published = `_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))`;

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage { asset, hotspot, crop, alt }
`;

export const postsQuery = `
  *[${published}] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const postBySlugQuery = `
  *[${published} && slug.current == $slug][0] {
    ${postFields},
    body[] {
      ...,
      _type == "image" => { asset, hotspot, crop, alt }
    }
  }
`;

export const postSlugsQuery = `
  *[${published}].slug.current
`;
