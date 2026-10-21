function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function plainTextFromBlocks(blocks) {
  if (!Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .map((block) => {
      if (block._type === "codeBlock") {
        return block.code || "";
      }

      if (!Array.isArray(block.children)) {
        return "";
      }

      return block.children.map((child) => child.text || "").join("");
    })
    .join(" ");
}

function readingMinutes(blocks) {
  const words = plainTextFromBlocks(blocks).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function getHeadings(blocks) {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks
    .filter((block) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
    .map((block) => {
      const text = (block.children || []).map((child) => child.text || "").join("").trim();
      return {
        id: slugify(text),
        text,
        level: block.style,
      };
    })
    .filter((heading) => heading.text);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function primaryCategory(post) {
  return post?.categories?.[0] || null;
}

export { formatDate, getHeadings, plainTextFromBlocks, primaryCategory, readingMinutes, slugify };
