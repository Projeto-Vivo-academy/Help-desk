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
		// //variável para verificar se número de código já existe
		// var Usuario = GetUsuario("Codigo", $("#txtCodigo").val());
		//  //Caso existe é informado ao cliente
		//  if(Usuario != null){
		//  	alert("Código já cadastrado.");
		//  	return;
		//  }
		// caso contrário insere
		var chamado = JSON.stringify({
			Usuario: $("#txtUsuario").val(),
			Senha: $("#txtSenha").val(),
			Tipo_solicitacao: $("#txtTipo_solicitacao").val(),
			Prioridade: $("#txtPrioridade").val(),
			Descricao: $("txtObs").val
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
			Descricao: $("#txtObs").val()
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
			"<th>Prioridade</th>" +
			"	<th>Tipo_solicitacao</th>" +
			"	<th>Descricao</th>"+
			"	<th>Status</th>" +
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
				"	<td>"+Usuario.Descricao+"</td>" + 
				"	<td>" + Usuario.Status + "</td>" +
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
		$("#txtPrioridade").val(cli.usuario);
		 $("#txtTipo_solicitacao").val(cli.Tipo_solicitacao);
		 $("#txtObs").val(cli.Descricao);
		$("#txtCodigo").attr("readonly", "readonly");
		$("#txtUsuario").focus();
	});
	// Ação com base nos eventos do botão Excluir
	$("#tblListar").on("click", ".btnExcluir", function () {
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

});
