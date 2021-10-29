import markdownStyles from "../styles/markdown-styles.module.css";

export default function PostBody({ content }) {
  return (
    <div>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
