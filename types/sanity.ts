// Sanity content type definitions

export interface LocalizedString {
    en: string;
    uk: string;
    es?: string;
    he?: string;
}

export interface LocalizedText {
    en: string;
    uk: string;
    es?: string;
    he?: string;
}

export interface LocalizedContent {
    en: { rte: any[] };
    uk: { rte: any[] };
    es?: { rte: any[] };
    he?: { rte: any[] };
}

export interface SanityImage {
    img: {
        asset: string;
    };
    alt: LocalizedString;
    caption?: LocalizedString;
    credit?: LocalizedString;
}

export interface SanityVideo {
    id: string;
    vidCaption?: LocalizedString;
}

export interface ContentImageText {
    _type: 'contentImgText';
    _key: string;
    img: SanityImage;
    text: LocalizedContent;
    align: 'left' | 'right';
}

export interface ContentImageFull {
    _type: 'contentImgFull';
    _key: string;
    img: SanityImage;
}

export interface ContentText {
    _type: 'contentText';
    _key: string;
    text: LocalizedContent;
}

export interface ContentQuote {
    _type: 'contentQuote';
    _key: string;
    quote: LocalizedString;
    attribution?: LocalizedString;
}

export interface ContentVideo {
    _type: 'contentVideo';
    _key: string;
    vid: SanityVideo;
    text: LocalizedContent;
    align: 'left' | 'right';
}

export type ContentBlock = ContentImageText | ContentImageFull | ContentText | ContentQuote | ContentVideo;

export interface PageMetadata {
    pageTitle: LocalizedString;
    metaDescription?: LocalizedString;
}

export interface NavLabel {
    _type: 'navLabel';
    _key: string;
    label: LocalizedString;
}

export interface NextNavLabel {
    _type: 'nextNavLabel';
    _key: string;
    next: LocalizedString;
    prev: LocalizedString;
}

// Settings types
export interface SiteSettings {
    _type: 'settings';
    showLanguagePicker: boolean;
    siteNavLabels: {
        sections: LocalizedString[];
        prev: LocalizedString;
        next: LocalizedString;
    };
    vidPlaybackLabels: {
        play: LocalizedString;
        pause: LocalizedString;
    };
}

export interface OccupationSettings {
    _type: 'settings2';
    nav: {
        next: LocalizedString;
    };
    content: {
        optionsTitle: LocalizedString;
        instructionsLabel: LocalizedString;
        recenterLabel: LocalizedString;
        markersTitle: LocalizedString;
    };
    backBtnText: LocalizedString;
}

// Marker types
export interface MapMarker {
    _id: string;
    content: {
        title: LocalizedString;
        sections: ContentBlock[];
    };
    coordinates: {
        lat: number;
        lng: number;
    };
}

// Story types
export interface Story {
    _id: string;
    _type: string;
    title: LocalizedString;
    subtext?: LocalizedString;
    instructions?: LocalizedContent;
    content?: ContentBlock[];
    pageMetadata?: PageMetadata;
} 