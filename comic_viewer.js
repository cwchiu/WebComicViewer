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
    $('.comic-url').attr('href', url).html(url);
    $('input.page-cur').attr('value', current);
    console.log(url);
    
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    
    add_cache(current+1);
    add_cache(current+2);
    add_cache(current+3);
}

function page_next(){
    current += 1;
    current = Math.min(current,comic_totals);
    show_image();
}

add_cache(1);
add_cache(2);
add_cache(3);

$(document).on('ready', function(){
    //pleaseWaitDiv.modal();
     
    Mousetrap.bind('n', page_next);
    
    Mousetrap.bind('p', function(e) {
        current -= 1;
        current = Math.max(current, 1);
        show_image();
    });
    $('.comic').click(page_next);
    $('.btn-go').on('click', function(){
        current = parseInt($('.page-cur').val());
        current = Math.max(0, Math.min(current, comic_totals));
        show_image();
    });
    
    $('.page-total').html( comic_totals );
    $('.comic-title').html( comic_title );
    show_image();
    console.log('ready');
});
