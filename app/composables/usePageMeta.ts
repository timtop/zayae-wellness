// ~/composables/usePageMeta.ts
export function usePageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "open-graph.jpg" },
      { property: "og:url", content: `https://zayaewellness.com${path}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "open-graph.jpg" },
    ],
  });
}
