import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  slides: any[] =[];

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: 'https://www.telam.com.ar/thumbs/bluesteel/advf/imagenes/2022/07/62c99326b12c0_1200.jpg',
      title: 'Copa America 2021',
      subtitle: 'Campeones de america'
    };
    this.slides[1] = {
      id: 1,
      src: 'https://static.messi.com/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-02-at-9.31.42-AM-2.jpeg?v=1654159373',
      title: 'Finalissima 2022',
      subtitle: 'Campeones de Europa'
    }
    this.slides[2] = {
      id: 2,
      src: 'https://i0.wp.com/termasdigital.com.ar/wp-content/uploads/2022/12/Argentina-Campeon-del-Mundo-Qatar-2022-4.jpg?resize=780%2C470&ssl=1',
      title: 'Qatar 2022',
      subtitle: 'Campeones del mundo'
    }
  }


}
