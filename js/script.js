'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const adv = document.querySelectorAll('.promo__adv img'),
      content = document.querySelector('.promo__content'),
      genre = content.querySelector('.promo__genre'),
      poster = content.querySelector('.promo__bg'),
      movieList = content.querySelector('.promo__interactive-list'),
      addForm = content.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      addCheck = addForm.querySelector('[type="checkbox"]');

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    addForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        let newFilm = addInput.value;
        const favorite = addCheck.checked;

        if (newFilm && newFilm.length <= 21) {
           movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, movieList); 
        } else {
            newFilm = `${newFilm.substring(0, 22)}...`
            movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, movieList);
        }

        if (favorite) {
            console.log('Добавляем любимый фильм!');
        }

        addForm.reset()
    });


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    }

    const makeChanges = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage = 'url(../img/bg.jpg)';  
    }

    function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.sort().forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i + 1}. ${item}
            <div class="delete"></div>
            </li>`;
        });

        content.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            })
        });
    };

    makeChanges();
    deleteAdv(adv);
    createMovieList(movieDB.movies, movieList);

})