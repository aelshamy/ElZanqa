(function() {
    $(function() {

        $('.header-toggle, .list-notifications a').on('click', function(e) {
            e.preventDefault();
            //$(this).removeClass('closed').addClass('opened');
            $(".main-header").toggleClass('expanded');
            $('.dimmed').fadeToggle(function(){
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


    });
})();
