import SPostContent from "./styled";
import markdownToHtml from "../../lib/markdownToHtml";
import {useEffect, useState} from "react";

export default function PostContent({content, ...rest}) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    async function getMarkdown() {
      const html = await markdownToHtml(content || "");
      setHtml(html);
    }
    getMarkdown();
  }, [content]);
  return <SPostContent {...rest} dangerouslySetInnerHTML={{__html: html}}/>
}
