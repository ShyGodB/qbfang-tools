/**
 * This file provides two methods to determine the active primary and secondary menus
 */

const checkMenu = (routeName, menus) => {
    let activeIndex = '1'
    menus.forEach((item, index) => {
        if (routeName === item.route.name) {
            activeIndex = index + 1 + ''
            return false
        }
    })
    return activeIndex
}

const checkTab = (tab, menus) => {
    let activeIndex = '1'
    menus.forEach((item, index) => {
        if (tab === item.route.params.tab) {
            activeIndex = index + 1 + ''
            return false
        }
    })
    return activeIndex
}

export default {
    checkMenu,
    checkTab
}
