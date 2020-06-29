import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о неправильном email или пароле
  existEmail = true;
  // Логическая переменная, определяющая наличие или отсутсвие сообщения о незаполненных обязательных полях
  isEmpty = true;
  form: FormGroup;
  users = {
    id_users: "",
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    phone: "",
    password: "",
    id_ad_type: "",
    id_role: "",
  };

  constructor(private api: MainService, private router: Router) {}

  ngOnInit() {
    // Инициализация FormGroup, создание FormControl, и назанчение Validators
    this.form = new FormGroup({
      surname: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      patronymic: new FormControl("", []),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      id_ad_type: new FormControl("", [Validators.required])
    });
  }

  // Функция входа, отправляющая данные, полученные с формы на сервер, и реагирующая на ответ с сервера
  async onRegistr() {
    localStorage.clear();
    if (
      this.form.value.surname== "" ||
      this.form.value.name == "" ||
      this.form.value.patronymic == "" ||
      this.form.value.email == "" ||
      this.form.value.phone == "" ||
      this.form.value.password == "" ||
      this.form.value.id_ad_type == "" 
    ) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
      let infoAboutUsers;
      infoAboutUsers = {
        surname: this.form.value.surname,
        name: this.form.value.name,
        patronymic: this.form.value.patronymic,
        email: this.form.value.email,
        phone: this.form.value.phone,
        password: this.form.value.password,
        id_ad_type: this.form.value.id_ad_type,
        id_role: "1"
      };
      console.log(infoAboutUsers);
      try {
        let ExistOrNot = await this.api.post(
          JSON.stringify(infoAboutUsers),
          "/registration"
        );
        this.form.reset();
        if (ExistOrNot != "exist") {
          console.log(ExistOrNot);
          this.users.id_users= ExistOrNot[0].id_users;
          this.users.surname = ExistOrNot[0].surname;
          this.users.name = ExistOrNot[0].name;
          this.users.patronymic = ExistOrNot[0].patronymic;
          this.users.email = ExistOrNot[0].email;
          this.users.phone= ExistOrNot[0].phone;
          this.users.password = ExistOrNot[0].password;
          this.users.id_ad_type = ExistOrNot[0].id_ad_type;
          this.users.id_role = ExistOrNot[0].id_role;
          console.log(this.users);
          localStorage.setItem("id_users", this.users.id_users);
          localStorage.setItem("surname", this.users.surname);
          localStorage.setItem("name", this.users.name);
          localStorage.setItem("patronymic", this.users.patronymic);
          localStorage.setItem("email", this.users.email);
          localStorage.setItem("phone", this.users.phone);
          localStorage.setItem("password", this.users.password);
          localStorage.setItem("id_ad_type", this.users.id_ad_type);
          localStorage.setItem("id_role", this.users.id_role);
          this.router.navigate([""]);
        } else {
          this.existEmail = false;
          console.log("Email уже существует");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  // Функция, убирает сообщения о неправильном логине или пароле и о незаполненных полях
  onFlag() {
    this.existEmail= true;
    this.isEmpty = true;
  }
}
