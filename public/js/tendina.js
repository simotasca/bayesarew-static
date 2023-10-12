const tendine = document.querySelectorAll(".menu-item-tendina");

tendine.forEach(item => {
    item.addEventListener("click", (e) => {
        
        e.stopPropagation();
        item.classList.toggle("tendina-open");
        setTimeout(() => {
            item.classList.remove("tendina-open");
        }, 5_000);
    })
});

document.addEventListener("click", () => {
    tendine.forEach(t => {
        t.classList.remove("tendina-open");
    })
})