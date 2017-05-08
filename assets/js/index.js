/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    // ==============
    // Ajax Load More
    // ==============

    var pagination_next_url = $('link[rel=next]').attr('href'),
        $load_posts_button  = $('.js-load-posts');

    $load_posts_button.click(function(e) {
        e.preventDefault();

        var request_next_link = pagination_next_url.split(/page/)[0] + 'page/' + pagination_next_page_number + '/';

        $.ajax({
        url: request_next_link,
        beforeSend: function() {
            $load_posts_button.text('Loading');
            $load_posts_button.addClass('button--loading');
        }
        }).done(function(data) {
            var posts = $('.post', data);

            $load_posts_button.text('Load More');
            $load_posts_button.removeClass('button--loading');

            $('.posts').append(posts);

            pagination_next_page_number++;

            // If you are on the last pagination page, add the disabled attribute
            if (pagination_next_page_number > pagination_available_pages_number) {
                $load_posts_button.attr('disabled', true);
            }
        });
    });
})(jQuery);
