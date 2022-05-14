// aqui vai ficar o javaScript

$(function () {

	var operacao = "A"; //"A"=Adição; "E"=Edição

	var indice_selecionado = -1;  //adiciona o chamado na linha a baixo

	var tbChamados = localStorage.getItem("tbChamados");// Recupera os dados armazenados

	tbChamados = JSON.parse(tbChamados); // Converte string para objeto

	if (tbChamados == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbChamados = [];

	// Função para adicionar registros
	function Adicionar() {
		// 	//variável para verificar se número de código já existe
		// 	var Usuario = GetUsuario("Codigo", $("#txtCodigo").val());
		// 	 //Caso existe é informado ao cliente
		// 	 if(Usuario != null){
		// 	 	alert("Código já cadastrado.");
		// 	 	return;
		//  }

		var chamado = JSON.stringify({
			Usuario: $("#txtUsuario").val(),
			Senha: $("#txtSenha").val(),
			Tipo_solicitacao: $("#txtTipo_solicitacao").val(),
			Prioridade: $("#txtPrioridade").val(),
			Descricao: $("txtDescricao").val()
			// Data: $(".txtdata").val(),
			// Hora: $(".txthora").val(),
			// Codigo: $(".txtCodigo").val()
		});

		tbChamados.push(chamado);

		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));

		alert("Registro adicionado com sucesso!");

		return true;
	}

	// Função para editar chamados
	function Editar() {
		tbChamados[indice_selecionado] = JSON.stringify({
			Usuario: $("#txtUsuario").val(),
			Tipo_solicitacao: $("#txtTipo_solicitacao").val(),
			Prioridade: $("#txtPrioridade").val(),
			Descricao: $("#txtDescricao").val()
			// Data: $("#txtData").val(),
			// Hora: $("#txtHora").val()

		});
		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
		alert("Informações editadas com sucesso")
		operacao = "A";
		return true;
	}
	// Função para listar chamado
	function Listar() {
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>" +
			"	<tr>" +
			"<th></th>" +
			"	<th>Usuario</th>" +
			"   <th>Prioridade</th>" +
			"	<th>Tipo_solicitação</th>" +
			"	<th>Descrição</th>" +
			"	<th>Status</th>" +
			// "   <th>Data</th>" +
			// "   <th>Hora</th>" +
			// " 	<th>Codigo</th>" +
			"	</tr>" +
			"</thead>" +
			"<tbody>" +
			"</tbody>"
		);

		// Malha de repetição para inserir todos os registros
		for (var i in tbChamados) {
			var Usuario = JSON.parse(tbChamados[i]);
			$("#tblListar tbody").append("<tr>" +
				"	<td><img src='img/icons8-edit-calendar-24.png' alt='" + i + "' class='btnEditar'/><img src='img/icons8-delete-30.png' alt='" + i + "' class='btnExcluir'/></td>" +
				"	<td>" + Usuario.Usuario + "</td>" +
				"	<td>" + Usuario.Prioridade + "</td>" +
				"	<td>" + Usuario.Tipo_solicitacao + "</td>" +
				"	<td>" + Usuario.Descricao + "</td>" +
				"	<td>" + Usuario.Status + "</td>" +
				// "	<td>" + Usuario.Data + "</td>" +
				// "	<td>" + Usuario.Hora + "</td>" +
				// " 	<td>" + Usuario.Codigo + "</td>" +
				"</tr>");
		}
	}

	// Função para excluir registros
	function Excluir() {
		tbChamados.splice(indice_selecionado, 1);
		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
		alert("Registro excluído com sucesso!");
	}

	// função para pesquisar Usuário
	function GetUsuario(propriedade, valor) {
		var Usuario = null;
		for (var item in tbChamados) {
			var i = JSON.parse(tbChamados[item]);
			if (i[propriedade] == valor)
				Usuario = i;
		}
		return Usuario;
	}
	// chamada da função listar Usuários
	Listar();

	// //código automatico

	// var ultimo = JSON.parse(tbChamados.slice(-1));
	// var ultimo = parseInt(ultimo.Codigo);

	// $("#txtCodigo").val(ultconv + 1);

	// //Função status

	// $("#txtUsuario").change(function () {
	// 	var Usuario = $(this).val();

	// })


	// Ação com base nos eventos de formulário
	$("#frmCadastro").on("submit", function () {
		if (operacao == "A")
			return Adicionar();
		else
			return Editar();
	});
	// Ação com base nos eventos do botão Editar
	$("#tblListar").on("click", ".btnEditar", function () {
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbChamados[indice_selecionado]);
		$("#txtUsuario").val(cli.usuario);
		$("#txtPrioridade").val(cli.Prioridade);
		$("#txtTipo_solicitacao").val(cli.Tipo_solicitacao);
		$("#txtDescricao").val(cli.Descricao);
		// $("#txtData").val(cli.Data);
		// $("#txtHora").val(cli.Hora);
		$("#txtCodigo").attr("readonly", "readonly");
		$("#txtUsuario").focus();
	});

	// Ação com base nos eventos do botão Excluir

	$("#tblListar").on("click", ".btnExcluir", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

	// function JSClock() {
	// 	var tempo = new Date();
	// 	var hora = tempo.getHours();
	// 	var minuto = tempo.getMinutes();
	// 	var segundo = tempo.getSeconds();
	// 	var temp = "" + ((hora > 12) ? hora - 12 : hora);
	// 	if (hora == 0)
	// 	  temp = "12";
	// 	temp += ((minuto < 10) ? ":0" : ":") + minuto;
	// 	temp += ((segundo < 10) ? ":0" : ":") + segundo;
	// 	temp += (hora >= 12) ? " P.M." : " A.M.";
	// 	return temp;
	//   }

	// Obtém a data/hora atual
	// var data = new Date();

	// // Guarda cada pedaço em uma variável
	// var dia     = data.getDate();           // 1-31
	// var dia_sem = data.getDay();            // 0-6 (zero=domingo)
	// var mes     = data.getMonth();          // 0-11 (zero=janeiro)
	// var ano2    = data.getYear();           // 2 dígitos
	// var ano4    = data.getFullYear();       // 4 dígitos
	// var hora    = data.getHours();          // 0-23
	// var min     = data.getMinutes();        // 0-59
	// var seg     = data.getSeconds();        // 0-59
	// var mseg    = data.getMilliseconds();   // 0-999
	// var tz      = data.getTimezoneOffset(); // em minutos

	// if(dia<10) {
	// 	dia = '0'+ (dia);
	// } 

	// if(mes<10) {
	// 	mes =  '0' + (mes + 1);
	// } 

	// // Formata a data e a hora (note o mês + 1)
	// var str_data = dia + '/' + (mes+1) + '/' + ano4; // Brasil
	// var str_data_Brazil = ano4 + '-' + (mes) + '-' + dia; // europeu
	// //var str_hora = hora + ':' + min + ':' + seg;

	// // Mostra o resultado
	// //alert('Hoje é ' + str_data + ' às ' + str_hora);
	// $("#txtDtCad").val(str_data_Brazil);
	// alert( str_data_Brazil);



});