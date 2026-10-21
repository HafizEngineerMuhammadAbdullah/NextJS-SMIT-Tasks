# The post schema

## What a schema is

A schema is the form Studio shows. This blog has one schema, in `src/sanity/schemas/post.js`. It is registered in `src/sanity/schemas/index.js`. `src/sanity/structure.js` puts **Posts** on the Studio desk.

Older versions of this project also had author and category schemas. Those were removed so the class could start with one document type.

## The fields

| Field | What the student types |
| --- | --- |
| title | The headline. Required. |
| slug | The URL piece, generated from the title. Required. |
| excerpt | A short summary for the list. |
| mainImage | The cover picture, plus alternative text. |
| publishedAt | The date. |
| body | The article. Normal text, a heading, bold, italic, links, and images. |

A slug like `my-new-post` makes the page `/blog/my-new-post`.

## A small piece of the schema

```js
defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (rule) => rule.required(),
})
```

`validation` stops Publish when the title or slug is empty. The slug field uses `options: { source: "title" }`, so Studio can generate it from the title.

The body is Portable Text. It is stored as JSON blocks, not as an HTML string. Lesson 6 shows how those blocks become a page.

## What happens when you change the schema

Refresh Studio after you edit `post.js`. Old posts do not rewrite themselves. If you add a new required field, old posts need that field before they can be published again.

The website does not read the schema file. It reads the query. A new field appears on the site only after the query asks for it and a component prints it.

## Mistakes

- Forgetting to generate the slug. The query hides posts with no slug.
- Changing a published slug. The old URL stops working.
- Expecting an author dropdown. This schema does not have an author field.

## Try this

Add an optional string field named `kicker` with a max length of 40. Reload Studio and confirm the field is there. You do not have to show it on the website yet. The answer is in lesson 10.

## Questions

- What is the difference between the title and the slug?
- Why does the query require `defined(slug.current)`?
- What would you edit to add a new field: the schema, the query, or both?

## You can say you learned it when

You can read `post.js` and say what each field is for, and you know a schema change is not automatic on the website.
