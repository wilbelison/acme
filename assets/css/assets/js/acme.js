$(document).ready(
	function(){

		$('#colaboradores .colaborador').on('click', function() {
			$('#detalhes').removeClass('oculto');
		});
		
		$('#detalhes .voltar').on('click', function() {
			$('#detalhes').addClass('oculto');
		});

	}
);