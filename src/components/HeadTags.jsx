import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

export default function HeadTags({title, description, image, url}) {
  if (!title) {
    title = "Patchwork Archive";
  }
  if (!description) {
    description = "Preserving rhythm, one video at a time";
  }
  if (!url) {
    url = "";
  }
  if(!image){
    image = import.meta.env.VITE_DEFAULT_OG_IMAGE;
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={`${title}`} />
      <meta name="description" content={`${description}`}  />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${window.location.origin}/${url}`} />
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={`${title}`} />
      <meta
        property="og:image"
        content={`${image}`}/>
      <meta
        property="og:description"
        content="Preserving rhythm, one video at a time"/>

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={`${window.location.origin}/${url}`} />
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
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};