export function structure(S) {
  return S.list()
    .title("Blog")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Posts").defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
    ]);
}
