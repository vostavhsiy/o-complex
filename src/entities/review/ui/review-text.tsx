import React from "react";

import sanitizeHtml from "sanitize-html";

const ReviewText = ({ text }: { text: string }) => {
  return (
    <p
      className="text-lg line-clamp-10"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
    ></p>
  );
};

export default ReviewText;
