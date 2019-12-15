import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { Logo, LogosService } from 'src/app/services/app-logos.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo-convas',
  templateUrl: './logo-convas.component.html',
  styleUrls: ['./logo-convas.component.scss']
})
export class LogoConvasComponent implements OnInit {
  @ViewChild('idLogo') idLogo: ElementRef;
  @ViewChild('idimg') idimg: ElementRef;

  newfontFamily = 'Roboto';
  idImgSelect: string;
  fontUri: string;
  tom: any;
  sub: Subscription;
  arrayFonts = [];

  convas;
  context;
  isDrawing = false;
  img;
  image = new Image();
  text = '@tom';
  idLogoText: string;
  logos: Logo[] = [];
  logo = [];
  paramId: string;

  constructor(
    private logoService: LogosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    setTimeout(() => {
      // canvas
      this.image.src = `${this.logo[0].imgLogo}`;
      this.convas = this.idLogo.nativeElement;
      this.context = <HTMLCanvasElement>this.convas.getContext('2d');
      this.context.strokeStyle = '#3742fa';

      this.image.onload = () => {
        setTimeout(() => {
          this.context.drawImage(this.image, 150, 0);
        }, 1000);
      };
      this.context.fillStyle = 'red';
      this.context.font = '30px Arial';
      this.context.fillText(this.text, 50, 100);
    }, 1000);

    // route get param for id
    this.route.params.subscribe(param => {
      this.logoService.getById(param.id).subscribe(res => {
        this.logo = res;
        this.paramId = param.id;
      });
    });
  }

  // canvas
  wtiteText() {
    this.context.clearRect(0, 0, 150, 150);
    this.context.beginPath();
    if (this.idLogoText === undefined) {
      this.idLogoText = '';
    }
    this.context.font = `30px ${this.newfontFamily} `;
    this.context.fillText(this.idLogoText, 50, 100);
    console.log('write text', this.context.font, 'dfdf', this.newfontFamily);
  }

  changeImg() {
    switch (this.idImgSelect) {
      case 'triangle':
        this.context.moveTo(100, 20);
        this.context.lineTo(150, 75);
        this.context.lineTo(50, 75);
        console.log('triangle');
        break;
      case 'squre':
        this.context.rect(20, 20, 70, 70);
        this.context.stroke();
        console.log('squre');
        break;
      case 'circle':
        this.context.clearRect(151, 0, 150, 150);
        this.context.arc(95, 50, 40, 0, 2 * Math.PI);
        this.context.stroke();
        console.log('circle');
        break;
      default:
        console.log('default');
    }
    this.context.fill();
  }

  onMouseUp(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.convas.width, this.convas.height);
    this.context.beginPath();
  }

  addLogo() {
    this.img = this.convas.toDataURL('image/jpg');
    // this.logoService
    //   .addLogo({
    //     imgLogo: this.img,
    //     text: this.idLogoText
    //   })
    //   .subscribe();

    // edit
    this.logoService
      .editLogo(this.paramId, this.img, this.idLogoText)
      .subscribe();
    console.log('edit Done!!!', this.idLogoText, this.img, ' = img');
  }

  showLogos() {
    this.logoService.showLogos().subscribe(logo => {
      this.logos = logo;
      console.log('logo', logo);
      return logo;
    });
  }

  saveAndGoHome() {
    this.router.navigate(['/logo']);
    console.log('go home');
  }

  addFontFamily(fontFamily) {
    this.newfontFamily = fontFamily;
    this.context.clearRect(0, 0, 150, 150);
    this.context.beginPath();
    if (this.idLogoText === undefined) {
      this.idLogoText = '';
    }
    this.context.font = `30px ${fontFamily} `;
    this.context.fillText(this.idLogoText, 50, 100);
    console.log('object', fontFamily, 'this.context.font', this.context.font);
  }
}
