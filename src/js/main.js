jQuery(function ($) {

    $('.selers-products').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: false, //установить собственную ширину 
        //centerMode: true, //фокус анимации идет на центр
        //centerPadding: 'px',
        draggable: true
    })


    var $carousel = $('.selers-products');
    $(document).on('keydown', function (e) {
        if (e.keyCode == 37) { //37 код кнопки
            $carousel.slick('slickPrev');
        }
        if (e.keyCode == 39) { // 39 код кнопки
            $carousel.slick('slickNext');
        }
    });

});


$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true, //Зацикливаем слайдер
        items: 5,
        nav: true, //Отключение навигации
        navText: ['<i class="fa fa-angle-left fa-5x" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right fa-5x" aria-hidden="true"></i>'
        ],
        autoplay: false, //Автозапуск слайдера
        autoplayHoverPause: false,
        smartSpeed: 2000, //Время движения слайда
        autoplayTimeout: 8000, //Время смены слайда
        responsive: { //Адаптивность. Кол-во выводимых элементов при определенной ширине.
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});

//Accordion menu 
$(document).ready(function () {
    $('#cssmenu li.has-sub > a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });

    $('#cssmenu>ul>li.has-sub>a').append('<span class="holder"></span>');
});


// checkbox
function toggleCheckbox() {
    let checkbox = document.querySelectorAll('.filter-check_checkbox');
    checkbox.forEach((e) => {
        e.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
                console.log('gal');
                
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}


//корзина
function toggleCart() {
    let btnCart = document.getElementById('cart');
    let modalCart = document.querySelector(".cart");
    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    let closeBtn = document.querySelector(".cart-close");
    closeBtn.addEventListener("click", () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}

function activeFilter() {
    let btnActiveFilter = document.querySelector(".btn-filter-active");
    let asideFilter = document.querySelector("aside");
    btnActiveFilter.addEventListener('click', () => {
        asideFilter.style.display = 'block';
        btnActiveFilter.textContent = 'Скрыть';

        let btnHideFilter = document.querySelector(".btn-hide");
        btnHideFilter.addEventListener('click', () => {
            asideFilter.style.display = 'none';
            btnHideFilter.textContent = 'Фильтр и сортировки';
            activeFilter();
        });
    });
    
}


//добавление и удаление товара в корзину
function addCart(params) {
    let products = document.querySelectorAll('main .product');
    let cartWrapper = document.querySelector('.cart-wrapper');
    let productEmpty = document.getElementById('cart-empty');
    let countGoods = document.querySelector('.jqcart-total-cnt');
    let cardPrice = document.querySelectorAll('.card-price');

    products.forEach((product) => {
        let btn = product.querySelector('.button_buy-now');
        btn.addEventListener('click', () => {
            let productClone = product.cloneNode(true);
            cartWrapper.appendChild(productClone);
            productEmpty.remove();
            showData();

            let removeBtn = productClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                productClone.remove();
                showData();
            });
        });
//отображение количество товаров в корзине
        function showData() {
            let productsCart = cartWrapper.querySelectorAll('.product');
            countGoods.textContent = productsCart.length;
            let cardPrice = cartWrapper.querySelectorAll('.product-price');
            let cardTotal = document.querySelector('.cart-total span');
            let sum = 0;
            cardPrice.forEach((cardsPrice) => {
                price = parseFloat(cardsPrice.textContent);
                sum += price;
            });

            cardTotal.textContent = sum;
            if (productsCart.length !== 0) {
                productEmpty.remove();
            }
            else {
                cartWrapper.appendChild(productEmpty);
            }
        }
    });
}




// фильтр акции
function actionPage() {
    let products = document.querySelectorAll('main .product');
    let freeshippingCheckbox = document.getElementById('freeshipping-checkbox');
    let appleCheckbox = document.getElementById('apple');
    let min = document.getElementById('min');
    let max = document.getElementById('max');
    let goods = document.querySelector('main');
    let search = document.querySelector('.search-wrapper_input');
    let searchBtn = document.querySelector('.search-btn');

/*
    function allcheckCheckbox() {
        products.forEach((card) => {
            if (freeshippingCheckbox.checked || appleCheckbox.checked) {
                console.log(true);
                if (!card.getAttribute('data-free') || !card.getAttribute('data-apple')) {
                    card.style.display = 'none';
                }
                else {
                    card.style.display = 'block';
                }
            }
        });
    };

    freeshippingCheckbox.addEventListener('change', allcheckCheckbox);
    appleCheckbox.addEventListener('change', allcheckCheckbox);
    */

    freeshippingCheckbox.addEventListener('click', () => {
        products.forEach((card) => {
            if (freeshippingCheckbox.checked) {
                //console.log(true);
                if (!card.getAttribute('data-free')) {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = '';
            }
        });
    });

    appleCheckbox.addEventListener('click', () => {
        products.forEach((card) => {
            if (appleCheckbox.checked) {
                console.log(true);
                if (!card.getAttribute('data-apple')) {
                    card.style.display = 'none';
                }
            } else {
                card.style.display = '';
            }
        });
    });

    
    function filterPrice() {
        products.forEach((card) => {
            const cardPrice = card.querySelector('.product-price');
            const price = parseFloat(cardPrice.textContent);
            //console.log(price);
            //console.log(max.value);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                //card.parentNode.remove();
                card.style.display = 'none';
            } else {
                //goods.appendChild(card.parentNode);
                card.style.display = '';
            }
        });
    }

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);
    
    //поиск по товарам
    function searchProducts() {
        const searchText = new RegExp(search.value.trim(), 'i');
        products.forEach((card) => {
            const title = card.querySelector('.product-title');
            if (!searchText.test(title.textContent)) {
                //card.parentNode.style.display = 'none';
                card.style.display = 'none';
            } else {
                //card.parentNode.style.display = '';
                card.style.display = '';
            }
        });
    };

    search.addEventListener('change', searchProducts);
    searchBtn.addEventListener('click', searchProducts);

}
// end фильтр акции



/**
 * Buzina Pagination http://github.com/mikebrsv/buzina-pagination
 * Author: Mikhail Borisov http://github.com/mikebrsv
 * License: https://github.com/mikebrsv/buzina-pagination/blob/master/LICENSE
 */

(function($){$.fn.buzinaPagination=function(options){var settings=$.extend({prevnext:!0,prevText:"Назад",nextText:"Вперед",itemsOnPage:1},options);var buzinaContent=$(this);var pagesTotal=buzinaContent.children().length;var buzinaContentId=buzinaContent.attr("id");var pageClass=buzinaContentId+"--page-";var pagerId=buzinaContentId+"--pager";for(i=0;i<pagesTotal;i++){$("#"+buzinaContentId+"> div").slice(i,i+settings.itemsOnPage).wrapAll("<div></div>");buzinaContent.children(":eq("+i+")").addClass(pageClass+(i+1)+" content-page")}
pagesTotal=buzinaContent.children().length;buzinaContent.children(":first").addClass("content-page-active");var pagerDom=createPagerDom(pagesTotal,pagerId,settings);buzinaContent.after(pagerDom);$("#"+pagerId+" a").click(function(e){e.preventDefault();var pageClicked=this.text;if(pageClicked==settings.prevText){var currentActive=$(".content-page-active").attr("class");var currentActiveNumber=currentActive.substring(currentActive.indexOf("--page")+7,currentActive.indexOf(" "));if(currentActiveNumber>1){$(".content-page").removeClass("content-page-active");$("."+pageClass+(parseInt(currentActiveNumber)-1)).addClass("content-page-active")}}else if(pageClicked==settings.nextText){var currentActive=$(".content-page-active").attr("class");var currentActiveNumber=currentActive.substring(currentActive.indexOf("--page")+7,currentActive.indexOf(" "));if(currentActiveNumber<pagesTotal){$(".content-page").removeClass("content-page-active");$("."+pageClass+(parseInt(currentActiveNumber)+1)).addClass("content-page-active")}}else{$(".content-page").removeClass("content-page-active");$("."+pageClass+pageClicked).addClass("content-page-active")}})}})(jQuery);function createPagerDom(pagesTotal,pagerId,settings){var pagerConc="";for(i=0;i<pagesTotal;i++){pagerConc+=`
      <li class="page-item">
        <a class="page-link" href="#">${i + 1}</a>
      </li>`}
if(settings.prevnext){var prevDom=`
    <li class="page-item">
      <a class="page-link" href="#">${settings.prevText}</a>
    </li>`;var nextDom=`
    <li class="page-item">
      <a class="page-link" href="#">${settings.nextText}</a>
    </li>
    `;pagerConc=prevDom+pagerConc+nextDom}
return `
    <nav id="${pagerId}">
      <ul class="pagination">        
        ${pagerConc}        
      </ul>
    </nav>`
  }


  (function($){$.fn.buzinaPagination=function(options){var settings=$.extend({prevnext:!0,prevText:"Назад",nextText:"Вперед",itemsOnPage:1},options);var buzinaContent=$(this);var pagesTotal=buzinaContent.children().length;var buzinaContentId=buzinaContent.attr("id");var pageClass=buzinaContentId+"--page-";var pagerId=buzinaContentId+"--pager";for(i=0;i<pagesTotal;i++){$("#"+buzinaContentId+"> div").slice(i,i+settings.itemsOnPage).wrapAll("<div></div>");buzinaContent.children(":eq("+i+")").addClass(pageClass+(i+1)+" content-page")}
pagesTotal=buzinaContent.children().length;buzinaContent.children(":first").addClass("content-page-active");var pagerDom=createPagerDom(pagesTotal,pagerId,settings);buzinaContent.after(pagerDom);$("#"+pagerId+" a").click(function(e){e.preventDefault();var pageClicked=this.text;if(pageClicked==settings.prevText){var currentActive=$(".content-page-active").attr("class");var currentActiveNumber=currentActive.substring(currentActive.indexOf("--page")+7,currentActive.indexOf(" "));if(currentActiveNumber>1){$(".content-page").removeClass("content-page-active");$("."+pageClass+(parseInt(currentActiveNumber)-1)).addClass("content-page-active")}}else if(pageClicked==settings.nextText){var currentActive=$(".content-page-active").attr("class");var currentActiveNumber=currentActive.substring(currentActive.indexOf("--page")+7,currentActive.indexOf(" "));if(currentActiveNumber<pagesTotal){$(".content-page").removeClass("content-page-active");$("."+pageClass+(parseInt(currentActiveNumber)+1)).addClass("content-page-active")}}else{$(".content-page").removeClass("content-page-active");$("."+pageClass+pageClicked).addClass("content-page-active")}})}})(jQuery);function createPagerDom(pagesTotal,pagerId,settings){var pagerConc="";for(i=0;i<pagesTotal;i++){pagerConc+=`
      <li class="page-item">
        <a class="page-link" href="#">${i + 1}</a>
      </li>`}
if(settings.prevnext){var prevDom=`
    <li class="page-item">
      <a class="page-link" href="#">${settings.prevText}</a>
    </li>`;var nextDom=`
    <li class="page-item">
      <a class="page-link" href="#">${settings.nextText}</a>
    </li>
    `;pagerConc=prevDom+pagerConc+nextDom}
return `
    <nav id="${pagerId}">
      <ul class="pagination">        
        ${pagerConc}        
      </ul>
    </nav>`
  }



toggleCheckbox();
toggleCart();
addCart();
actionPage();
activeFilter();








