function hasQueryParams(route) {
    return !!Object.keys(route.query).length
}

export default function ({ app, from, route, store }) {
    // commit update to store on page load
    const lang = route.query?.lang
    if (lang) {
        if (lang === 'uk' || lang === 'en') { // later add he & es
            store.commit("localization/setActiveLanguage", lang);
        }
    } else {
        route.query.lang = "en"
    }
    // const router = app.router;
    // router.beforeEach((to, from, next) => {
    //     if (!hasQueryParams(to) && hasQueryParams(from)) {
    //         next({ name: to.name, query: from.query });
    //     } else {
    //         next()
    //     }
    // })
}