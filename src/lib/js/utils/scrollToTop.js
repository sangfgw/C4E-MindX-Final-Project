export const scrollToTop = () => {
    // Get Scroll To Top Button
    const domScrollToTopBtn = document.querySelector("[data-scroll=\"scroll_to_top\"]");

    // Get Header Height
    const headerHeightStr = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
    let headerHeight = 0;
    headerHeight = Number(headerHeightStr.slice(0, headerHeightStr.indexOf('px')));

    // Listening User Scroll Event
    window.addEventListener("scroll" , (ev) => {
        // Display Button
        if (window.document.body.scrollTop > headerHeight || window.document.documentElement.scrollTop > headerHeight) {
            domScrollToTopBtn.classList.remove("hidden");
        } else {
            domScrollToTopBtn.classList.add("hidden");
        }
    });

    // Listening User Click Scroll Button Event
    domScrollToTopBtn.addEventListener("click", (ev) => {
        // Scroll To Top
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}