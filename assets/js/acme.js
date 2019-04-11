$(document).ready(
	function(){

		/*---------- MUSTACHE ----------*/

		var templateColaboradores = $('#template-colaborador').html();
		var templateDetalhes = $('#template-detalhes').html();

		$.getJSON('https://randomuser.me/api/?results=10&nat=br&inc=info,picture,name,email,cell,location', function(data) {
			
			var view = data.results.map((e, i) => { return {colaborador: e, index: i} });

			var htmlColaboradores = Mustache.render(templateColaboradores, view);
			var htmlDetalhes = Mustache.render(templateDetalhes, view);

			$('#colaboradores').html(htmlColaboradores);
			$('body').append(htmlDetalhes);

		});

		/*---------- PESQUISAR ----------*/

		$('#pesquisar').on('click', function() {
			$('#query').focus();
		});

		$('#query').on('input', function() {

			var value = $(this).val();

			$('#pesquisar').off('click');

			if(value.length >= 1) {

				$('#pesquisar').addClass('limpar');

				$('#pesquisar').on('click', function() {

					$('#pesquisar').removeClass('limpar');

					$('#query').val('');
					$('#query').blur();

					$('#pesquisar').off('click');

					$('#pesquisar').on('click', function() {
						$('#query').focus();
					});

				});

			} else {

				$('#pesquisar').removeClass('limpar');

				$('#pesquisar').on('click', function() {
					$('#query').focus();
				});

			}

		});

	}
);

/* exibe e oculta detalhes */

var detalhes = function(id) {
	$(id).toggleClass('oculto');
}