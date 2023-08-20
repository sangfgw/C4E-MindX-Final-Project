/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                                  Dropdown                                             - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// domLists
// const domListParent = document.querySelector('[data-dropdown="dropdown-level-1"]');

// Fnc: Handle Dropdown
const dropDown = (domList = document, dropDownType) => {
    // Check UL List
    if (domList.nodeName === "UL") {
        if (domList.childElementCount > 0) {
            let countListItem = 0;
            while (countListItem < domList.childElementCount) {
                const domListItem = domList.children[countListItem];
                // Check LI Item
                if (domListItem.nodeName === "LI" && domListItem.dataset.dropdownItem) {
                    // Hover Dropdown
                    if (dropDownType === "hover") {
                        // If Mouse Hover LI Item -> Trigger DOM Event
                        domListItem.addEventListener("mouseover", (ev) => {
                            let countListItemChild = 0;
                            while (countListItemChild < domListItem.childElementCount) {
                                if (domListItem.children[countListItemChild].nodeName === "UL") {
                                    domListItem.children[countListItemChild].classList.remove("hidden");

                                    // Add More Style When Hover
                                    addStylesElement(domListItem.children[countListItemChild], "before:-top-6", "before:lg:flex]", "before:lg:h-6", "before:lg:absolute", "before:lg:w-full", "before:lg:left-[0px]");
                                }
                                countListItemChild++;
                            }
                        });

                        // If Mouse Leave LI Item -> Trigger DOM Event
                        domListItem.addEventListener("mouseout", (ev) => {
                            let countListItemChild = 0;
                            while (countListItemChild < domListItem.childElementCount) {
                                if (domListItem.children[countListItemChild].nodeName === "UL") {
                                    domListItem.children[countListItemChild].classList.add("hidden");

                                    // Remove Styles When Mouse Not Hover
                                    removeStylesElement(domListItem.children[countListItemChild], "before:-top-6", "before:lg:flex]", "before:lg:h-6", "before:lg:absolute", "before:lg:w-full", "before:lg:left-[0px]");
                                }
                                countListItemChild++;
                            }
                        });
                    }
                }
                countListItem++;
            }
        }
    }
};

// dropDown(domListParent, "hover");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                           Active Navigate Item                                        - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
// Fnc: Active Item
const activeNavItem = (domList = document, ...tailwindStyleCSS) => {
    if (domList.nodeName === "UL" && domList.childNodes && domList.childElementCount > 0) {
        let countChild = 0;
        while (countChild < domList.childElementCount) {
            if (domList.children[countChild].dataset.navbarState === "active") {
                tailwindStyleCSS.forEach(style => {
                    domList.children[countChild].classList.add(`${style}`);
                });
                break;
            }
            countChild++;
        }
    }
}

// Fnc: Remove Item
const removeNavItem = (domList = document, ...tailwindStyleCSS) => {
    if (domList.nodeName === "UL" && domList.childNodes && domList.childElementCount > 0) {
        let countChild = 0;
        while (countChild < domList.childElementCount) {
            if (domList.children[countChild].dataset.navbarState === "active") {
                tailwindStyleCSS.forEach(style => {
                    domList.children[countChild].classList.remove(`${style}`);
                });

                break;
            }
            countChild++;
        }
    }
}

// activeItem(domListParent, "bg-neutral-800");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                           Dropdown Level 1 Hover                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */

// Fnc: Hover Item Without Active
const hoverNavItem = (domList = document, ...tailwindStyleCSS) => {
    if (domList.nodeName === "UL" && domList.childNodes && domList.childElementCount > 0) {
        let countChild = 0;
        while (countChild < domList.childElementCount) {
            if (!domList.children[countChild].dataset.navbarState 
                && domList.children[countChild].dataset.navbarPage 
                && !domList.children[countChild].dataset.navbarHover) {
                tailwindStyleCSS.forEach(style => {
                    const fixedStyle = String(style).trim();
                    // domList.children[countChild].classList.add("hover:"+ `${fixedStyle}`);

                    if (Number(domList.children[countChild].parentElement.dataset.dropdownLevel) === 1) {
                        domList.children[countChild].classList.add("dropdown-item-level-1--not-active");
                    }  else {
                        domList.children[countChild].classList.add("hover:"+ `${fixedStyle}`);
                    }
                });
            }
            countChild++;
        }
    }
}

// hoverNavItem(domListParent, "bg-slate-100/10");

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                           Dropdown Level 2 Hover                                      - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const hoverNavItemLevel2 = () => {
    const domDropdownListsLevel2 = document.querySelectorAll('[data-dropdown="dropdown-level-2"]');
    domDropdownListsLevel2.forEach(dropDownListLevel2 => {
        hoverNavItem(dropDownListLevel2, "border-indigo-500");
    });
}

/* --------------------------------------------------------------------------------------------------------- */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* -                                      Active Navigate Item Level 2                                     - */
/* -                                                                                                       - */
/* -                                                                                                       - */
/* --------------------------------------------------------------------------------------------------------- */
const activeNavItemLevel2 = () => {
    // const domNavListLevel2 = document.querySelector('[data-dropdown="dropdown-level-2-news"]');
    const domDropdownListsLevel2 = document.querySelectorAll('[data-dropdown="dropdown-level-2"]');
    domDropdownListsLevel2.forEach(dropDownListLevel2 => {
        activeNavItem(dropDownListLevel2, "text-rose-700");
        removeNavItem(dropDownListLevel2, "border-b-2", "border-y-transparent", "hover:border-indigo-500");
    });
}


// Function: Stying Element
const addStylesElement = (element = HTMLElement, ...tailwindStyleCSS) => {
    element.classList.add(...tailwindStyleCSS);
}

// Function: Remove Styling Element
const removeStylesElement = (element = HTMLElement, ...tailwindStyleCSS) => {
    element.classList.remove(...tailwindStyleCSS);
}

export { dropDown, hoverNavItem, hoverNavItemLevel2, activeNavItem, activeNavItemLevel2 };