import { Component, OnInit } from '@angular/core';
import { Stock, StockService } from '../../services/stock.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  stock: Stock[] = [];

  constructor(
    private stockService: StockService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.stockService.getStocks().subscribe((data) => {
      this.stock = data;
    });
  }

  async addProduct() {
    const alert = await this.alertCtrl.create({
      header: 'Add Product',
      inputs: [
        { name: 'name', placeholder: 'Nome do produto', type: 'text' },
        { name: 'category', placeholder: 'Categoria', type: 'text' },
        { name: 'quantity', placeholder: 'Quantidade', type: 'number' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => this.stockService.addStock(data),
        },
      ],
    });
    await alert.present();
  }

  ngOnInit() {}
}
