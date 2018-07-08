$(document).ready(() => {
   $('li').on('click', function (item) {

      // $(this).css('box-shadow', '1px 1px 8px #391439')
      $(this).animate({
         'box-shadow': '1px 1px 8px #391439'
      },2000)
   })
})

