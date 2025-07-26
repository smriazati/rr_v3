<template>
    <div>
        <span class="text visually-hidden">View Menu</span>
        <span class="menu-button">
            <svg viewBox="0 0 100 80" width="36" height="36" aria-hidden="true" focusable="false">
                <rect class="line-1" width="64" height="10"></rect>
                <rect class="line-2" y="30" width="80" height="10"></rect>
                <rect class="line-3" y="60" width="64" height="10"></rect>
            </svg>
        </span>
    </div>
</template>

<style lang="scss">
.menu-button .line-1 {
    top: 0px;
    transform-origin: left center;
    position: relative;
}

.menu-button .line-2 {
    top: 18px;
    transform-origin: left center;
    position: relative;
}

.menu-button .line-3 {
    top: 36px;
    transform-origin: left center;
    position: relative;
}

/* Expanded state: parent or button has .expanded class */
.expanded .menu-button .line-1 {
    transform: rotate(45deg);
    top: -3px;
    left: 8px;
    position: relative;
}

.expanded .menu-button .line-2 {
    width: 0%;
    opacity: 0;
    transition: width 0.3s ease, opacity 0.3s ease;
}

.expanded .menu-button .line-3 {
    transform: rotate(-45deg) translateY(6px) translateX(2px);
    top: 39px;
    left: 8px;
    position: relative;
}
</style>