import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Complaint } from 'src/app/models/complaint';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-make-a-post',
  templateUrl: './make-a-post.page.html',
  styleUrls: ['./make-a-post.page.scss'],
})
export class MakeAPostPage implements OnInit {

  formPost: FormGroup;
  id: string;
  complaint: Complaint = {
    uid: '',
    nome: '',
    email: '',
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
    private complaintsService: ComplaintsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      this.formPost = this.formBuilder.group({
        titulo: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        localizacao: new FormControl('', Validators.required),
        data: new FormControl('', Validators.required),
      })

      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.usersService.getUser(this.authService.detailsUser().uid).subscribe(data => this.user = data);

      if(this.id) {
        this.complaintsService.getComplaint(this.id).subscribe(data => this.complaint = data);
      }
  }

  ngOnInit() {
  }

  salvar() {
    this.complaint.uid = this.authService.detailsUser().uid;
    this.complaint.email = this.authService.detailsUser().email;
    this.complaint.nome = this.user.nome + ' ' + this.user.sobrenome;

    this.complaintsService.addComplaint(this.complaint)
      .then(() => {this.router.navigateByUrl('/home')}),
      (error) => { 
          console.log("Erro ao registrar reclamação!");
          console.log(error);
        };
  }

  //Tratar excessões aqui
  alterar() {
    this.complaintsService.updateComplaint(this.complaint)
      .then(() => {this.router.navigateByUrl('/home')}),
      (error) => { 
        console.log("Erro ao alterar reclamação!");
        console.log(error);
      };
  }

  excluir() {
    this.complaintsService.deleteComplaint(this.complaint.id)
      .then(() => {this.router.navigateByUrl('/home')}),
      (error) => { 
        console.log("Erro ao excluir reclamação!");
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
