import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

export default function HeadTags({title="Patchwork Archive", description="Preserving rhythm, one video at a time", image="", url=""}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={`${title}`} />
      <meta name="description" content={`${description}`}  />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={`${window.location.origin}/${url}`} /> }
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={`${title}`} />
      {image && <meta property="og:image" content={`${image}`}/> }
      <meta
        property="og:description"
        content="Preserving rhythm, one video at a time"/>

      <meta property="twitter:card" content="summary" />
      {url && <meta property="twitter:url" content={`${window.location.origin}/${url}`} /> }
      <meta
        property="twitter:title"
        content="Patchwork Archive - The VTuber Music Archives"/>
      <meta property="twitter:domain" content={`${window.location.origin}`} />
      <meta
        property="twitter:description"
        content="Preserving rhythm, one video at a time"/>
      <meta property="twitter:creator" content="@pinapelz" />
      <meta name="twitter:image" content=""/>
    </Helmet>
  );
}

HeadTags.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  image: PropTypes.any,
  url: PropTypes.any,
};