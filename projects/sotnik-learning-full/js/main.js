(function () {
    /*
     *  Fields
     */

    var self = window.controllerBase || {};
    window.controllerBase = self;

    var iframeUrl = 'https://www.youtube.com/embed/go4HTj_8Tnk?rel=0&showinfo=0&autoplay=1;';
    var iframeTag = '<iframe width="560" height="315" src="" frameborder="0"></iframe>';
    var clone = {};

    /*
     *  Events
     */

    function onLoad() {
        sliderInitialize();
        dynamicPrice('#saleTimer');
        scrollToLinkEventListener();
        cloneDataFromJson();
    }

    function onScrollLinkClicked(link) {
        var blockToScrollId = $(link).attr('href');
        var heightFromTopToBlock = $(blockToScrollId).offset().top;
        heightFromTopToBlock = heightFromTopToBlock - 72; //header height
        $('body,html').animate({scrollTop: heightFromTopToBlock}, 1500);
    }

    self.onBurgerMenuClicked = function(){
        navMobileMenuToogle();
    }

    self.onVideoBlockClick = function (videoBlock) {
        $(videoBlock).find('.icon').addClass('d-none');
        $(videoBlock).append(iframeTag);
        $(videoBlock).find('iframe').attr('src', iframeUrl);
    }

    self.onMenuLinkClick = function (link) {
        $('.nav-link').removeClass('active');
        $(link).addClass('active');

        navMobileMenuToogle();
    }

    self.onTeacherBlockClick = function (teacherId) {
        var modalId = Date.now();
        var modalClone = $('#teacher_modal').clone();
        var modalCloneId = 'teacher_modal_' + modalId;

        modalClone.attr('id', modalCloneId);
        $('body').append(modalClone);

        getDataToModal(modalCloneId, teacherId);
    }


    $(window).ready(onLoad());

    /*
     * Methods
     */

    function navMobileMenuToogle(){
        $('#header .nav').toggleClass('show');
        $('.mobile_menu_toggle').toggleClass('open');
    }

    function sliderInitialize() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            nav: false,
            margin: 10,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },

                993: {
                    items: 2,
                    loop: false
                }
            }
        });
    };

    function scrollToLinkEventListener() {
        $(".anchor").on("click", function (event) {
            event.preventDefault();
            onScrollLinkClicked(this);
        });
    }

    function cloneDataFromJson(){
        $.getJSON('teachers.json', function (data) {
            for (var key in data) {
                clone[key] = data[key];
            }
        });
    }

    function getDataToModal(modalId, teacher) {
        var modal = $('#'+modalId);
        var teacherId = teacher;
        var NameBlock = modal.find('[data-name]');
        var DescriptionBlock = modal.find('[data-description]');
        var CertificatesBlock = modal.find('[data-certificates]');

        NameBlock.html(clone[teacherId].name);
        DescriptionBlock.html(clone[teacherId].description);

        for (var i = 0; i < clone[teacherId].certificates.length; i++) {
            CertificatesBlock.append('<div class="col-md-6"><img src="'+ clone[teacherId].certificates[i] +'" alt=""></div>');
        }

        showCloneModal(modal);
    }

    function showCloneModal(modal){
        modal.modal('show');

        modal.on('hidden.bs.modal', function (e) {
            modal.remove();
        });
    }

    function dynamicPrice(block) {
        var today = new Date();
        var blockItems = $(block).children();

        $(blockItems).each(function () {
            console.log(this);
            var dateYear = +($(this).attr('data-year'));
            var dateMonth = +($(this).attr('data-month'));
            var dateDay = +($(this).attr('data-day'));

            if (dateMonth > 0) {
                dateMonth -= 1; // because number of month start from 0
            }
            else {
                dateMonth = 0;
            }

            var endSaleDay = new Date(dateYear, dateMonth, dateDay);

            var startSaleMonth = endSaleDay.getMonth() - 1;
            var startSaleDay = new Date(dateYear, startSaleMonth, dateDay);

            if (today <= endSaleDay && today > startSaleDay) {
                $(this).addClass('actual');
            }
            else if (today > endSaleDay) {
                $(this).addClass('overdue');
                $(this).removeClass('actual');
            }
        })
    }
})();

