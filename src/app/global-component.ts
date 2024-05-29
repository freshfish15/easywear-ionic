import { ToastController } from "@ionic/angular";
import { fittingroom_item} from "./interface/AllResponse";
import {ClothInfo} from "./interface/AllResponse";
import {FittingRoomItem} from "./fitting-room/fitting-room-item"
import {map} from "rxjs/operators";
export class GlobalComponent {

  public static serverAddress = "http://43.201.94.233:8006";
  public static shoppingCart_F =
  [

    {
      id: -1,
      name: 'initial_$#female',
      category_id: 1,
      price: 100,
      image_path: 'Triangles_SF_002',
      brand: '',
      description: ''
    }

  ];
  fittingroom_list = FittingRoomItem  ;
  public static shoppingCart_M = [

    {
      id: -1,
      name: 'initial_$#male',
      category_id: 1,
      price: 100,
      image_path: 'Triangles_SF_002',
      brand: '',
      description: ''
    }

  ]




  public static fittingRoom =
    [

      {
        id: 1,
        name: 'EVA',
        category_id: 1,
        price: 100,
        image_path: 'Triangles_SF_002',
        brand: '',
        description: ''
      }

    ];


  // public static shoppingCart_M = [
  //   {
  //     name: string,
  //     brand: 'Brand Name-Sample',
  //     price: 100000000000
  //   },
  //   {name: 'TestTop2', brand: 'testbrand2', price: 200},
  //
  // ];

  public static shoppingCart_M_lens = this.shoppingCart_M.length - 1;
  public static shoppingCart_F_lens = this.shoppingCart_F.length - 1;
  public static token : string;
  public static tokenType : string;
  public static userid : number;
  public static regIn : string;
  public static logo : string;



  public static regUserName : string;
  public static regUserPwd : string;
  public static regUserEmail : string;

  public static signinEmail : string;
  public static fittingRoomClothNum : number;
  // public static fittingRoom: ClothInfo[];


  public static shoppingCartMap = new Map();


  //public static EmailVerification : number;
  constructor(
    public toastController: ToastController,
  ) {
  }
}
