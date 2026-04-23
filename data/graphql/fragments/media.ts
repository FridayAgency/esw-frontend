export const ACF_MEDIAITEM_FRAGMENT = `
fragment AcfMediaItem on AcfMediaItemConnectionEdge {
  node {
    altText
    sourceUrl
    srcSet
    databaseId
    caption
    mediaDetails {
      height
      width
    }
  }
}
`;
