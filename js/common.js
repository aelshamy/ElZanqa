(function() {
    $(function() {

        $('.header-toggle, .list-notifications a').on('click', function(e) {
            e.preventDefault();
            //$(this).removeClass('closed').addClass('opened');
            $(".main-header").toggleClass('expanded');
            $('.dimmed').fadeToggle(function() {
                $('.header-columns').toggle();
                $('.header-toggle').toggleClass('opened');
            });
        });


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
        // $('body').on('click', '.file-preview-frame img', function(){
        //     var img = $(this).clone(true);
        //     $('.image-preview').html(img);
        // });
        // 

        var $image = $('.image-preview > img');
        var options = {
            aspectRatio: 4 / 3,
            // preview: '.img-preview',
        };


        $('body').on('click', '.file-preview-frame img', function() {

            // $('.image-preview').html($(this));

            // $('.image-preview').show().find('img').cropper({
            //     aspectRatio: 16 / 9,
            //     autoCropArea: 0.65,
            //     strict: false,
            //     guides: false,
            //     highlight: false,
            //     dragCrop: false,
            //     cropBoxMovable: false,
            //     cropBoxResizable: false
            // });
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
        })

    });
})();
