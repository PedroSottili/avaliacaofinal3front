axios.defaults.baseURL = 'http://localhost:8080';

async function ContaCriada(event) {
    event.preventDefault();

	  const password = document.getElementById("password").value
  	const rptpassword = document.getElementById("exampleInputPassword2").value;
  	const username = document.getElementById("username").value;
  	if (rptpassword.value == password.value) {
    alert("Conta criada com sucesso!");
    const dados = {
      username: username,
      password: password
    };
    const {data} = await axios.post('/user', dados);
    console.log(data);
    armazenar.push(dados);
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

if (!localStorage.server) {
  const server = { token: null};

  localStorage.server = JSON.stringify(server);
} else {
  server = JSON.parse(localStorage.server);
}

server = JSON.parse(localStorage.server);

async function acesso(event) {
  event.preventDefault();
  const valueUsername = document.getElementById("exampleInputEmail1").value;
  const valuePassword = document.getElementById("exampleInputPassword1").value;
  const valueObjeto = {
    username: valueUsername,
    password: valuePassword,
  };
  try{
  const {data} = await axios.post('/login', valueObjeto);
  console.log(data);
  server=data;
  localStorage.sessao=JSON.stringify(server);
  if(data.token.length>20){
  alert('Você está sendo conectado...')
  NovaAba("/menuderecados.html");
  }}
  catch{
    alert('senha ou nome inválido!');
  }
}

function NovaAba(url) {
  const win = window.open(url, "_blank");
  win.focus();
}

const recados = [];

const DescricaoValue = document.getElementById("descrecados").value;
const DetalhamentoValue = document.getElementById("detrecados").value;
const user = {
  ID: recados.length > 0 ? recados[recados.length - 1].ID + 1 : 1,
  descricao: DescricaoValue,
  detalhamento: DetalhamentoValue,
};

async function create(event) {
	event.preventDefault();

  const {data} = await axios.post('/recado', user);
  
	console.log(data);

  recados.push(user);
  const novaLinha = document.createElement("tr");
  novaLinha.id = recados[recados.length - 1].ID;
  novaLinha.innerHTML = `
	   	  <th scope="row">${user.ID}</th>
	   	  <td id="tddescricao${user.ID}">${user.descricao}</td>
	  	  <td id="tddetalhamento${user.ID}">${user.detalhamento}</td>
	      <td><button id="botaoapagar" onclick=Delete(${user.ID}) type="submit" class="btn btn-danger">Apagar</button><button id="botaoeditar" onclick=AbrirModal(${user.ID}) type="submit" class="btn btn-success" data-toggle="modal">Editar</button></td>`;
	  
	    document.querySelector("#tabela>tbody").appendChild(novaLinha);
}

function Delete(id) {
  recados.forEach((recado) => recado.ID == id ? recados.splice(recados.indexOf(recado), 1) : 0);
  localStorage.setItem("recado", JSON.stringify(recados));
  ApagaLinha(id);
}

function ApagaLinha(id) {
  const linha = document.getElementById(id);
  linha.parentNode.removeChild(linha);
}

async function update(event,id) {
  event.preventDefault();

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
//