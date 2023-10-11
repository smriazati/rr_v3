export { default as SanityContent } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-content.js'
export { default as SanityFile } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-file.js'
export { default as SanityImage } from '../../node_modules/@nuxtjs/sanity/dist/components/sanity-image.js'
export { default as Pagination } from '../../components/Pagination.vue'
export { default as ConclusionEnd } from '../../components/Conclusion/End.vue'
export { default as LocalizationImage } from '../../components/Localization/Image.vue'
export { default as LocalizationImageNoCaption } from '../../components/Localization/ImageNoCaption.vue'
export { default as LocalizationImageZoomer } from '../../components/Localization/ImageZoomer.vue'
export { default as LocalizationLanguagePicker } from '../../components/Localization/LanguagePicker.vue'
export { default as LocalizationQuote } from '../../components/Localization/Quote.vue'
export { default as LocalizationRte } from '../../components/Localization/Rte.vue'
export { default as LocalizationString } from '../../components/Localization/String.vue'
export { default as ExhibitLandingPageFooter } from '../../components/Exhibit/LandingPageFooter.vue'
export { default as ExhibitNav } from '../../components/Exhibit/Nav.vue'
export { default as ExhibitNav0 } from '../../components/Exhibit/Nav0.vue'
export { default as StoriesAftermath } from '../../components/Stories/Aftermath.vue'
export { default as StoriesIntro } from '../../components/Stories/Intro.vue'
export { default as StoriesSubheadline } from '../../components/Stories/Subheadline.vue'
export { default as StoriesSubjects } from '../../components/Stories/Subjects.vue'
export { default as ScrollHint } from '../../components/Scroll/Hint.vue'
export { default as ScrollProgressBar } from '../../components/Scroll/ProgressBar.vue'
export { default as StoryLandingPageImages } from '../../components/Story/LandingPageImages.vue'
export { default as StoryTitle } from '../../components/Story/Title.vue'
export { default as StoryTitle0 } from '../../components/Story/Title0.vue'
export { default as SystemIcon } from '../../components/System/Icon.vue'
export { default as SystemImageZoomer } from '../../components/System/ImageZoomer.vue'
export { default as SystemLogo } from '../../components/System/Logo.vue'
export { default as SystemTextScroller } from '../../components/System/TextScroller.vue'
export { default as VimeoComponent } from '../../components/Vimeo/Component.vue'
export { default as VimeoComponentBg } from '../../components/Vimeo/ComponentBg.vue'
export { default as ContentImageFull } from '../../components/Content/ImageFull.vue'
export { default as ContentImageText } from '../../components/Content/ImageText.vue'
export { default as ContentQuote } from '../../components/Content/Quote.vue'
export { default as ContentText } from '../../components/Content/Text.vue'
export { default as ContentVideo } from '../../components/Content/Video.vue'
export { default as MapControls } from '../../components/Map/Controls.vue'
export { default as MapControlsMarkerListItem } from '../../components/Map/ControlsMarkerListItem.vue'
export { default as MapIntro } from '../../components/Map/Intro.vue'
export { default as MapModal } from '../../components/Map/Modal.vue'
export { default as MapStorymap } from '../../components/Map/Storymap.vue'
export { default as MapModalsS } from '../../components/Map/Modals/S.vue'
export { default as MapModalsS4 } from '../../components/Map/Modals/S4.vue'
export { default as MapModalsS5 } from '../../components/Map/Modals/S5.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
