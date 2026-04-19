import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://samayinnovation.in';
const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/diojzujpv/image/upload/w_1200,h_630,c_fill,g_auto/samay/arvind-villa-khatraj/nm-08573.jpg';
const SITE_NAME = 'Samay Innovation';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  /** Absolute path, e.g. "/portfolio" — will be prefixed with SITE_URL */
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  structuredData?: object | object[];
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  structuredData,
  noIndex = false,
}: SEOProps) {
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const schemaArray = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schemaArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
