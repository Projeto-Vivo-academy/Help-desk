// aqui vai ficar o javaScript

$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição
	
	var indice_selecionado = -1;  //adiciona o chamado na linha a baixo
	
	var tbChamados = localStorage.getItem("tbChamados");// Recupera os dados armazenados

	tbChamados = JSON.parse(tbChamados); // Converte string para objeto

	if(tbChamados == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbChamados = [];

	// Função para adicionar registros
	function Adicionar(){
		//variável para verificar se número de código já existe
		var Usuario = GetUsuario("Codigo", $("#txtCodigo").val());
		// Caso existe é informado ao cliente
		if(Usuario != null){
			alert("Código já cadastrado.");
			return;
		}
	// caso contrário insere
		var Usuario = JSON.stringify({
			Usuario     : $("#txtUsuario").val(),
			Ramal       : $("#txtRamal").val(),
			Desc_Categoria   : $("#txtCategoria").val(),
			Email            : $("#txtEmail").val(),
			// Codigo   : $("#txtCodigo").val()          ?vai aparecer para o usuario?
		});

		tbChamados.push(Usuario);

		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));

		alert("Registro adicionado com sucesso!");
		
		return true;
	}

	// Função para editar chamados
	function Editar(){
		tbChamados[indice_selecionado] = JSON.stringify({
				Usuario  : $("#txtUsuario").val(),
				Ramal 	 : $("#txtRamal").val(),
				Desc_Categoria   : $("#txtCategoria").val(),
				Email 	 : $("#txtEmail").val()
				// Codigo   : $("#txtCodigo").val()
			});
		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
		alert("Informações editadas com sucesso!")
		operacao = "A";
		return true;
	}
	// Função para listar chamado
	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Usuario</th>"+
			"	<th>Ramal</th>"+
			"	<th>Desc_Categoria</th>"+
			"	<th>Email</th>"+
			// "	<th>Código</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		// Malha de repetição para inserir todos os registros
		 for(var i in tbChamados){
			var Usuario = JSON.parse(tbChamados[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='img/edit.png' alt='"+i+"' class='btnEditar'/><img src='img/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+Usuario.Usuario+"</td>" + 
										 "	<td>"+Usuario.Ramal+"</td>" + 
										 "	<td>"+Desc_Categoria+"</td>" + 
										 "	<td>"+Usuario.Email+"</td>" + 
										//  "	<td>"+Usuario.Codigo+"</td>" + 
		  								 "</tr>");
		 }
	}

		// Função para excluir registros
	function Excluir(){
		tbChamados.splice(indice_selecionado, 1);
		localStorage.setItem("tbChamados", JSON.stringify(tbChamados));
		alert("Registro excluído com sucesso!");
	}

	// função para pesquisar Usuário
	function GetUsuario(propriedade, valor){
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
	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});
	// Ação com base nos eventos do botão Editar
	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbChamados[indice_selecionado]);
		$("#txtUsuario").val(cli.usuario);
		$("#txtRamal").val(Cli.Ramal);
		$("txtDesc_Categoria").val(cli.Desc_Categoria);
		$("#txtEmail").val(cli.Email);
		$("#txtCodigo").attr("readonly","readonly");//??????????????????????
		$("#txtUsuario").focus();
		// $("#txtCodigo").val(Usuario.Codigo);
	});
	// Ação com base nos eventos do botão Excluir
	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

});
