import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Criando uma variável pública de nome "todos" do tipo "any".
  //Variável do tipo public, indica que será possível acesso do Front-End(HTML).
  // [] usado para declarar um arrary de valores
  // tipo "any" indica que as entradas no array pode ser de qualquer tipo
  public mode = 'list';
  public todos: Todo[] = [];
  public title: string = "Metas diárias: ";
  public form: FormGroup;
  

  //O método constructor é chamado toda vez que o componente inicia
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tarefa: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
    //no typescript, o "this" se refere ao escopo da classe
    //this. me dá acesso a todas variáveis, funções, métodos do escopo 
    //push adiciona um elemento no array
  }

  //alteraTexto() {
  //  this.title = "Metas Diárias:";
  //}

  //Observe que foi feita uma tipagem de dados na entrada do método "remove"
  //para o tipo "Todo".
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    // IF nesse ponto está atuando apenas como um verificador de erro
    if (index !== -1) {

      //o método "splice()" remove item(ns) da uma lista
      this.todos.splice(index, 1);
    }
    this.save();
  }
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }
  adiciona() {
    const nova_tarefa = this.form.controls['tarefa'].value;
    const id_novatarefa = this.todos.length + 1;
    this.todos.push(new Todo(id_novatarefa, nova_tarefa, false));
    this.save();
    this.clear();
  }
  clear() {
    this.form.reset();
  }
  reset() {
    this.todos.splice(0, this.todos.length);
  }
  //Para que as informações sejam persistidas eu irei salvá-las no
  // Local Storage com a função "save"
  //Observe que eu salvo meu "todos"(array de tarefas) que já é um JSON em um 
  // formato JSON String a partir do método .stringfy()
  //JSON.stringfy() -> Converte um objeto JSON em uma String;
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }
  load() {
    //Lendo as informações do Local Storage e armazenando na constante "data"
    const data = localStorage.getItem('todos');
    //Lembrar que a partir do stringfy() meu dado do LocalStorage está em formato
    // de string. Mas "todos" armazena em outro formato (number, string, boolean)
    //Convertendo para um JSON
    if (data){
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
   }
   alterMode(mode:string) {
     this.mode = mode;
     
   }



}