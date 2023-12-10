<template>
    <div>
        <span class="text visually-hidden">View Menu</span>
        <span class="menu-button"><svg viewBox="0 0 100 80" width="36" height="36">
                <rect class="line-1" width="64" height="10"></rect>
                <rect class="line-2" y="30" width="80" height="10"></rect>
                <rect class="line-3" y="60" width="64" height="10"></rect>
            </svg></span>
    </div>
</template>


<style lang="scss">
.menu-button .line-1 {
    top: 0px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

.menu-button .line-2 {
    top: 18px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

.menu-button .line-3 {
    top: 36px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

.expanded .menu-button .line-1 {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -3px;
    left: 8px;
}

.expanded .menu-button .line-2 {
    width: 0%;
    opacity: 0;
}

.expanded .menu-button .line-3 {
    -webkit-transform: rotate(-45deg) translateY(6px) translateX(2px);
    -moz-transform: rotate(-45deg) translateY(6px) translateX(2px);
    -o-transform: rotate(-45deg) translateY(6px) translateX(2px);
    transform: rotate(-45deg) translateY(6px) translateX(2px);
    top: 39px;
    left: 8px;
}
</style>
