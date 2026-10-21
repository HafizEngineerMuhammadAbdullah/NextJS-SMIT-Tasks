import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

function hasAsset(source) {
  return Boolean(source && (source.asset || source._ref));
}

/**
 * Build a transformed Sanity image URL.
 * Crop and hotspot data on the source are respected when fit is crop.
 * Returns null when the image or project is missing.
 */
function urlForImage(source, options = {}) {
  if (!projectId || !hasAsset(source)) {
    return null;
  }

  const width = options.width || 1600;
  const height = options.height;
  const quality = options.quality || 75;

  let image = builder.image(source).width(width).quality(quality).auto("format").fit("crop");

  if (height) {
    image = image.height(height);
  }

  return image.url();
}

export { urlForImage };
