import React from 'react';
import {
  Field,
  ImageField,
  Placeholder,
  Text,
  RichText,
  RichTextField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ParallaxBackgroundImage } from 'components/NonSitecore/ParallaxBackgroundImage';
import Head from 'next/head';

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

export type PageBackgroundProps = ComponentProps & {
  fields?: Fields;
};

// Default fallback values
const defaultFields: Fields = {
  Title: { value: 'Default Article Title' },
  Excerpt: { value: 'This is a default excerpt for when no article data is available.' },
  Content: { value: '<p>This is default content for when no article data is available.</p>' },
  Thumbnail: {
    value: {
      src: '/default-thumbnail.jpg',
      alt: 'Default thumbnail image',
    },
  },
  BackgroundImage: {
    value: {
      src: '/default-background.jpg',
      alt: 'Default background image',
    },
  },
  Name: { value: 'Default Author' },
  Photo: {
    value: {
      src: '/default-author-photo.jpg',
      alt: 'Default author photo',
    },
  },
  Position: { value: 'Default Position' },
};

export const Default = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  // Use fields from props if available, otherwise use default fields
  const fields = props.fields || defaultFields;

  return (
    <>
      <Head>
        <meta
          property="og:description"
          content={fields.Excerpt?.value || defaultFields.Excerpt.value}
        />
        <meta property="og:name" content={fields.Title?.value || defaultFields.Title.value} />
        <meta property="og:title" content={fields.Title?.value || defaultFields.Title.value} />
        <meta
          property="og:image"
          content={fields.Thumbnail?.value?.src || defaultFields.Thumbnail.value?.src || ''}
        />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component article-details page-background spaced-top col-12 ${
          props.params?.styles?.trimEnd() || ''
        }`}
        id={id ? id : undefined}
      >
        <ParallaxBackgroundImage BackgroundImage={fields.BackgroundImage} />

        <div className="container">
          <Placeholder name="page-navigation" rendering={props.rendering} />
        </div>

        <div>
          <div className="background-content component-spaced container rounded-corners">
            <div className="p-3 p-sm-5">
              <div className="article-content">
                <div className="row row-gap-4 gx-5">
                  <div className="col-12 col-lg-6">
                    <NextImage
                      field={fields.Thumbnail}
                      className="article-img img-fluid"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <Placeholder name="article-meta" rendering={props.rendering} />
                    </div>
                    <h1 className="article-title">
                      <Text field={fields.Title} />
                    </h1>
                    <p className="article-excerpt">
                      <Text field={fields.Excerpt} />
                    </p>
                  </div>
                </div>
                <div className="article-content-body mt-5">
                  <RichText field={fields.Content} />
                </div>
              </div>
              <div className="row">
                <Placeholder name="background-page-content" rendering={props.rendering} />
              </div>
            </div>
          </div>
          <Placeholder name="page-content" rendering={props.rendering} />
        </div>
      </div>
    </>
  );
};

export const Simple = (props: PageBackgroundProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  // Use fields from props if available, otherwise use default fields
  const fields = props.fields || defaultFields;

  return (
    <>
      <Head>
        <meta
          property="og:description"
          content={fields.Excerpt?.value || defaultFields.Excerpt.value}
        />
        <meta property="og:name" content={fields.Title?.value || defaultFields.Title.value} />
        <meta property="og:title" content={fields.Title?.value || defaultFields.Title.value} />
        <meta
          property="og:image"
          content={(fields.Thumbnail?.value?.src || defaultFields.Thumbnail.value?.src) ?? ''}
        />
        <meta property="og:type" content="article" />
      </Head>
      <div
        className={`component simple-article-details mt-4 ${props.params?.styles?.trimEnd() || ''}`}
        id={id ? id : undefined}
      >
        <div className="container container-wide">
          <h1 className="article-title display-1 fw-bold">
            <Text field={fields.Title} />
          </h1>
        </div>
        <div className="container container-widest-fluid">
          <NextImage
            field={fields.Thumbnail}
            className="article-img img-fluid"
            width={1650}
            height={750}
          />
        </div>
        <div className="container">
          <div className="article-content">
            <div className="row">
              <div className="col-12 col-lg-6 mx-auto">
                <p className="article-excerpt fs-5">
                  <Text field={fields.Excerpt} />
                </p>
                <div className="article-content-body rich-text mt-5">
                  <RichText field={fields.Content} />
                </div>
                <div className="row article-meta-row">
                  <Placeholder name="article-meta" rendering={props.rendering} />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <Placeholder name="background-page-content" rendering={props.rendering} />
          </div>
        </div>
        <div className="row">
          <Placeholder name="page-content" rendering={props.rendering} />
        </div>
      </div>
    </>
  );
};
