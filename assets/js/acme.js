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
			filtrar(value);
		});

		var filtrar = function(query) {

			if(query && query.length >= 1) {

				query = removeAcentos(query);

				$('.colaborador').addClass('oculto');

				$('.detalhes').each(function (index, value) {

					var nome = $(this).find('.nome');
						nome = $(nome).html();

					var contatos = $(this).find('.contatos');
						contatos = $(contatos).html();
					
					var dados = $(nome).text() + $(contatos).text();
						dados = dados.replace(/(\r\n|\n|\r)/gm,"");
						dados = dados.replace(/  /g, '');
						dados = removeAcentos(dados);
						dados = dados.replace('telefone', '');
						dados = dados.replace('endereço', '');

					if(dados.search(query) != -1) {
						$('.colaborador_' + index).removeClass('oculto');
					}
					
				});

			} else {

				$('.colaborador').removeClass('oculto');

			}

		}

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
						filtrar();
					});

					filtrar();

				});

			} else {

				$('#pesquisar').removeClass('limpar');

				$('#pesquisar').on('click', function() {
					$('#query').focus();
					filtrar(value);
				});

			}

			filtrar(value);

		});

	}
);

/* exibe e oculta detalhes */

var detalhes = function(id) {
	$(id).toggleClass('oculto');
}

/* removedor de acentos */

function removeAcentos (text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}
