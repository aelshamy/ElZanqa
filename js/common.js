(function($, viewport) {
    $(function() {


        if (viewport.is('>md')) {
            makeHeaderFixed();
        }
        $(window).resize(function() {
            viewport.changed(function() {
                if (viewport.is('>md')) {
                    makeHeaderFixed();
                }
            })
        });





        if (jQuery().flip) {
            $('.product-card').flip({
                trigger: 'manual'
            });
            //card flip
            $('.flip-card').on('click', function(e) {
                e.preventDefault();
                $('.dimmed').fadeToggle();
                $(this).parents('.product-card:first').flip(true).css('zIndex', '9999');
            });
            $('.flip-card-close').on('click', function(e) {
                e.preventDefault();
                $('.dimmed').fadeToggle();
                $(this).parents('.product-card:first').flip(false, function() {
                    $(this).css('zIndex', '');
                });
            });
        }

        $(".main-header .scrolled-content ul, .main-header .scrolled-content .media-list").mCustomScrollbar({
            setHeight: 210,
            autoHideScrollbar: true,
            scrollbarPosition: "outside",
            theme: "dark-3"
        });

        $('.follow-sign').on('click', function(e) {
            var $this = $(this);
            e.preventDefault();
            if ($this.hasClass('followed')) {
                $this.removeClass('followed');
            } else {
                $this.addClass('followed');
            }
        });

        //store setting -- store title erase button
        $('.erase-input').on('click', function() {
            var input = $(this).parents('.input-group:first').find('.form-control');
            if (input.val().length > 0) {
                input.val("");
            }
        });

        if (jQuery().fileinput) {
            $("#input-20").fileinput({
                showCaption: false,
                showRemove: false,
                showUpload: false,
                allowedFileExtensions: ["jpg", "png", 'gif'],
                layoutTemplates: {
                    main2: '{remove}\n{cancel}\n{upload}\n{browse}\n{preview}',
                    footer: '',
                    preview: '<div class="file-preview {class}">\n' +
                        '    <div class="{dropClass}">\n' +
                        '    <div class="file-preview-thumbnails">\n' +
                        '    </div>\n' +
                        '    <div class="clearfix"></div>' +
                        '    <div class="kv-fileinput-error"></div>\n' +
                        '    </div>\n' +
                        '</div>',
                },
                previewTemplates: {
                    image: '<div class="file-preview-frame" id="{previewId}" data-fileindex="{fileindex}">\n' +
                        '   <img src="{data}" class="file-preview-image" title="{caption}" alt="{caption}" ' + '>\n' +
                        '   {footer}\n' +
                        '</div>\n',
                }
            });

        }
        // star rating
        if (jQuery().rating) {
            $(".rate-stars").rating({
                rtl: true,
                showClear: false,
                showCaption: false
            });
        }


        var $image = $('.image-preview > img');
        var options = {
            aspectRatio: 4 / 3,
            // preview: '.img-preview',
        };


        $('body').on('click', '.file-preview-frame img', function() {
            $('.image-preview').show().next().show();

            $image.on({
                'build.cropper': function(e) {
                    console.log(e.type);
                },
                'built.cropper': function(e) {
                    console.log(e.type);
                },
                'cropstart.cropper': function(e) {
                    console.log(e.type, e.action);
                },
                'cropmove.cropper': function(e) {
                    console.log(e.type, e.action);
                },
                'cropend.cropper': function(e) {
                    console.log(e.type, e.action);
                },
                'crop.cropper': function(e) {
                    console.log(e.type);
                },
                'zoom.cropper': function(e) {
                    console.log(e.type, e.ratio);
                }
            }).cropper(options);

        });

        $('body').on('click', '[data-method]', function() {
            var $this = $(this);
            var data = $this.data();
            var $target;
            var result;

            if ($this.prop('disabled') || $this.hasClass('disabled')) {
                return;
            }

            if ($image.data('cropper') && data.method) {
                data = $.extend({}, data); // Clone a new one

                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);

                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }

                result = $image.cropper(data.method, data.option, data.secondOption);

                if (data.flip === 'horizontal') {
                    $(this).data('option', -data.option);
                }

                if (data.flip === 'vertical') {
                    $(this).data('secondOption', -data.secondOption);
                }

                if (data.method === 'getCroppedCanvas' && result) {
                    $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                    if (!$download.hasClass('disabled')) {
                        $download.attr('href', result.toDataURL());
                    }
                }

                if ($.isPlainObject(result) && $target) {
                    try {
                        $target.val(JSON.stringify(result));
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        });

    });
})(jQuery, ResponsiveBootstrapToolkit);

function getScroll() {
    var b = document.body;
    var e = document.documentElement;
    return {
        left: parseFloat(window.pageXOffset || b.scrollLeft || e.scrollLeft),
        top: parseFloat(window.pageYOffset || b.scrollTop || e.scrollTop)
    };
}

function makeHeaderFixed() {
    var mainHeader = $('.main-header'),
        mainnav = $('.mainnav');

    $('.header-toggle, .list-notifications a').on('click', function(e) {
        e.preventDefault();

        mainHeader.toggleClass('expanded');
        mainnav.toggleClass('minified');
        $(window).trigger('scroll');
        $('.dimmed').fadeToggle(function() {
            $('.header-columns').toggle();
            $('.header-toggle').toggleClass('opened');
        });
    });

    $(window).scroll(function() {

        if (!mainHeader.hasClass('expanded')) {
            var headerHeight = mainHeader.height(),
                scroll = getScroll();
            if (headerHeight < scroll.top) {
                mainnav.addClass('minified');
            } else {
                mainnav.removeClass('minified');
            }
        }
    });
}
