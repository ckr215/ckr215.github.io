document.addEventListener("DOMContentLoaded", function() {

  $('.intro').velocity('transition.slideUpBigIn', {
    stagger: 100, 
    complete: function() { 
      $('.fade-link').velocity('transition.fadeIn', {stagger: 500});
    } 
  });

  
  var sticky = new Waypoint.Sticky({
    element: $('#nav'),
    wrapper: '<div class="sticky-wrapper waypoint" />'
  });

  var ourHighlight = new Waypoint({
    element: $('#our'),
    offset: 2,
    handler: function() {
      $('#nav a').removeClass('current');
      $('#nav .our-link').addClass('current');
    }
  });

  var filmsHighlight = new Waypoint({
    element: $('#films-section'),
    offset: 2,
    handler: function() {
      $('#nav a').removeClass('current');
      $('#nav .films-link').addClass('current');
    }
  });

  var speakHighlight = new Waypoint({
    element: $('#speak'),
    offset: 'bottom-in-view',
    handler: function() {
      $('#nav a').removeClass('current');
      $('#nav .speak-link').addClass('current');
    }
  });

  var PrevNextButton = Flickity.PrevNextButton;
    PrevNextButton.prototype.update = function() {
      // index of first or last cell, if previous or next
      var cells = this.parent.cells;
      // enable is wrapAround and at least 2 cells
      if ( this.parent.options.wrapAround && cells.length > 1 ) {
        this.enable();
        return;
      }
      var lastIndex = cells.length ? cells.length - 1 : 0;
      var boundIndex = this.isPrevious ? 0 : lastIndex;
      var isEnabling;
      if ( this.parent.options.contain ) {
        var boundCell = cells[ boundIndex ];
        var selectedCell = cells[ this.parent.selectedIndex ];
        isEnabling = selectedCell.target != boundCell.target;
      } else {
        isEnabling = this.parent.selectedIndex == boundIndex
      }
      var method = isEnabling ? 'enable' : 'disable';
      this[ method ]();
    };

  $('#films').flickity({
    cellAlign: 'left',
    pageDots: false,
    contain: true,
    groupCells: true,
    freeScroll: true
  });

  $('.js-pramod-pic').on('click', function() {
    $('.js-pramod-desig, .js-prateek-bio').velocity({opacity:0}).css('pointer-events','none');  
    $('.js-pramod-pic').velocity({'left':'-20%'});
    $('.js-pramod-pic').css('pointer-events','none');
    $('.js-pramod-pic .frame, .js-pramod-pic .mask').addClass('vis-hidden');
    $('.js-pramod-detail').removeClass('vis-hidden').velocity('transition.slideUpBigIn');
  });

  $('.js-pramod-close').on('click', function() {
    $('.js-pramod-detail').velocity('transition.slideDownBigOut', function(){
      $('.js-pramod-detail').addClass('vis-hidden');
    });
    $('.js-pramod-desig, .js-prateek-bio').velocity({opacity:1}).css('pointer-events','all');
    $('.js-pramod-pic .frame, .js-pramod-pic .mask').removeClass('vis-hidden'); 
    $('.js-pramod-pic').css('pointer-events','all');
    $('.js-pramod-pic').velocity({'left':'0%'});
  });


  $('.js-prateek-pic').on('click', function() {
    $('.js-prateek-desig, .js-pramod-bio').velocity({opacity:0}).css('pointer-events','none');  
    $('.js-prateek-pic').velocity({'right':'-20%'});
    $('.js-prateek-pic').css('pointer-events','none');
    $('.js-prateek-pic .frame, .js-prateek-pic .mask').addClass('vis-hidden');
    $('.js-prateek-detail').removeClass('vis-hidden').velocity('transition.slideUpBigIn');
  });

  $('.js-prateek-close').on('click', function() {
    $('.js-prateek-detail').velocity('transition.slideDownBigOut', function(){
      $('.js-prateek-detail').addClass('vis-hidden');
    });
    $('.js-prateek-desig, .js-pramod-bio').css('pointer-events','all').velocity({opacity:1});
    $('.js-prateek-pic .frame, .js-prateek-pic .mask').removeClass('vis-hidden'); 
    $('.js-prateek-pic').css('pointer-events','all');
    $('.js-prateek-pic').velocity({'right':'0%'});
  });

  $('.our-link').on('click', function(e) {
    e.preventDefault();
    $('#our').velocity('scroll');
  });

  $('.films-link').on('click', function(e) {
    e.preventDefault();
    $('#films-section').velocity('scroll');
  });

  $('.speak-link').on('click', function(e) {
    e.preventDefault();
    $('#speak').velocity('scroll');
  });

  $('.home-link').on('click', function(e) {
    e.preventDefault();
    $('#home').velocity('scroll');
  });

});