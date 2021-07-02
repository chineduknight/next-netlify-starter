import PropTypes from "prop-types";
import Head from 'next/head'
import { baseURL } from 'services/httpService';


const hostname = `${baseURL}/scripts/files/`
const MetaDecorator = ({ title, description, imageUrl, imageAlt }) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={hostname + imageUrl} />
    {/* <meta
      property="og:url"
      content={hostname + window.location.pathname + window.location.search}
    /> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta name="twitter:site" content="alexcajetan" />
    <meta name='keywords' content="SATB,choir,script,solfa,solfego" />
  </Head>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;