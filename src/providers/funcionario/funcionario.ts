import { ConfigProvider } from './../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FuncionarioProvider {

  enderecoDaApi;

  constructor(
    public httpClient: HttpClient,
    public configProvider: ConfigProvider
    ) {
    this.enderecoDaApi = configProvider.baseApiPath;
  }

  public pesquisarPeloCracha(cracha): Observable<any> {
    return this.httpClient.get(this.enderecoDaApi + '/api/funcionario/buscarPelaMatricula?term=' + cracha);
  }

}
