

$('#search-button').on('click', function() {

	getResult()
	
});

$('#search-input').on('keyup', function(e) {
	if (e.keyCode === 13){
		getResult()
	}
});

$('#movie-list').on('click','.see-details', function(e) {
$('.modal-body').html('');
$('#loading-detail').html(`
	<div class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
		</div>
	</div>
`);

	$.ajax({
		url : 'https://omdbapi.com',
		type : 'get',
		dataType : 'json',
		data : {
			'apikey': '91f17062',
			'i': $(this).data('id')
		},
		success: function (result) {
			if (result.Response === "True"){
				$('#loading-detail').html('');
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
							<img src="`+ result.Poster +`" class="img-fluid mb-3" onError="this.onerror=null;this.src='error.jpg';">
							</div>
							<div class="col-md-8">
								<ul class="list-group">
									<li class="list-group-item"><h4>`+ result.Title +`<h4></li>
								</ul>
								<ul class="list-group">
									<li class="list-group-item"><b>Release Date:</b> `+ result.Released +`</li>
								</ul>
								<ul class="list-group">
									<li class="list-group-item"><b>Genre:</b> `+ result.Genre +`</li>
								</ul>
								<ul class="list-group">
									<li class="list-group-item"><b>Country:</b> `+ result.Country +`</li>
								</ul>
								<ul class="list-group">
									<li class="list-group-item"><b>Director:</b> `+ result.Director +`</li>
								</ul>
								<ul class="list-group">
									<li class="list-group-item"><b>Plot:</b> `+ result.Plot +`</li>
								</ul>
							</div>
						</div>
					</div>
					`)
			}
		}
	})
});

function getResult(){
	$('#movie-list').html('')

	$('#loading').html(`
					<div class="row mb-5" id="covid-box">
						<div class="col-md-12">
							<div class="d-flex justify-content-center">
								<div class="spinner-grow text-success" role="status">
									<span class="sr-only">Loading...</span>
								</div>
								<div class="spinner-grow text-danger" role="status">
									<span class="sr-only">Loading...</span>
								</div>
								<div class="spinner-grow text-warning" role="status">
									<span class="sr-only">Loading...</span>
								</div>
							</div>
						</div>
						<div class="col-md-12 justify-content-center">
							<p class="text-center pt-3"><strong>Loading result...</strong></p>
						</div>
					</div>
				`)

	$.ajax({
		url : 'https://omdbapi.com',
		type : 'get',
		dataType : 'json',
		data : {
			'apikey': '91f17062',
			's': $('#search-input').val()
		},
		success: function (result) {
			console.log(result);
			if (result.Response == "True") {

				$('#movie-total').html(`
					<p><strong>Total result</strong> : `+ result.totalResults +` movie<br><small><i>*) Only showing max 10 movie list in a row.</i></small></p>
				`)

				let movies = result.Search;

				$.each(movies, function(i , data){
					$('#loading').html('');
					$('#movie-list').append(`
						<div class="col-sm-6 col-md-6 col-lg-3">
						<div class="card mb-3 justify-content-center">
						<img src="`+ data.Poster +`" class="bd-placeholder-img card-img-top img-fluid miniimg" width="100%" height="225" alt="poster" onError="this.onerror=null;this.src='error.jpg';">
						<div class="card-body d-flex flex-column">
						<h5 class="card-title">` + data.Title + `</h5>
						<h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
							
						<a href="#" class="btn btn-dark btn-block align-self-end see-details mt-auto" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See details.</a>
						</div>
						</div>
						</div>
						`)
				})

			}else{
				$('#movie-total').html('');
				$('#loading').html('');
				$('#loading-detail').html('');
				$('#movie-list').html(`
					<div class="col-md-12">
					<h1 class="text-center">`+ result.Error +`<h1>
					</div>
					`)
			}
		}
	});
}
