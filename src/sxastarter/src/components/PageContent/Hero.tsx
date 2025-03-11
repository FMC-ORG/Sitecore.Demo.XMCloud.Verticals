import React from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  useSitecoreContext,
  Link,
  LinkField,
  NextImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

export type AppPromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;

  return (
    <div className={`component hero ${props.params.styles.trimEnd()}`} id={id ? id : undefined}>
      <picture>
        <NextImage field={props.fields.Image} className="" width={1920} height={400}></NextImage>
      </picture>
      <div className="container content-container">
        <div className="top-layout">
          <div className="title">
            <Text field={props.fields.Title} />
          </div>
          <div className="subtitle">
            <RichText field={props.fields.Text} />
          </div>
        </div>
        <div className="bottom-layout">
          <div className="btn-array">
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link field={props.fields.Link} className="button button-main mt-3" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export const ManUn = (props: AppPromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier
  const { sitecoreContext } = useSitecoreContext()
  const isPageEditing = sitecoreContext.pageEditing

  return (
    <div
      className={`relative w-full h-screen overflow-hidden ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full">
        <NextImage
          field={props.fields.Image}
          className="object-cover w-full h-full brightness-75"
          width={1920}
          height={1080}
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-12">
        <div className="container mx-auto">
          {/* Main heading - large, bold, white text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl">
            <Text field={props.fields.Title} />
          </h1>

          {/* Subtitle text */}
          <div className="text-white text-lg md:text-xl mb-8 max-w-3xl">
            <RichText field={props.fields.Text} />
          </div>

          {/* Button and video duration indicator */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {(isPageEditing || props.fields?.Link?.value?.href) && (
              <Link
                field={props.fields.Link}
                className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-sm font-medium transition-colors"
              />
            )}

            {/* Video duration indicator */}
            <div className="flex items-center text-white text-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>2m | video</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
