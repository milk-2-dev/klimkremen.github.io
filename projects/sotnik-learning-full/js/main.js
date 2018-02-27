(function ()
{
    /*
     *  Fields
     */

    var self                  = window.controllerVideo || {};
    window.controllerVideo = self;

    var iframeUrl = 'https://www.youtube.com/embed/go4HTj_8Tnk?rel=0&showinfo=0&autoplay=1;';
    var iframeTag = '<iframe width="560" height="315" src="" frameborder="0"></iframe>';

    /*
     * Properties
     */



    /*
     *  Events
     */
    self.onVideoBlockClick = function(videoBlock){
        $(videoBlock).find('.icon').addClass('d-none');
        $(videoBlock).append(iframeTag);
        $(videoBlock).find('iframe').attr('src', iframeUrl);

    }

    /*
     * Methods
     */

    $('.owl-carousel').owlCarousel({
        loop:true,
        nav:false,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2,
                loop:false
            }
        }
    })


})();
// looking for date
function dynamicPrice(block){
    var today = new Date();
    var blockItems = $(block).children();

    $(blockItems).each(function(){
        var dateYear = +($(this).attr('data-year'));
        var dateMonth = +($(this).attr('data-month'));
        var dateDay = +($(this).attr('data-day'));

        if(dateMonth > 0){
            dateMonth -= 1; // because number of month start from 0
        }
        else{
            dateMonth = 0;
        }

        var endSaleDay = new Date(dateYear, dateMonth, dateDay);

        var startSaleMonth = endSaleDay.getMonth() - 1;
        var startSaleDay = new Date(dateYear, startSaleMonth, dateDay);

        if(today <= endSaleDay && today > startSaleDay){
            $(this).addClass('actual')
        }
        else if(today > endSaleDay){
            $(this).addClass('overdue');
            $(this).removeClass('actual');
        }

    })
}
dynamicPrice('#saleTimer');

