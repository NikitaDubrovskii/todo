import {Stat} from "../../../model/stat";
import {Observable} from "rxjs";

export interface StatDao {

  getOverallStat(): Observable<Stat>;

}
