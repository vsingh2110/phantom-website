const dialog = document.querySelector('dialog');
dialogPolyfill.registerDialog(dialog);

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openButton = document.querySelector(".open-button");
    const closeButton = document.querySelector(".close-button");

    if (openButton) {
        openButton.addEventListener("click", () => {
            modal.showModal();
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.close();
        });
    }
});
