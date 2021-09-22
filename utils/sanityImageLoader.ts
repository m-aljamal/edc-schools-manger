export const santyImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/images/${src}?w=${width}&q=${quality || 75}`;
  };