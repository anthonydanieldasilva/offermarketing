$(document).ready(function () {
    $(window).scroll(function () {
        // Check if the pin-spacer section is in the viewport
        var pinSpacer = $(".pin-spacer");
        var pinSpacerTop = pinSpacer.offset().top;
        var pinSpacerHeight = pinSpacer.outerHeight();
        var pinSpacerBottom = pinSpacerTop + pinSpacerHeight;
        var windowHeight = $(window).height();
        var windowBottom = $(this).scrollTop() + windowHeight;

        if (pinSpacerTop < windowBottom && pinSpacerBottom > $(this).scrollTop()) {
            pinSpacer.addClass("is-sticky");
        } else {
            pinSpacer.removeClass("is-sticky");
        }

        // Add 'is-inview' class to '.WhatWeDo_whatWeDoWrap' when scrolled down 200px
        var scrollPosition = $(this).scrollTop();
        $(".WhatWeDo_whatWeDoWrap").each(function () {
            var elemTop = $(this).offset().top;
            if (scrollPosition > elemTop - 200) {
                $(this).addClass("is-inview");
            } else {
                $(this).removeClass("is-inview"); // Remove the class when not in view
            }
        });

        // Adjust transform property of '.WhatWeDo_scrollElement' dynamically
        var $inviewWrap = $(".WhatWeDo_whatWeDoWrap.is-inview");
        if ($inviewWrap.length > 0) {
            var inviewTop = $inviewWrap.offset().top;
            var inviewScroll = scrollPosition - inviewTop + 150;
            var containerHeight = $("#whatWeDoContainer").outerHeight();
            inviewScroll = Math.min(containerHeight, Math.max(0, inviewScroll)); // Ensure it doesn't scroll beyond container height
            $(".WhatWeDo_scrollElement").css(
                "transform",
                "translateY(" + inviewScroll + "px)"
            );
        } else {
            $(".WhatWeDo_scrollElement").css("transform", "translateY(0)");
        }

        // Section reveal on scroll for .WhatWeDo_whatWeDoCotentList
        $(".WhatWeDo_whatWeDoWrap").each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var parallaxOffset = ($(window).scrollTop() - sectionTop) * 0.2; // Adjust the parallax speed here

            // Check if the section is in view
            if (
                scrollPosition + $(window).height() / 2 > sectionTop &&
                scrollPosition < sectionBottom
            ) {
                // Fade in the corresponding .WhatWeDo_whatWeDoCotentList
                $(this).find(".WhatWeDo_whatWeDoCotentList").addClass("fade-in");

                // Apply parallax effect to .WhatWeDo_whatWeDoCotentList
                $(this)
                    .find(".WhatWeDo_whatWeDoCotentList")
                    .css("transform", "translateY(" + parallaxOffset + "px)");
            } else {
                // Fade out the .WhatWeDo_whatWeDoCotentList of other sections
                $(this).find(".WhatWeDo_whatWeDoCotentList").removeClass("fade-in");
            }
        });

        // Remove is-inview class from WhatWeDo_whatWeDoWrap when it's not in view
        $(".WhatWeDo_whatWeDoWrap:not(.is-inview)")
            .find(".WhatWeDo_whatWeDoCotentList")
            .removeClass("fade-in");
    });

    // Trigger scroll event when the page loads to apply changes immediately
    $(window).scroll();
});
