import { getPostBySlug } from "../../lib/strapi";

export default async function handler(req, res) {
  if (req.query.secret !== (process.env.PREVIEW_SECRET || "secret-token")) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const pageData = await getPostBySlug(req.query.slug, true);
  if (!pageData) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});

  res.writeHead(307, {
    Location: `/${req.query.slug}`,
  });
  res.end();
}
