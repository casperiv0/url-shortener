import React, { useState, useEffect, useCallback } from "react";
import { handleRequest } from "./Index";

export default function Slug(props) {
  const [error, setError] = useState("");

  const checkSlug = useCallback(() => {
    const slug = props.match.params.slug;
    handleRequest(`/api/slug/${slug}`).then((res) => {
      if (res.data.status === "error" && res.data.msg === "Not Found") {
        setError(404);
      }

      if (res.data.status === "success") {
        return (window.location = res.data.url.full);
      }

      setError(404);
    });
  }, [props.match.params]);

  useEffect(() => {
    checkSlug();
  }, [checkSlug]);

  if (Number(error) === 404) {
    return <Render404 />;
  } else {
    return <div></div>;
  }
}

const Render404 = () => {
  return (
    <div className="container">
      <div className="_404-container">
        <h1>404</h1>
        <p>URL wasn't found!</p>
        <a href="/">Return home</a>
      </div>
    </div>
  );
};
