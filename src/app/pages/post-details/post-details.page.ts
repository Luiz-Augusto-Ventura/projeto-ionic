import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  id: string;
  uid: string;
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private complaintsService: ComplaintsService,
    private authService: AuthenticationService
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.complaintsService.getComplaint(this.id).subscribe(data => this.complaint = data);

    this.uid = this.authService.detailsUser().uid;
  }

  ngOnInit() {
  }

}
