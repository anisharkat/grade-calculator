import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useApp } from '../context/AppContext';

export const SeoManager = () => {
    const { settings, t } = useApp();
    const currentLang = settings.lang;
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    const getLocale = (lang) => {
        switch (lang) {
            case 'ar': return 'ar_AR';
            case 'fr': return 'fr_FR';
            case 'en': return 'en_US';
            default: return 'en_US';
        }
    };

    const siteUrl = window.location.origin;
    const itemsUrl = `${siteUrl}/og-image.png`;

    const getPageTitle = () => {
        if (currentLang === 'ar') {
            return `${t.title} | University Grade Calculator`;
        }
        return t.title;
    };

    const pageTitle = getPageTitle();

    return (
        <Helmet htmlAttributes={{ lang: currentLang, dir: dir }}>
            <title>{t.title}</title>
            <meta name="description" content={t.metaDescription} />
            <meta name="keywords" content={t.keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={t.metaDescription} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:image" content={itemsUrl} />
            <meta property="og:locale" content={getLocale(currentLang)} />
            <meta property="og:site_name" content={t.title} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={t.metaDescription} />
            <meta name="twitter:image" content={itemsUrl} />
        </Helmet>
    );
};
