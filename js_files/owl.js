
$(".testmonial_slider_area").owlCarousel({
    autoplay: true,
    slideSpeed: 1000,
    items: 4,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-arrow-left fa-2x"></i>',
      '<i class="fa fa-arrow-right fa-2x"></i>'
    ],
    margin: 30,
    dots: true,
    responsive: {
      320: {
        items: 1
      },
      767: {
        items: 2
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });