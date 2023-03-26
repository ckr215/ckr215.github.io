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

  $('#coming-soon').flickity({
    cellAlign: 'left',
    pageDots: false,
    contain: true,
    groupCells: true,
    freeScroll: true
  });

  $('#short-films').flickity({
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

  $('.js-carousel-slide').on('click', function(e) {
    $('.js-films-slider').css('pointer-events', 'none');
    $('.flickity-prev-next-button').velocity('transition.fadeOut');
    var id = $(e.target).closest('.js-carousel-slide').attr('data-id');
    populateContent(id);
    $('.js-carousel-slide.is-selected').velocity('transition.slideDownBigOut', {
      stagger: 100, 
      display: 'inline-block', 
      complete: function() {
        $('.js-films-slider').addClass('vis-hidden');
      }
    });
    
    $('.js-film-detail-column').removeClass('vis-hidden').velocity('transition.slideUpBigIn', {stagger: 200, display: 'inline-block'});
  });

  $('.js-film-back').on('click', function() {
    $('.js-films-slider').css('pointer-events', 'all');
    $('.flickity-prev-next-button').velocity('transition.fadeIn');
    $('.js-film-detail-column').velocity('transition.slideDownBigOut', {
      stagger: 200, 
      display: 'inline-block',
      complete: function() {
        $('.js-films-slider').removeClass('vis-hidden');
        $('.js-carousel-slide').velocity('transition.slideUpBigIn', { 
          display: 'inline-block'
        });
      }
    });
  });

  populateContent = function(id) {
    $('.js-film-title').html(films[id].title);
    $('.js-film-date').html(films[id].year);
    $('.js-film-language').html(films[id].language);
    $('.js-film-genre').html(films[id].genre);
    $('.js-film-cast').html(films[id].cast);
    
    $('.js-film-plot').html(films[id].plot);
    $('.js-film-image').attr('src', films[id].poster);

    if(films[id].fullCrew) {
      $('.js-full-crew').show();
      $('.js-full-crew').attr('href', films[id].fullCrew);
    } else {
      $('.js-full-crew').hide();
    }
    

    if(films[id].socialMedia.wiki) {
      $('.js-film-wiki').show();
      $('.js-film-wiki').attr('href', films[id].socialMedia.wiki);
    } else {
      $('.js-film-wiki').hide();
    }

    if(films[id].socialMedia.yt) {
      $('.js-film-yt').show();
      $('.js-film-yt').attr('href', films[id].socialMedia.yt);
    } else {
      $('.js-film-yt').hide();
    }

    if(films[id].socialMedia.facebook) {
      $('.js-film-fb').show();
      $('.js-film-fb').attr('href', films[id].socialMedia.facebook);
    } else {
      $('.js-film-fb').hide();
    }

    if(films[id].socialMedia.twitter) {
      $('.js-film-tweet').show();
      $('.js-film-tweet').attr('href', films[id].socialMedia.twitter);
    } else {
      $('.js-film-tweet').hide();
    }

    if(films[id].socialMedia.instagram) {
      $('.js-film-insta').show();
      $('.js-film-insta').attr('href', films[id].socialMedia.instagram);
    } else {
      $('.js-film-insta').hide();
    }
    
    $('.js-film-crew').html('');
    for (var key in films[id].crew) {
      if(films[id].crew.hasOwnProperty(key)) {
        var tplString = '<div><div class="dib js-film-designation fw7">' + key + ' - </div><div class="dib js-film-person">&nbsp;' + films[id].crew[key] + '</div></div>';
        $('.js-film-crew').append(tplString);
      }
    }
  }

  

});


var films = [
  {
    id: 0,
    title: 'Deva',
    year: '2017',
    language: 'Marathi',
    genre: 'Romance/Drama',
    cast: 'Ankush Chaudhary, Tejaswini Pandit, Spruha Joshi',
    poster: 'images/films/deva.png',
    crew: {
      'Director': 'Murali Nallappa'
    },
    plot: 'An independent young girl occupies a new house and is fascinated by the eccentric character of the house\'s previous occupant. She goes in search of "Deva", who turns out to be an elusive and mysterious person.',
    socialMedia: {
      twitter: 'https://twitter.com/devathefilm',
      instagram: 'https://www.instagram.com/devathefilm/',
      facebook: 'https://www.facebook.com/devathefilm/'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 1,
    title: 'Jomer Raja Dilo Bor',
    year: '2015',
    language: 'Bengali',
    genre: 'Romance/Comedy',
    cast: 'Abir Chatterjee & Payel Sarkar',
    poster: 'images/films/jomer-raja-dilo-bor.png',
    crew: {
      'Director' : 'Abir Sengupta',
      'Producers' : 'Prateek Chakravorty, Anushree Mehta',
      'Music' : 'Anupam Roy',
      'Written By' :  'Abir Sengupta',
      'Cinematography' :  'Pratik Deora'
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Jomer_Raja_Dilo_Bor',
    plot: 'The story is about an author named Ria Bannerjee who is a feminist and she hates men from the core of her heart. She thinks that men only have a body, they don’t have a soul. For obvious reasons she doesn’t want to get married, but destiny makes her meet the ultimate Mr. Right called Deb Das',
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Jomer_Raja_Dilo_Bor',
      yt: 'https://www.youtube.com/watch?v=MdgzeP5cL3I',
      twitter: 'https://twitter.com/jrdbthefilm',
      instagram: 'https://www.instagram.com/jomerrajadilobor/',
      facebook: 'https://www.facebook.com/JRDBTheFilm/'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 2,
    title: 'Tujhya Vin Mar Javaan',
    year: '2015',
    language: 'Marathi',
    genre: 'Romance/Drama',
    cast: 'Vikas Patill , Prarthana Behere, Atul Parchure, Prateeksha Lonkar',
    poster: 'images/films/tujhya.png',
    crew: {
      'Directors' : 'Murali Nallappa, Ashok Karlekar',
      'Producers' : 'Prateek Chakravorthy, Murali Nallappa',
      'Music' : 'Avadhoot Gupte',
      'Written By' :  'Anil Pawar. MuraliNallappa',
      'Dialogues' : 'Shirish Latkar',
      'Cinematography' :  'Bharat R. Parthasarathy'
    },
    fullCrew: 'http://www.justmarathi.com/tujhya-vin-mar-javaan/',
    plot: 'The story revolves around Aniket and Nisha who are intensely in love with each other.',
    socialMedia: {
      yt: 'https://www.youtube.com/watch?v=w4cTbXVchdQ',
      facebook: 'https://www.facebook.com/TVMJFilm/'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 3,
    title: 'From Sydney with love',
    year: '2012',
    language: 'Hindi',
    genre: 'Family/Comedy',
    cast: 'Sharad Malhotra, Bidita Bag, Karan Sagoo and Evelyn Sharma.',
    poster: 'images/films/sydney.png',
    crew: {
      'Director' : 'Prateek Chakravorty',
      'Producer' : 'Prateek Chakravorty',
      'Written By' :  'Prateek Chakravorty',
      'Screenplay' :  'Prateek Chakravorty',
      'Music' : 'Sohail Sen',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/From_Sydney_with_Love',
    plot: 'Under guidance of her caring cousin Kalpana fondly called "Kol", Meghaa slowly embraces her new life in Sydney where she makes new set of friends. Love and romance was something that was strictly not in her agenda. However being young at heart it was just something waiting to happen to her.',
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/From_Sydney_with_Love',
      yt: 'https://www.youtube.com/watch?v=abw7D1xm97M',
      facebook: 'https://www.facebook.com/SydneyLoveFilm'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 4,
    title: 'Barood',
    year: '1998',
    language: 'Hindi',
    genre: 'Action/Drama',
    cast: '	Akshay Kumar, Raveena Tandon, Amrish Puri, Rakhi Gulzar, Mohnish Behl',
    poster: 'images/films/barood.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Written By' :  'Rajeev Kaul, Praful Parekh',
      'Dialogues' :  'Javed Siddiqui',
      'Music' : 'Anand-Milind',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Barood_(1998_film)',
    plot: 'Honest and diligent Police Inspector Jai Sharma suspects Mr. Singhal of being a hardcore criminal don, but is unable to apprehend him due to pressure from his superior officer.',
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Barood_(1998_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 5,
    title: 'Deedar',
    year: '1992',
    language: 'Hindi',
    genre: 'Romance/Drama',
    cast: ' Akshay Kumar, Karishma Kapoor, Anupam Kher, Tanuja',
    poster: 'images/films/deedar.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Written By' :  'Sachin Bhowmick',
      'Dialogues' :  'Mir Muneer',
      'Music' : 'Anand-Milind',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Deedar_(1992_film)',
    plot: "Akshay Kumar and Karishma Kapoor falls in love. In the past Karishma Kapoor's dad backstabs Akshay Kumar's dad and he goes to jail for his crimes. Akshay Kumar plans to take revenge.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Deedar_(1992_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 6,
    title: 'Shatru',
    year: '1986',
    language: 'Hindi',
    genre: 'Action/Drama',
    cast: 'Rajesh Khanna, Shabana Sadique, Prem Chopra, Ashok Kumar, Raj Kiran',
    poster: 'images/films/shatru.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Cinematography' :  'V. K. Murthy',
      'Music' : '	R.D.Burman',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Shatru',
    plot: "Inspector Ashok Sharma is assigned to take over as Inspector In-Charge of a remote police station, which he does. Upon his arrival there, he comes to the rescue of a blind man and a widow..",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Shatru'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 7,
    title: 'Jagir',
    year: '1984',
    language: 'Hindi',
    genre: 'Action/Drama',
    cast: ' Dharmendra, Mithun Chakraborty, Zeenat Aman, Pran, Danny Denzongpa, Shoma Anand and Amrish Puri.',
    poster: 'images/films/jagir.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : '	R.D.Burman',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Jagir_(1984_film)',
    plot: "Jagir is an action film in starring Dharmendra and Mithun Chakraborty in lead roles.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Jagir_(1984_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 8,
    title: 'Nastik',
    year: '1983',
    language: 'Hindi',
    genre: 'Drama',
    cast: '  Amitabh Bachchan, Hema Malini, Pran, Deven Verma, Sarika, Amjad Khan',
    poster: 'images/films/nastik.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Written By': '	Sachin Bhowmick',
      'Music' : 'Kalyanji Anandji',
      'Cinematography' :  'V. K. Murthy',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Nastik_(1983_film)',
    plot: "Shankar, an atheist, finds out from his sister that the enemy who he thought had killed, is actually alive. He decides to finish him off once and for all. Does he succeed in his quest for revenge? Does he finally start to believe in God?",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Nastik_(1983_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 9,
    title: 'Jyoti',
    year: '1983',
    language: 'Hindi',
    genre: 'Family Drama',
    cast: 'Jeetendra, Hema Malini, Ashok Kumar, Shashikala, Om Shivpuri',
    poster: 'images/films/jyoti.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Written By': '	Sachin Bhowmick',
      'Music' : 'Bappi Lahiri',
      'Cinematography' :  'S.R.K. Murthy',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Jyoti_(1981_film)',
    plot: "Niranjan Pratap Singh is the stepson of a Zamindar and real son of Ranimaa Sunanda. Niranjan is misguided by a dancer, Mallika and Amirchand who are after his wealth.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Jyoti_(1981_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 10,
    title: 'Azaad',
    year: '1978',
    language: 'Hindi',
    genre: 'Action/Thriller',
    cast: 'Dharmendra, Hema Malini, Prem Chopra, Keshto Mukherjee',
    poster: 'images/films/azaad.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Written By': '	Sachin Bhowmick',
      'Music' : 'Rahul Dev Burman',
      'Cinematography' :  'V.K. Murthy',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Azaad_(1978_film)',
    plot: "This is the story of an eccentric young man, Ashok who believes in doing good without worrying about the consequences. This does not find any favor with his sister-in-law Sarla, and she decides to leave him.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Azaad_(1978_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 11,
    title: 'Dream Girl',
    year: '1977',
    language: 'Hindi',
    genre: 'Drama',
    cast: 'Hema Malini, Ashok Kumar, Dharmendra and Prem Chopra',
    poster: 'images/films/dream-girl.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Laxmikant-Pyarelal',
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Dream_Girl_(1977_film)',
    plot: "The story revolves around a young woman (Hema Malini), who plays five different characters in the film – Sapna, Padma, Champabai, Dream girl, and Rajkumari, to steal money in order to maintain a home for orphans.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Dream_Girl_(1977_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 12,
    title: 'Warrant',
    year: '1975',
    language: 'Hindi',
    genre: 'Action/Drama',
    cast: 'Dev Anand, Zeenat Aman, Pran, Dara Singh, Ajit Khan, Lalita Pawar and Joginder',
    poster: 'images/films/warrant.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : '	R. D. Burman',
      'Cinematography': 'V. K. Murthy'
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Warrant_(film)',
    plot: "During a jail riot instigated by jailed convict Jaggu (Joginder), the Jailer, Arun Mehra's (Dev Anand) life is threatened, and another convict Dinesh (Satish Kaul), risks his life to save Arun.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Warrant_(film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 13,
    title: 'Jugnu',
    year: '1973',
    language: 'Hindi',
    genre: 'Suspense/Drama',
    cast: 'Dharmendra, Hema Malini, Lalita Pawar, Mehmood, Prem Chopra, Nazir Hussain, Ajit and Pran',
    poster: 'images/films/jugnu.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Sachin Dev Burman',
      'Written By': 'Sachin Bhowmick',
      'Cinematography': 'V. K. Murthy'
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Jugnu',
    plot: "The story is about an extremely intelligent crook with a 'Golden' heart (Dharmendra) who has the remarkable ability to steal from the most protected setups.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Jugnu'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 14,
    title: 'Naya Zamana',
    year: '1971',
    language: 'Hindi',
    genre: 'Romance/Drama',
    cast: 'Dharmendra, Hema Malini, Ashok Kumar, Mehmood, Pran, Lalita Pawar and Aruna Irani',
    poster: 'images/films/naya-zamana.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Sachin Dev Burman',
      'Written By': 'Sachin Bhowmick',
    },
    fullCrew: 'http://www.imdb.com/title/tt0067478/',
    plot: "Anoop (Dharmendra) is a struggling writer. One day he meets with wealthy and beautiful Seema (Hema Malini) and both fall in love.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Naya_Zamana_(1971_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 15,
    title: 'Tumse Achha Kaun Hai',
    year: '1969',
    language: 'Hindi',
    genre: 'Family/Drama',
    cast: 'Shammi Kapoor, Babita Kapoor, Mehmood ',
    poster: 'images/films/tumse.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Shanker Jaikishan',
      'Written By': 'Sachin Bhowmick',
    },
    fullCrew: 'http://www.imdb.com/title/tt0158294/',
    plot: "In order to get medical treatment for his sister, a brother faces challenges when he is hired to subdue three out-of-control heiresses.",
    socialMedia: {
      wiki: 'http://www.imdb.com/title/tt0158294/'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 16,
    title: 'Love in Tokyo',
    year: '1966',
    language: 'Hindi',
    genre: 'Romance/Drama',
    cast: 'Joy Mukherjee, Asha Parekh, Pran, Mehmood, Lalita Pawar, Asit Sen and Madan Puri',
    poster: 'images/films/love-in-tokyo.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Shanker Jaikishan',
      'Written By': 'Sachin Bhowmick',
      'Cinematography': 'V.K. Murthy'
    },
    fullCrew: 'https://en.wikipedia.org/wiki/Love_in_Tokyo',
    plot: "Gayetridevi sends her son, Ashok to get her grandson from Japan. Gayetridevi had an elder son, who married a girl of Japanese origin without her blessings.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Love_in_Tokyo'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 17,
    title: 'Ziddi',
    year: '1964',
    language: 'Hindi',
    genre: 'Romance/Drama',
    cast: 'Joy Mukherjee, Asha Parekh, Mehmood Ali',
    poster: 'images/films/ziddi.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Sachin Dev Burman',
      'Written By': 'Sachin Bhowmick',
      'Cinematography': 'V.K. Murthy'
    },
    fullCrew: 'http://www.imdb.com/title/tt0058772/',
    plot: "On the lookout for employment, Ashok (Joy Mukherji) sees the photographs of beautiful Asha (Asha Parekh), and decides to accept employment as the estate's Manager.",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/Ziddi_(1964_film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 18,
    title: 'Passport',
    year: '1961',
    language: 'Hindi',
    genre: 'Thriller/Drama',
    cast: 'Madhubala, Pradeep Kumar, K.N. Singh',
    poster: 'images/films/passport.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'Anandji Kalyanji',
      'Written By': 'Nabendu Ghosh',
      'Cinematography': 'J.P. Kapadia'
    },
    fullCrew: 'http://www.imdb.com/title/tt0134885/',
    plot: "Bombay City Police suspect that some diamonds are being smuggled through Santa Cruz Airport, they immediately alert Customs Officials, and Airport police who thoroughly check through all ...",
    socialMedia: {
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 19,
    title: '12 o clock',
    year: '1958',
    language: 'Hindi',
    genre: 'Thriller/Drama',
    cast: 'Guru Dutt, Waheeda Rehman, Shashikala',
    poster: 'images/films/12-o-clock.png',
    crew: {
      'Director' : 'Pramod Chakravorty',
      'Producer' : 'Pramod Chakravorty',
      'Music' : 'O.P. Nayyar',
      'Written By': 'Tanveer Farooqi',
      'Cinematography': 'V.K. Murthy'
    },
    fullCrew: 'http://www.imdb.com/title/tt0051335/fullcredits?ref_=tt_ov_st_sm',
    plot: "Bani Chowdhury and solicitor Ajoy Kumar are deeply in love with each other. But their world comes crashing down when Bani's cousin, Maya is found dead in the first class compartment",
    socialMedia: {
      wiki: 'https://en.wikipedia.org/wiki/12_O%27Clock_(film)'
    },
    photos: ['http://flickr.com','http://flickr.com']
  },
  {
    id: 20,
    title: 'Lakshmi',
    year: '2018',
    language: 'Tamil/Telugu',
    genre: 'Dance/Drama',
    cast: 'Prabhu Deva, Aishwarya Rajesh, Ditya Bhande',
    poster: 'images/films/lakshmi.png',
    crew: {
      'Director' : 'AL Vijay',
      'Producer' : 'Prateek Chakravorty, Shruti Nallappa',
      'Music' : 'Sam CS',
      'Written By': 'AL Vijay',
      'Cinematography': 'Nirav Shah'
    },
    fullCrew: '',
    plot: "A dancing legend meets an extraordinary student.",
    socialMedia: {
      wiki: ''
    },
    photos: []
  },

];
