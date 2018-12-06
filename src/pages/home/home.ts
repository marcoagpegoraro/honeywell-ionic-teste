import { FuncionarioProvider } from './../../providers/funcionario/funcionario';
import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  window: any = window;

  cracha = '';

  nome;
  telefone;
  email;
  cargo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public configProvider: ConfigProvider,
    public funcionarioProvider: FuncionarioProvider
  ) {

  }

  ionViewDidLoad(){
    window['plugins'].honeywell.listen(data => {
      window.dispatchEvent(new Event('resize'));
      this.cracha = data;
    this.buscarDados(data);

      window.dispatchEvent(new Event('resize'));
    }, error => {
    });
  }


  onSubmit(f: NgForm) {

    if (!f.valid) {
      let toast = this.toastCtrl.create({
        message: "Esta faltando o campo nome.",
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.buscarDados(f.value.cracha);

  }

  buscarDados(matricula){
    let loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde.'
    });
    loading.present();

      this.funcionarioProvider.pesquisarPeloCracha(matricula).subscribe(
        data => {
          loading.dismiss();
          const response = (data as any).Response[0];

          this.nome = response.nome;
          this.telefone = response.telefone;
          this.email = response.email;
          this.cargo = response.cargo;


        },
        error => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: error.Message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      );
  }
}
