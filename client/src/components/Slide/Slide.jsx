import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StoryViewer from "../../components/StoryViewer/StoryViewer";

const Slide = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [slideData, setSlideData] = useState(null);
  console.log(id, 'id')
  useEffect(() => {
    async function fetchSlide() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/slide/posts/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.slides)
          setSlideData(data.slides);
        } else {
          console.error("Failed to fetch slide data");
        }
      } catch (error) {
        console.error("Error while fetching slide:", error);
      }
    }

    fetchSlide();
  }, [id]);

  if (!slideData) {
    return <> </>;
  }

  return (
    <>
      <StoryViewer slides={slideData} />
    </>
  );
};

export default Slide;
