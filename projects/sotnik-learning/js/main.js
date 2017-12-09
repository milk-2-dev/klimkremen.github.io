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

jQuery(function($){
    $("#phone").mask("+38(999) 999-9999");
});

var smallBooks = d3.select('#smallBooks'),
    drawing = d3.select('#drawing'),
    book,
    tween,
    delay,
    timeline;

function init() {
    var i, x, y, z,
        tweens = [],
        book,
        delay;

    for (i = 0; i < 20; i += 1) {
        addBook(false);
    }

    for (i = 0; i < 10; i += 1) {
        x = 700 + Math.sin(i) * (200 - i * 15);
        y = 240 + Math.cos(i) * (200 - i * 15);
        z = i * -100;//Math.random() * -200;
        book = addFlippableBook(x, y);
        delay = Math.random() * 5;
        TweenMax.set(book, {css: {x: x, y: y, z: z, rotationY: -45}});

        tween = TweenMax.to(book, 3 + Math.random() * 3, {
            css: {
                y: y + 10 - Math.random() * 20,
                x: x +  10 - Math.random() * 20,
                z: z + 10 - Math.random() * 20,
                rotationX: Math.random() * 100,
                rotationY: -45 + Math.random() * 10},
            delay: delay,
            ease: Quint.EaseInOut,
            yoyo: true,
            repeat: -1});

        tweens.push(tween);

        var k = book.find('.page').length,
            rotation = 5 + Math.random() * 30,
            openSpeed = 2 + Math.random();

        book.find('.page').each(function (i) {
            tween = TweenMax.to($(this), openSpeed, {
                css: {
                    rotationY: -((k - i) * rotation),
                    className: "dark"},
                delay: delay,
                yoyo: true,
                repeat: -1});
            tweens.push(tween);
        });
    }

    timeline = new TimelineMax({tweens: tweens});

    TweenMax.to($('body'), 0.5, {css:{opacity: 1}, delay: 0.5});
}

function addFlippableBook(x, y) {
    var $book = $('<div class="book">');
    //$book.css('webkitTransform', 'translate(' + x + 'px, ' + y + 'px)')

    for (var i = 0; i < 5; i += 1) {
        var $page = $('<div class="page">');
        //$page.css('webkitTransform', 'translateZ(' + i + 'px) translateX(' + i + 'px)');

        if (i == 0 || i == 4) {
            $page.addClass('cover');
        }

        $book.append($page);
    }

    $('#bookContainer').append($book);
    return $book;
}

function addBook(small) {
    var scale = small ? 0.4 : 0.5 + Math.random() - 0.25,
        r1 = Math.random(),
        r2 = Math.random(),
        x = 700 + (r1 * 400) - 200,
        y = 240 + (r2 * 400) - 200;

    smallBooks.append("rect")
        .attr("class", "small-rect")
        .attr("x", -25)
        .attr("y", -35)
        .attr("width", 56)
        .attr('height', 69)
        .attr('transform', 'translate(' + x + ' ' + y + ') scale(' + scale + ')')
        .attr('opacity', .5)
        .attr('fill', '#619EFB')
        .transition()
        .duration(1000 + Math.random() * 500)
        .ease('linear')
        .attr('opacity', '.0')
        .attr('transform', 'translate(' + x + ' ' + y + ') scale(1.0)')
        .each('end', function () {
            this.remove();
            addBook(true);
        });
}

function update() {

}

init();