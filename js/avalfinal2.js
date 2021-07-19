axios.defaults.baseURL = 'http://localhost:8080';




async function ContaCriada() {
	const password = document.getElementById("password").value
  	const rptpassword = document.getElementById("exampleInputPassword2").value;
  	const username = document.getElementById("username").value;
  	if (rptpassword.value == password.value) {
    alert("Conta criada com sucesso!");
    const dados = {
      username: username,
      password: password
    };
    armazenar.push(dados);
    localStorage.setItem("armazenar", JSON.stringify(armazenar));
    username.value = "";
    password.value = "";
    rptpassword.value = "";
    document.getElementById("textocrconta").id = "entrarnosistema";
    document.getElementById("entrarnosistema").innerHTML = "ENTRAR NO SISTEMA DE RECADOS";
    document.getElementById("username").id = "exampleInputEmail1";
    document.getElementById("password").id = "exampleInputPassword1";
    document.getElementById("exampleInputPassword2").style.display = "";
    document.getElementById("botao2").style.display = "none";
    document.getElementById("botao").style.display = "block";
    document.getElementById("crconta").style.display = "block";
  } else {
    alert("Erro: digite as informações corretamente");
    username.value = "";
    password.value = "";
    rptpassword.value = "";
  }
const { data } = await axios.post('/conta', {
	  username,
	  password
  });

  console.log(data);
}

function CriacaoDaConta() {
  document.getElementById("entrarnosistema").innerHTML = "CRIAR CONTA";
  document.getElementById("entrarnosistema").id = "textocrconta";
  document.getElementById("exampleInputEmail1").id = "username";
  document.getElementById("exampleInputPassword1").id = "password";
  document.getElementById("exampleInputPassword2").style.display = "block";
  document.getElementById("botao2").style.display = "block";
  document.getElementById("botao").style.display = "none";
  document.getElementById("crconta").style.display = "none";
}

const armazenar = [];

function acesso() {
  const armazenamento = JSON.parse(localStorage.getItem("armazenar"));
  const valueUsername = document.getElementById("exampleInputEmail1").value;
  const valuePassword = document.getElementById("exampleInputPassword1").value;
  const valueObjeto = {
    username: valueUsername,
    password: valuePassword,
  };
  for (let arm of armazenamento) {
    if (valueObjeto.username == arm.username && valueObjeto.password == arm.password) {
      alert("Você está sendo conectado...");
      NovaAba("/menuderecados.html");
    } else {
      alert("Usuário e senha incorretos, tente novamente");
    }
  }
}

function NovaAba(url) {
  const win = window.open(url, "_blank");
  win.focus();
}

const recados = [];

async function create(event) {
	event.preventDefault();

	const DescricaoValue = document.getElementById("descrecados").value;
	const DetalhamentoValue = document.getElementById("detrecados").value;
	const user = {
    ID: recados.length > 0 ? recados[recados.length - 1].ID + 1 : 1,
    descricao: DescricaoValue,
    detalhamento: DetalhamentoValue,
  };
  	recados.push(user);
  	localStorage.setItem("recado", JSON.stringify(recados));
  	JSON.parse(localStorage.getItem("recados"));
	  const novaLinha = document.createElement("tr");
	  novaLinha.id = recados[recados.length - 1].ID;
	  novaLinha.innerHTML = `
	  	  <th scope="row">${user.ID}</th>
	  	  <td id="tddescricao${user.ID}">${user.descricao}</td>
	  	  <td id="tddetalhamento${user.ID}">${user.detalhamento}</td>
	 	  <td><button id="botaoapagar" onclick=Delete(${user.ID}) type="submit" class="btn btn-danger">Apagar</button><button id="botaoeditar" onclick=AbrirModal(${user.ID}) type="submit" class="btn btn-success" data-toggle="modal">Editar</button></td>`;
	  
	    document.querySelector("#tabela>tbody").appendChild(novaLinha);

	const {data} = await axios.post('/crud', {
		descricao,
		detalhamento
	});
  
	console.log(data);
}

// function create() {
//   const DescricaoValue = document.getElementById("descrecados").value;
//   const DetalhamentoValue = document.getElementById("detrecados").value;
//   const user = {
//     ID: recados.length > 0 ? recados[recados.length - 1].ID + 1 : 1,
//     descricao: DescricaoValue,
//     detalhamento: DetalhamentoValue,
//   };
//   recados.push(user);
//   localStorage.setItem("recado", JSON.stringify(recados));
//   JSON.parse(localStorage.getItem("recados"));
//   const novaLinha = document.createElement("tr");
//   novaLinha.id = recados[recados.length - 1].ID;
//   novaLinha.innerHTML = `
// 	  <th scope="row">${user.ID}</th>
// 	  <td id="tddescricao${user.ID}">${user.descricao}</td>
// 	  <td id="tddetalhamento${user.ID}">${user.detalhamento}</td>
// 	  <td><button id="botaoapagar" onclick=Delete(${user.ID}) type="submit" class="btn btn-danger">Apagar</button><button id="botaoeditar" onclick=AbrirModal(${user.ID}) type="submit" class="btn btn-success" data-toggle="modal">Editar</button></td>`;

//   document.querySelector("#tabela>tbody").appendChild(novaLinha);
// }

function Delete(id) {
  recados.forEach((recado) => recado.ID == id ? recados.splice(recados.indexOf(recado), 1) : 0);
  localStorage.setItem("recado", JSON.stringify(recados));
  ApagaLinha(id);
}

function ApagaLinha(id) {
  const linha = document.getElementById(id);
  linha.parentNode.removeChild(linha);
}

function update(id) {
  const editarDescricao = document.getElementById("editardescricao").value;
  const editarDetalhamento = document.getElementById("editardetalhamento").value;
  const edit = {
    ID: parseInt(id),
    descricao: editarDescricao,
    detalhamento: editarDetalhamento,
  };
  document.getElementById("tddescricao" + id).innerHTML = editarDescricao;
  document.getElementById("tddetalhamento" + id).innerHTML = editarDetalhamento;
  recados.forEach((recado) => recado.ID == id ? (recados[recados.indexOf(recado)] = edit) : 0);
  FecharModal();
}

function AbrirModal(id) {
  let modal = document.querySelector(".modal");
  document.getElementById("editID").setAttribute("value", id);
  modal.style.display = "block";
}

function FecharModal() {
  let modal = document.querySelector(".modal");
  modal.style.display = "none";
}

// localStorage.clear();
