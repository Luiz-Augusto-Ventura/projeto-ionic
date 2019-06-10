import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Complaint } from 'src/app/models/complaint';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-make-a-post',
  templateUrl: './make-a-post.page.html',
  styleUrls: ['./make-a-post.page.scss'],
})
export class MakeAPostPage implements OnInit {

  formPost: FormGroup;
  complaint: Complaint = {
    uid: '',
    nome: '',
    titulo: '',
    descricao: '',
    localizacao: '',
    imagem: '',
    data: ''
  };
  user: User;
  imagem: string;
  
  constructor(private camera: Camera,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private complaintsService: ComplaintsService) { 
      this.formPost = this.formBuilder.group({
        titulo: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        localizacao: new FormControl('', Validators.required),
        data: new FormControl('', Validators.required),
      })

      this.usersService.getUser(this.authService.detailsUser().uid).subscribe(data => this.user = data);
  }

  ngOnInit() {
  }

  salvar() {
    this.complaint.uid = this.authService.detailsUser().uid;
    this.complaint.nome = this.user.nome + ' ' + this.user.sobrenome;

    this.complaintsService.addComplaint(this.complaint)
      .then(),
      (error) => { 
          console.log("Erro ao registrar reclamação!");
          console.log(error);
        };
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }
  
    this.camera.getPicture(options).then( (imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagem = base64Image;
      //Alterar isso aqui depois
      this.complaint.imagem = this.imagem;
    }, (err) => {
      console.log("Erro ao tirar foto!");
      console.log(err);
    });
  }
}