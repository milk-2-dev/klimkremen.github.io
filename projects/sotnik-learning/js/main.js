function animateMobile(){
    var animateAddClass = setInterval(function() {
        $('.header-number i').addClass('tada');
    }, 3000);

    var animateRemoveClass = setInterval(function() {
        $('.header-number i').removeClass('tada');
    }, 6000);

}

animateMobile();

function customCollapse(){
    $('.setting-item__desc a').on('click', function(e){
        if($(this).parent().is('.open')){
            $(this).parent().css('max-height', '80px');
            $(this).parent().removeClass('open');
            $(this).css('top', '55px');
        }
        else{
            var blockHeight = $(this).parent().find('p').outerHeight(true);
            $(this).parent().addClass('open');
            $(this).parent().css('max-height', blockHeight);
            $(this).css('top', blockHeight - 20);
        }
    })
}

customCollapse();

$('.owl-carousel').owlCarousel({
    items:1,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    nav: false,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        }
    }
})


// looking for date
function dynamicPrice(block){
    var today = new Date();
    var blockItems = $(block).children();
    console.log('blockItems '+ blockItems);

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

        //console.log('startSaleDay---------- '+ startSaleDay);

        var startSaleMonth = endSaleDay.getMonth() - 1;
        var startSaleDay = new Date(dateYear, startSaleMonth, dateDay);

        console.log('today--------- '+ today);
        console.log('startSaleMonth--------- '+ startSaleDay);
        console.log('endSaleDay--------- '+ endSaleDay);

        if(today <= endSaleDay && today > startSaleDay){
            $(this).addClass('actual')
        }
        else if(today > endSaleDay){
            $(this).addClass('overdue');
            $(this).removeClass('actual');
        }

        // if(today > startSaleDay && today < endSaleDay){
        //     $(this).addClass('actual')
        // }

    })
}
dynamicPrice('#saleTimer');