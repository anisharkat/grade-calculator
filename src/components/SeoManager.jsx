import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../context/AppContext';

export const SeoManager = () => {
    const { settings, t } = useApp();
    const currentLang = settings.lang;
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    return (
        <Helmet htmlAttributes={{ lang: currentLang, dir: dir }}>
            <title>{t.title}</title>
            <meta name="description" content={t.metaDescription} />
            <meta name="keywords" content={t.keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={t.title} />
            <meta property="og:description" content={t.metaDescription} />
            <meta property="og:locale" content={currentLang} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t.title} />
            <meta name="twitter:description" content={t.metaDescription} />
        </Helmet>
    );
};
