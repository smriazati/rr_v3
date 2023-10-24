export default (context, inject) => {
    function setPageTitle(data) {
        // console.log('metadata', data)
        const activeLanguage = this.$store.state.localization.activeLanguage
        const titleInActiveLang = this.pageMetadata?.pageTitle[activeLanguage];

        let baseName = '';
        if (this.name) {
            baseName = this.name.charAt(0).toUpperCase() + this.name.slice(1)
        }

        const finalTitle = titleInActiveLang ? titleInActiveLang : baseName
        return finalTitle;
    }

    inject('setPageTitle', setPageTitle)
}