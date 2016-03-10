var comic_totals = comic_images.length;
var cache_image = {};
//var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');

function add_cache(pn){
    pn = Math.max(0, Math.min(comic_totals, pn));

    if( pn in cache_image){
        console.log( pn + " already cached");
        return;
    }
    cache_image[ pn ] = $( '<img />' ).attr( 'src', comic_images[ pn-1 ])
}

function show_image(){
    var url = comic_images[current-1];
    $('img.comic').attr('src', url);
    
    add_cache(current+1);
    add_cache(current+2);
    add_cache(current+3);
}

add_cache(1);
add_cache(2);
add_cache(3);

$(document).on('ready', function(){
    $(window).paged_scroll({
        handleScroll:function (page,container,doneCallback) {
            var img_url = comic_images[page];
            var tip = page + '/' + comic_totals;
            var html = '<a href="#" rel="tooltip" title="'+tip+'"><img class="comic img-responsive center-block" src="'+img_url+'" /></a>';
            $('.image-container').append(html);
            add_cache(page+1);
            add_cache(page+2);
            add_cache(page+3);
        },
        startPage: 1,
        triggerFromBottom:'10px',
        targetElement : $('.image-container'),
        loader:'<div class="loader">Loading next page ...</div>',
        pagesToScroll: comic_totals,
    });

    $('.page-total').html( comic_totals );
    $('.comic-title').html( comic_title );
    show_image();
    console.log('ready');
});