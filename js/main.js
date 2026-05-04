(function($) {
  "use strict";

  var setFullHeight = function() {
    $(".js-fullheight").css("height", $(window).height());
  };

  setFullHeight();
  $(window).on("resize", setFullHeight);

  if ($("#ftco-loader").length) {
    setTimeout(function() {
      $("#ftco-loader").removeClass("show");
    }, 1);
  }

  $("body").on("click", ".js-fh5co-nav-toggle", function(event) {
    event.preventDefault();
    $(this).toggleClass("active", !$("#ftco-nav").is(":visible"));
  });

  $(document).on("click", "a[href^='#']:not([href='#']):not(.footer-skill-tab)", function(event) {
    event.preventDefault();

    var target = $($.attr(this, "href"));
    if (!target.length) return;

    $("html, body").animate({
      scrollTop: target.offset().top - 70
    }, 500);

    if ($("#ftco-nav").hasClass("show")) {
      $(".navbar-toggler").trigger("click");
    }
  });

  $(window).on("scroll", function() {
    var st = $(this).scrollTop();
    var navbar = $(".ftco_navbar");
    var scrollWrap = $(".js-scroll-wrap");

    navbar.toggleClass("scrolled", st > 150);

    if (st <= 150) {
      navbar.removeClass("sleep");
    }

    if (st > 350) {
      navbar.addClass("awake");
      scrollWrap.addClass("sleep");
    } else {
      navbar.removeClass("awake");
      if (st < 350 && navbar.hasClass("scrolled")) {
        navbar.addClass("sleep");
      }
      scrollWrap.removeClass("sleep");
    }
  });

  $("#section-counter, .hero-wrap, .ftco-counter, .ftco-about").waypoint(function(direction) {
    if (direction !== "down" || $(this.element).hasClass("ftco-animated")) return;

    $(this.element).addClass("ftco-animated");
    var commaStep = $.animateNumber.numberStepFactories.separator(",");

    $(".number").each(function() {
      var number = $(this).data("number");
      $(this).animateNumber({
        number: number,
        numberStep: commaStep
      }, 1200);
    });
  }, { offset: "95%" });

  $(".ftco-animate").waypoint(function(direction) {
    if (direction !== "down" || $(this.element).hasClass("ftco-animated")) return;

    var element = $(this.element);
    var effect = element.data("animate-effect") || "fadeInUp";

    element.addClass(effect + " ftco-animated");
  }, { offset: "95%" });

  $(".mouse-icon").on("click", function(event) {
    event.preventDefault();

    var target = $(".goto-here");
    if (!target.length) return false;

    $("html, body").animate({
      scrollTop: target.offset().top
    }, 500, "easeInOutExpo");

    return false;
  });

  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.isDeleting = false;
    this.tick();
  };

  TxtRotate.prototype.tick = function() {
    var fullTxt = this.toRotate[this.loopNum % this.toRotate.length];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = this.isDeleting ? 70 : 130;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 350;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  $(window).on("load", function() {
    $(".txt-rotate").each(function() {
      var toRotate = this.getAttribute("data-rotate");
      var period = this.getAttribute("data-period");

      if (toRotate) {
        new TxtRotate(this, JSON.parse(toRotate), period);
      }
    });
  });
})(jQuery);
