/* eslint react/jsx-key: 0 */

/**
 * External dependencies
 */
import React from 'react';
import { element, i18n, components, editor } from 'wp';

/**
 * Internal dependencies
 */
import './style.scss';
import image from './iphone.svg';

const { Fragment } = element;
const { __ } = i18n;
const { PanelBody, BaseControl, RangeControl, IconButton, Toolbar, SelectControl } = components;
const { InnerBlocks, InspectorControls, PanelColorSettings, MediaUpload, BlockControls } = editor;

const TEMPLATE = [
  ['core/heading', {
    placeholder: 'Hero title',
    content: 'Gutenberg for Drupal 8',
    level: 1,
  }],
  ['core/paragraph', {
    placeholder: 'Hero content',
    content: 'Thanks to open source, we are now reusing the same tools on multiple CMSs',
    customTextColor: '#ffffff',
    customFontSize: 20,
  }],
  ['core/button', {
    text: 'Read more',
    url: 'https://github.com/front/gutenberg-js',
  }],
];

export const name = 'hero-section';

export const settings = {
  title: __('Hero Section'),
  description: __('Create a landing page combining heading, image, text and button on a smashing background.'),
  icon: 'cover-image',

  attributes: {
    imageUrl: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
      default: image,
    },
    imageUrlData:{
      type: 'object',
      default: {},
    },
    backgroundType: {
      type: 'string',
      default: 'color',
    },
    backgroundColor: {
      type: 'string',
      // default: '#2DB8CA',
    },
    backgroundImage: {
      type: 'string',
      default: 'https://placeimg.com/1200/600/nature/grayscale',
    },
    backgroundImageData:{
      type: 'object',
      default: {},
    },
    imageLayout: {
      type: 'string',
      default: 'right',
    },
    overlayOpacity: {
      type: 'number',
      default: 40,
    },
    contentWidth: {
      type: 'number',
      default: 960,
    },
    align: {
      type: 'string',
      default: 'full',
    },
  },

  edit ({ attributes, className, setAttributes }) {
    const {
      backgroundType, backgroundColor, backgroundImage, backgroundImageData, overlayOpacity,
      contentWidth, imageLayout, imageUrl, imageUrlData, align,
    } = attributes;

    const containerStyle = {
      backgroundColor: backgroundType === 'color' ? backgroundColor : 'black',
      backgroundImage: backgroundType === 'image' && `url('${backgroundImage}')`,
    };
    const overlayStyle = backgroundType === 'color' ? {} : {
      display: 'block',
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`,
    };

    const onSelectImage = (media, field) => {
      const dataAttrs = {};

      if (media.data) {
        dataAttrs[`${field}Data`] = Object.keys(media.data)
        .reduce((result, key) => {
          result[`data-${key.replace('_', '-')}`] = media.data[key];
          return result;
        }, {});
      }

      setAttributes({
        [field]: media.url,
        ...dataAttrs,
      });
    };

    const classes = `${className} align${align}`;

    return (
      <Fragment>
        <div className={ classes } style={ containerStyle } { ...backgroundImageData }>
          <div className="bg-overlay" style={ overlayStyle }></div>
          <section className={ `image-${imageLayout}` } style={ wrapperStyle }>
            <main>
              <InnerBlocks template={ TEMPLATE } templateLock={ false } />
            </main>
            { imageLayout && <div className="image-feature">
              <MediaUpload type="image"
                onSelect={ media => onSelectImage(media, 'imageUrl') } render={({ open }) => (
                  <IconButton className="components-toolbar__control" label={ __('Edit image') }
                    icon="edit" onClick={ open } />
                ) }
              />
              <img src={ imageUrl } { ...imageUrlData } />
            </div> }
          </section>
        </div>

        { backgroundType === 'image' && <BlockControls>
          <Toolbar>
            <MediaUpload type="image"
              onSelect={ media => onSelectImage(media, 'backgroundImage') } render={ ({ open }) => (
                <IconButton className="components-toolbar__control" label={ __('Edit image') }
                  icon="edit" onClick={ open } />
              ) }
            />
          </Toolbar>
        </BlockControls> }

        <InspectorControls>
          <PanelBody title={ __('Block Settings') }>
            <BaseControl label={ __('Content Width in pixels') } id="block-hero-section-content-width-input">
              <input
                type="number"
                id="block-hero-section-content-width-input"
                value={ contentWidth }
                onChange={ ev => setAttributes({ contentWidth: parseInt(ev.target.value, 10) }) }
                step="10"
              />
            </BaseControl>

            {/* Image placement */}
            <SelectControl
              label={ __('Image Placement') }
              value={ imageLayout }
              options={ [
                {
                  label: __('No Image'),
                  value: '',
                },
                {
                  label: __('On the left'),
                  value: 'left',
                },
                {
                  label: __('On the right'),
                  value: 'right',
                },
              ] }
              onChange={ value => setAttributes({ imageLayout: value }) }
            />

            {/* Background control */}
            <SelectControl
              label={ __('Background Type') }
              value={ backgroundType }
              options={ [
                {
                  label: __('Solid Color'),
                  value: 'color',
                },
                {
                  label: __('Image'),
                  value: 'image',
                },
              ] }
              onChange={ value => setAttributes({ backgroundType: value }) }
            />

            { backgroundType === 'image' &&
              <RangeControl
                label={ __('Overlay Opacity') } value={ overlayOpacity }
                onChange={ value => setAttributes({ overlayOpacity: value }) }
                min={ 0 } max={ 100 } step={ 5 }
              /> }
          </PanelBody>

          { backgroundType !== 'image' && <PanelColorSettings
            title={ __('Color Settings') }
            initialOpen={ true }
            colorSettings={ [
              {
                value: backgroundColor,
                onChange: value => setAttributes({ backgroundColor: value }),
                label: __('Background Color'),
              },
            ] }></PanelColorSettings>
          }
        </InspectorControls>
      </Fragment>
    );
  },

  save ({ attributes, className }) {
    const {
      backgroundType, backgroundColor, backgroundImage, backgroundImageData, overlayOpacity,
      contentWidth, imageLayout, imageUrl, imageUrlData, align,
    } = attributes;

    const containerStyle = {
      backgroundColor: backgroundType === 'color' ? backgroundColor : 'black',
      backgroundImage: backgroundType === 'image' && `url('${backgroundImage}')`,
    };
    const overlayStyle = backgroundType === 'color' ? {} : {
      display: 'block',
      opacity: parseInt(overlayOpacity, 10) / 100,
    };
    const wrapperStyle = {
      maxWidth: contentWidth && `${contentWidth}px`,
    };

    const classes = `${className} align${align}`;

    return (
      <div className={ classes } style={ containerStyle } { ...backgroundImageData }>
        <div className="bg-overlay" style={ overlayStyle }></div>
        <section className={ `image-${imageLayout}` } style={ wrapperStyle }>
          <main>
            <InnerBlocks.Content />
          </main>
          { imageLayout && <div className="image-feature"><img src={ imageUrl } { ...imageUrlData } /></div> }
        </section>
      </div>
    );
  },

  deprecated: [ {
    save ({ attributes, className }) {
      const {
        backgroundType, backgroundColor, backgroundImage, backgroundImageData, overlayOpacity,
        contentWidth, imageLayout, imageUrl, imageUrlData,
      } = attributes;

      const containerStyle = {
        backgroundColor: backgroundType === 'color' ? backgroundColor : 'black',
        backgroundImage: backgroundType === 'image' && `url('${backgroundImage}')`,
      };
      const overlayStyle = backgroundType === 'color' ? {} : {
        display: 'block',
        opacity: parseInt(overlayOpacity, 10) / 100,
      };
      const wrapperStyle = {
        maxWidth: contentWidth && `${contentWidth}px`,
      };

      return (
        <div className={ className } style={ containerStyle } { ...backgroundImageData }>
          <div className="bg-overlay" style={ overlayStyle }></div>
          <section className={ `image-${imageLayout}` } style={ wrapperStyle }>
            <main>
              <InnerBlocks.Content />
            </main>
            { imageLayout && <div className="image-feature"><img src={ imageUrl } { ...imageUrlData } /></div> }
          </section>
        </div>
      );
    },
  } ],
};
