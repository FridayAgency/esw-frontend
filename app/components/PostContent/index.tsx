import {
  PostfieldsOpenContent_Layout,
  PostfieldsOpenContentTextPanelLayout,
  PostfieldsOpenContentFullWidthImageLayout,
  PostfieldsOpenContentImage50Text50Layout,
  PostfieldsOpenContentQuoteLayout,
} from "@/types/graphql";
import React from "react";
import TextPanel from "../Panels/OpenContent/TextPanel";
import FullWidthImage from "../Panels/OpenContent/FullwidthImage";
import Image50Text50 from "../Panels/OpenContent/Image50Text50";
import Quote from "../Panels/OpenContent/Quote";

type OpenContentBlock =
  | PostfieldsOpenContentTextPanelLayout
  | PostfieldsOpenContentFullWidthImageLayout
  | PostfieldsOpenContentImage50Text50Layout
  | PostfieldsOpenContentQuoteLayout;

interface PostContentProps {
  content: PostfieldsOpenContent_Layout[];
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div>
      {(content.filter(Boolean) as OpenContentBlock[]).map((block, index) => {
        switch (block.__typename) {
          case "PostfieldsOpenContentTextPanelLayout":
            return <TextPanel key={index} panel={block} />;

          case "PostfieldsOpenContentFullWidthImageLayout":
            return <FullWidthImage key={index} panel={block} />;

          case "PostfieldsOpenContentImage50Text50Layout":
            return <Image50Text50 key={index} panel={block} />;
          case "PostfieldsOpenContentQuoteLayout":
            return <Quote key={index} panel={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PostContent;
