"use strict";

movies.splice(40);

// ============= NORMLIZE MOVIES ==========////

const allMovies = movies.map((e) => {
  return {
    title: e.title,
    year: e.year,
    category: e.categories,
    id: e.imdbId,
    rating: e.imdbRating,
    time: `${Math.trunc(e.runtime / 60)} soat ${e.runtime % 60} daqiqa`,
    lang: e.language,
    yotube: `https://www.youtube.com/embed/${e.youtubeId}`,
    summary: e.summary,
    smallImg: e.smallThumbnail,
    largeImg: e.bigThumbnail,
  };
});



// ============= NORMLIZE MOVIES END ==========////
// EXTRA PLUGINS//

(function () {
  const date = new Date();
  const time = `${date.getFullYear()}`;
  $("#copyright").innerHTML = time;
})();


// ============ ====== ====== ======  RENDER FUNCTION====== ====== ====== ====== ====== ====


function renderAllMovies(){
  allMovies.forEach((e,i,a) => {
    const card = createElement('div','card shadow',`
    
    <img src="${e.smallImg}" alt="rasm" class="card-img">
    <di class="card-body">
      <h5 class="card-title">${e.title}</h5>
      <ul>
        <li><strong>Year: </strong>${e.year}</li>
        <li><strong>Category: </strong>${e.category}</li>
        <li><strong>Rating: </strong>${e.rating}</li>
      </ul>
     <div class="d-flex gap-1">
     <a href="${e.yotube}" target="_blank" class="btn btn-danger">Youtobe</a>
     <button data-id=${e.id} class="btn btn-primary read">read more</button>
     <span data-bookmark=${e.id} class="bookmark bookmarkt"><i  data-bookmark=${e.id} class="bi bi-bookmark-heart"></i></span>
     </div>
    </div>
    `);
    card.dataset.moieId=e.id;
    $(".wrapper-films").appendChild(card);
  });
}
// ========> BOOOKMARK FUNCTION <=======//
const bookmark=[];
 
const addBookmark=function(id){
  $(".bookmarks").innerHTML="";
  const el = allMovies.filter((e)=>{
    return e.id === id;
  })
   if(!bookmark.includes(el[0])){
    bookmark.push(el[0]);  
   }
   else{
    alert("Avval qo'shilgan");
   }
 

   if(bookmark.length>0){
    bookmark.forEach((e)=>{
      const item = createElement('div','card mb-2',`
      <div class="p-3 d-flex">
      <img src="${e.smallImg}" width="100" height="100" class="rounded-1">
      <div class="ms-3">
      <h5 class="">${e.title}</h5>
        <div class="d-flex mt-3 gap-2 align-items-center">
        <a class="btn btn-primary align-self-end" href="${e.yotube}">Watch</a>
        <span class="delete"> <i class="bi bi-trash3-fill"></i></span>  
        </div>
      </div>
      </div>
      `)
      $(".bookmarks").appendChild(item);
    })
   }
}








// ========> BOOOKMARK FUNCTION <=======//


  // CLICK FUNCTION //
  const click=function(){
    $$(".read").forEach((e)=>{
      e.addEventListener('click',(e)=>{
        $(".box").innerHTML="";
        $('.modal-contents').classList.remove('d-none');
        modalWindow(e.target.getAttribute('data-id'));
      })
    })

    $$(".bookmark").forEach((e)=>{
      e.addEventListener("click",(element)=>{
        addBookmark(element.target.getAttribute('data-bookmark'));
      })
    })

   
    
    
  }

  // CLICK FUNCTION END//


renderAllMovies();

// ============ ====== ====== ======  RENDER FUNCTION END====== ====== ====== ====== ====== ====

// ============ ====== ====== ====== DYNAMIC CATEGORIES ====== ====== ====== ====== ====== ====

function dynamicCategory(){
  let category = [];
  allMovies.forEach((e,i,a)=>{
    e.category.forEach((e)=>{
      if(!category.includes(e)){
        category.push(e);
      };
    });
  });

  category.sort();

  category.forEach((e)=>{
    const option = createElement("option","item-c",e)
    $("#category_sort").appendChild(option);
  })
};

dynamicCategory();

// ============ ====== ====== ====== DYNAMIC CATEGORIES end ====== ====== ====== ====== ====== ====

// ============ ====== ====== ====== FIND FILMS START ====== ====== ====== ====== ====== ====//

const findFilm = (str,rat,ctg) =>{

  return allMovies.filter((e)=>{
    return e.title.match(str) && e.rating >= rat && e.category.includes(ctg);
  })
}

$(".btn-success").addEventListener('click',()=>{
  $(".wrapper-films").innerHTML=`"<span class="loader"></span>"`;
  const searchValue = $("#film_name").value.toLowerCase().trim();
  const ratingFilm= $("#rating").value;
  const categorySort=$("#category_sort").value;

  const searchText = new RegExp(searchValue, "gi");

  const searchResult = findFilm(searchText,ratingFilm,categorySort);

  setTimeout(()=>{
    $(".wrapper-films").innerHTML="";
    RenderSearchResult(searchResult);
    $('.result').innerHTML=`<h2 class="text-danger">${searchResult.length} ta ma'lumot topildi</h2>`;
   },3000);
})

 // ============ ====== ====== ====== FIND FILMS END ====== ====== ====== ====== ====== ====//


function RenderSearchResult(data=[]){
  data.forEach((e)=>{
    const card = createElement('div','card shadow',`
    
    <img src="${e.smallImg}" alt="rasm" class="card-img">
    <div class="card-body">
      <h5 class="card-title">${e.title}</h5>
      <ul>
        <li><strong>Year: </strong>${e.year}</li>
        <li><strong>Category: </strong>${e.category}</li>
        <li><strong>Rating: </strong>${e.rating}</li>
      </ul>
    
      <div class="d-flex gap-1">
     <a href="${e.yotube}" target="_blank" class="btn btn-danger">Youtobe</a>
     <button data-id=${e.id} class="btn btn-primary read">read more</button>
     <span data-bookmark=${e.id} class="bookmark bookmarkt"><i  data-bookmark=${e.id} class="bi bi-bookmark-heart"></i></span>
     </div>
      
    </div>
    `);
    $(".wrapper-films").appendChild(card);
  })

click();
}


//  ---------------------- MODAL WINDOW --------------------------
 

// ------- close btn -----

$('#close').addEventListener('click', ()=>{
  $('.modal-contents').classList.add('d-none');
})


function modalWindow(id){
  const filmItem = allMovies.filter((e)=>{
    return e.id==id;
  })
    const data=filmItem[0]; 
    const contents = createElement('div','content-film p-4',`
    
    <img src="${data.smallImg}" alt="rasm" class="card-imgs card-img mb-3">
    <h3 class="ms-3">${data.title}</h3>
    <p>${data.summary}</p>
     <div class="ms-3"><strong>Time: </strong>${data.time}</div>
     <div class="ms-3"><strong>Lang: </strong>${data.lang}</div>

    `) 
    $(".box").appendChild(contents);
  console.log(filmItem);
}

click();


  $(".modal-contents").addEventListener("click",(e)=>{
    $('.modal-content').classList.add('face');
    setTimeout(()=>{
    $('.modal-content').classList.remove('face');
    },1000)
  })
 



