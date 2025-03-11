import React from 'react';
import {
  type ComponentParams,
  type ComponentRendering,
  type Field,
  type ImageField,
  Text,
  type RichTextField,
  withDatasourceCheck,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { useI18n } from 'next-localization';

interface Fields {
  Title: Field<string>;
  Excerpt: Field<string>;
  Content: RichTextField;
  Thumbnail: ImageField;
  BackgroundImage: ImageField;
  Name: Field<string>;
  Photo: ImageField;
  Position: Field<string>;
}

export type ArticleListItemProps = {
  fields: Fields;
  name: string;
  url: string;
};

interface ArticleListComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: {
    items: ArticleListItemProps[];
  };
}

const getNewsItems = (items: ArticleListItemProps[], numOfItems: number) => {
  return items
    ?.filter((item) => item.name !== 'Data' && item.name !== 'Authors')
    .slice(0, numOfItems || undefined);
};

const getAllArticlesPageHref = (items: ArticleListItemProps[]) => {
  return items?.find((item) => item.name === 'Data')?.url.replace(/\/Data$/, '') || '#';
};

const ArticleListDefault = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, Number.parseInt(props.params?.NumberOfItems));
  const { t } = useI18n();

  return (
    <div
      className={`component article-list ${props.params?.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="background p-3 p-sm-5">
          {newsItems?.map((item, i) => (
            <React.Fragment key={item.url}>
              <div
                className={`row gx-5 row-gap-3 align-items-center ${
                  i % 2 !== 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="col-lg-4">
                  <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                </div>

                <div className="col-lg-8">
                  <h3 className="fs-4">
                    <Text field={item.fields.Title}></Text>
                  </h3>
                  <p className="article-excerpt fs-5">
                    <Text field={item.fields.Excerpt}></Text>
                  </p>
                  <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                    <Link href={item.url} className="button button-secondary">
                      {t('Read more') || 'Read more'}
                    </Link>
                  </div>
                </div>
              </div>
              {i === newsItems.length - 1 ? <></> : <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListThreeColumn = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, Number.parseInt(props.params?.NumberOfItems));

  return (
    <div
      className={`component component-spaced article-list ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row row-gap-3">
          {newsItems?.map((item) => (
            <div className="col-lg-4" key={item.url}>
              <Link href={item.url} className="wrapper-link">
                <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                <h3 className="fs-4 mt-3">
                  <Text field={item.fields.Title}></Text>
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListSimplified = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, Number.parseInt(props.params?.NumberOfItems));
  const allArticlesPageHref = getAllArticlesPageHref(props.fields?.items);
  const { t } = useI18n();

  return (
    <div
      className={`component component-spaced article-list ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <div className="title display-6">{t('News') || 'News'}</div>
          </div>
          <div className="col-auto learn-more">
            <Link href={allArticlesPageHref} className="button button-simple">
              {t('See all') || 'See all'} <i className="fa fa-angle-right fs-4" />
            </Link>
          </div>
        </div>

        <div className="background p-3 p-sm-5">
          {newsItems?.map((item, i) => (
            <React.Fragment key={item.url}>
              <div className="row gx-5 row-gap-3 align-items-center">
                <div className="col-lg-4">
                  <NextImage field={item.fields.Thumbnail} width={400} height={300} />
                </div>

                <div className="col-lg-6">
                  <h3 className="fs-4">
                    <Text field={item.fields.Title}></Text>
                  </h3>
                  <p>
                    <Text field={item.fields.Excerpt}></Text>
                  </p>
                  <Link href={item.url} className="button button-simple">
                    {t('Read more') || 'Read more'}
                  </Link>
                </div>
              </div>
              {i === newsItems.length - 1 ? <></> : <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListGrid = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, Number.parseInt(props.params?.NumberOfItems));

  return (
    <div
      className={`component component-spaced article-list ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="container container-wide">
        <div className="article-list-grid">
          {newsItems?.map((item) => (
            <div className="article-grid-item" key={item.url}>
              <Link href={item.url} className="wrapper-link">
                <NextImage field={item.fields.Thumbnail} width={800} height={400} />
                <h3 className="fs-4 mt-3">
                  <Text field={item.fields.Title}></Text>
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArticleListManUn = (props: ArticleListComponentProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const newsItems = getNewsItems(props.fields?.items, Number.parseInt(props.params?.NumberOfItems));
  const { t } = useI18n();

  // Function to determine time display (1d, 3h, etc.)
  const getTimeDisplay = (index: number) => {
    switch (index % 4) {
      case 0:
        return '1d';
      case 1:
        return '3h';
      case 2:
        return '22h';
      case 3:
        return '2d';
      default:
        return '1d';
    }
  };

  // Function to determine content type
  const getContentType = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'match coverage';
      case 1:
        return 'interviews';
      case 2:
        return 'news';
      case 3:
        return 'video';
      default:
        return 'news';
    }
  };

  return (
    <div
      className={`component article-list ${props.params?.styles?.trimEnd() || ''}`}
      id={id ? id : undefined}
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newsItems?.map((item, i) => (
            <div key={item.url} className="bg-white rounded-none overflow-hidden shadow-sm">
              {/* Article image with red accent line */}
              <div className="relative">
                <NextImage
                  field={item.fields.Thumbnail}
                  width={320}
                  height={180}
                  className="w-full h-[150px] object-cover"
                />
                {/* Red accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600"></div>
              </div>

              {/* Article content */}
              <div className="p-3">
                {/* Title */}
                <h3 className="text-base font-bold mb-2 line-clamp-2">
                  <Text field={item.fields.Title}></Text>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-700 mb-3 text-sm line-clamp-2">
                  <Text field={item.fields.Excerpt}></Text>
                </p>

                {/* Footer with time and content type */}
                <div className="flex items-center text-gray-500 text-xs border-t pt-2">
                  <span>{getTimeDisplay(i)}</span>
                  <span className="mx-2">|</span>
                  <span>{getContentType(i)}</span>

                  {/* Share button */}
                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Link overlay */}
              <Link href={item.url} className="absolute inset-0 z-10">
                <span className="sr-only">
                  <Text field={item.fields.Title}></Text>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ManUnited = withDatasourceCheck()<ArticleListComponentProps>(ArticleListManUn);
export const Default = withDatasourceCheck()<ArticleListComponentProps>(ArticleListDefault);
export const ThreeColumn = withDatasourceCheck()<ArticleListComponentProps>(ArticleListThreeColumn);
export const Simplified = withDatasourceCheck()<ArticleListComponentProps>(ArticleListSimplified);
export const Grid = withDatasourceCheck()<ArticleListComponentProps>(ArticleListGrid);
