$(document).ready(function(){
    $("#myid").click(function(){
     // alert("The paragraph was clicked.");
      getMovies();
    });
});

function getMovies(){
    console.log('hi');
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=f2e258a1dd2e4cbbb895e8b2e1dd2593&language=en-US&page=1')
    .then((response) => {
     // console.log(response);
      let movies = response.data.results;
      let output = '';
      let x='';
      $.each(movies, (index, movie) => {
    
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" style="width:100px; height:100px;">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="movie.html">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    //sessionStorage.setItem('index',index);
    window.location='movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
  
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=f2e258a1dd2e4cbbb895e8b2e1dd2593&language=en-US&page=1&')
      .then((response) => {
        console.log(response);
    
        let movie = response.data;
  
        let output =`
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" style="width:100px; height:100px;" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
            </div>
          </div>
        `;
        
        $('#movie').html(output);
      
        
      })
      .catch((err) => {
        console.log(err);
    });


  var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('feedback/');
  var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData= childSnapshot.val();
        var childFeedback= childSnapshot.val();
    
        var row = tblUsers.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellFeedback = row.insertCell(2);

        cellId.appendChild(document.createTextNode(childKey));
        cellName.appendChild(document.createTextNode(childData.user_name));
        cellFeedback.appendChild(document.createTextNode(childFeedback.user_feedback));
        
        rowIndex = rowIndex + 1;
    });
  });
}  
  function save_user(){
    console.log(index);
    var user_name = document.getElementById('user_name').value;
    var user_feedback = document.getElementById('user_feedback').value;
    var uid = index;
    
    var data = {
        user_id: uid,
        user_name: user_name,
        user_feedback: user_feedback
    }
    
    var updates = {};
    updates['/feedback/' + uid] = data;
    firebase.database().ref().update(updates);
    
    alert('The feedback is noted successfully!');
    reload_page();
  }
  
 

  
  function reload_page(){
   window.location.reload();
  }
  