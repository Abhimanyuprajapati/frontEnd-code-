/*                              @Author : {}
* Copyright (c) 2021, by Tush Entertainment
* Permission to use, copy, modify or distribute this software in binary or source form
* for any purpose is allowed only under explicit prior consent in writing from Tush Entertainment.
* THE SOFTWARE IS PROVIDED "AS IS" AND TUSH ENTERTAINMENT DISCLAIMS
* ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL TUSH ENTERTAINMENT
* BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
* DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
* PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
* ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
* SOFTWARE.THIS SOFTWARE IS PROTECTED BY COPYRIGHT LAWS FROM INDIA AND USA.
* ANY OR ALL PART OF THIS SOFTWARE OR SOURCES CANNOT BE USED FOR ANY TYPES OF
* PRODUCTS WHICH IS DIRECTLY AND INDIRECTLY AFFECTING THE LIFE OF HUMANS.
*/
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "./css/index.css";
import reportWebVitals from "./reportWebVitals";
import App from './Components/App';
import Protected from "./Driver/Protected";
import Redirect from './Driver/Redirect';
import Addcontentmodule from './Components/Addcontentmodule';
import Updatesubspricechild from './Components/Updatesubspricechild'
import Listpromotion from './Components/Listpromotion'
import Addposterchild from "./Components/Addposterchild";
import Dashboard from './Components/Dashboard';
import Configchild from "./Components/Configchild";
import Addcontentchild from "./Components/Addcontentchild";
import Upcontent from "./Components/Upcontent";
import Listcategory from "./Components/Listcategory";
import Addcategories from "./Components/Addcategories";
import Addsubcategorychild from "./Components/Addsubcategorychild";
import Updateposterchild from "./Components/Updateposterchild";
import Listseasons from './Components/Listseasons'
import Addseasonschild from './Components/Addseasonschild'
import Updateseasonschild from "./Components/Updateseasonschild";
import UpdateCategory from './Components/UpdateCategory';
import Listepisodechild from "./Components/Listepisodechild";
import Addepisodechild from "./Components/Addepisodechild";
import Updateepisodechild from "./Components/Updateepisodechild";
import Subsprices from './Components/Subsprices';
import UpdateSubCategory from './Components/UpdateSubCategory'
import Listupcontent from "./Components/Listupcontent";
import Updateupcontent from "./Components/Updateupcontent";
import Listsupportticket from "./Components/Listsupportticket";
import Updatesupportchild from "./Components/Updatesupportchild";
import Supportticketdetails from "./Components/Supportticketdetails";
import Subscriptionchild from "./Components/Subscriptionchild";
import Addsubscomponent from "./Components/Addsubscomponent";
import Updatesubscomponent from "./Components/Updatesubscomponent";
import Addpricepackagechild from "./Components/Addpricepackagechild";
import Listpayment from "./Components/Listpayment";
import Addpaymentchild from "./Components/Addpaymentchild";
import Updatepaymentchild from "./Components/Updatepaymentchild";
import Updatecontentchild from "./Components/Updatecontentchild";
import Addvideo from "./Components/Addvideo";
import Listvideo from "./Components/Listvideo";
import Updatevideo from "./Components/Updatevideo";
import Listdownloadvideo from './Components/Listdownloadvideo';
import Adddownloadvideo from "./Components/Adddownloadvideo";
import Inapp from "./Components/Inapp";
import User from "./Components/Users/User";
import Promotionaladds from "./Components/Adds/Promotionaladds";
import Releasemanagement from "./Components/Release/Releasemanagement";
import Updatesheduled from "./Components/Adds/Updatesheduled";
import Protectedoffice from "./Driver/Protectedoffice";
import ListReels from "./Components/Reel/ListReels";
import AddReel from "./Components/Reel/AddReel";
import UpdateReel from "./Components/Reel/UpdateReel";
//render all the url's components or elements
ReactDOM.render(
  <Router>
    <Routes>
      {/*root routing */}
      <Route path="/" element={<Redirect Protect={App} />}/>
      <Route path="/login" element={<Redirect Protect={App} />}/>
      <Route path="/login/:message" element={<Redirect Protect={App} />}/>
      <Route path="/admin/dashboard" element={<Protectedoffice Protect={Dashboard}/>} />
      {/*Reels Routing*/}
      <Route path="/reels" element={<Protected Protect={ListReels} />} />
      <Route path="/reels/add" element={<Protected Protect={AddReel} />} />
      <Route path="/reels/update/:reelId" element={<Protected Protect={UpdateReel} />} />
      {/*content routing */}
      <Route path="/content" element={<Protected Protect={Addcontentmodule} />} />
      <Route path="/content/add" element={<Protected Protect={Addcontentchild} />} />
      <Route path="/content/update/:contentId/:contentName" element={<Protected Protect={Updatecontentchild} />} />
      {/*category routing */}
      <Route path="/category" element={<Protected Protect={Listcategory} />} />
      <Route path="/category/add" element={<Protected Protect={Addcategories} />} />
      <Route path="/category/:categoryId/:categoryName" element={<Protected Protect={UpdateCategory} />} />
       {/*subcategory routing */}
      <Route path="/subcategory/add" element={<Protected Protect={Addsubcategorychild} />} />
      <Route path="/subcategory/:subcategoryId/:subcategoryName" element={<Protected Protect={UpdateSubCategory} />} />
       {/*config routing */}
      <Route path="/config" element={<Protectedoffice Protect={Configchild}  />} />
       {/*poster routing */}
      <Route path="/posters" element={<Protected Protect={Listpromotion} />}/>
      <Route path="/posters/add" element={<Protected Protect={Addposterchild} />} />
      <Route path="/posters/update/:posterId/:posterName" element={<Protected Protect={Updateposterchild} />} />
      {/*seasons routing */}
      <Route path="/seasons/:contentName/:contentId/:awsStaticResourcePath" element={<Protected Protect={Listseasons} />}/>
      <Route path="/seasons/add/:contentName/:contentId/:awsStaticResourcePath" element={<Protected Protect={Addseasonschild} />}/>
      <Route path="/seasons/update/:contentName/:contentId/:seasonId/:seasonName/:awsStaticResourcePath" element={<Protected Protect={Updateseasonschild} />} />
      {/*epsidoes routing */}
      <Route path="/episodes/:contentName/:contentId/:seasonName/:seasonId/:awsStaticResourcePath" element={<Protected Protect={Listepisodechild} />}/>
      <Route path="/episodes/addepisode/:contentName/:contentId/:seasonName/:seasonId/:awsStaticResourcePath" element={<Protected Protect={Addepisodechild} />}/>
      <Route path="/episodes/updateepisode/:contentName/:contentId/:seasonName/:seasonId/:episodeId/:episodeName/:awsStaticResourcePath" element={<Protected Protect={Updateepisodechild} />}/>

      {/*video routing */}
      <Route path="/videos/:contentId/:contentName" element={<Protected Protect={Listvideo} />}/>
      <Route path="/videos/add/:contentId/:contentName" element={<Protected Protect={Addvideo} />}/>
      <Route path="/videos/update/:contentId/:contentName/:videoplaybackId/:videoId" element={<Protected Protect={Updatevideo} />}/>

      <Route path="/videos/:contentName/:contentId/:seasonName/:seasonId/:episodeId/:episodeName/:awsStaticResourcePath" element={<Protected Protect={Listvideo} />}/>
      <Route path="/videos/add/:contentName/:contentId/:seasonName/:seasonId/:episodeId/:episodeName/:awsStaticResourcePath" element={<Protected Protect={Addvideo} />}/>
      <Route path="/videos/update/:contentName/:contentId/:seasonName/:seasonId/:episodeId/:episodeName/:videoplaybackId/:videoId/:awsStaticResourcePath" element={<Protected Protect={Updatevideo} />}/>
      
      {/*upcoming routing */}
      <Route path="/upcomming/content" element={<Protected Protect={Listupcontent} />} />
      <Route path="/addupcomming/content" element={<Protected Protect={Upcontent} />} />
      <Route path="/updateupcomming/content/:upcommingId/:name/:upcommingname" element={<Protected Protect={Updateupcontent} />} />
      {/*support ticket routing */}
      <Route path="/support" element={<Protected Protect={Listsupportticket} />} />
      <Route path="/support/update/:id/:name" element={<Protected Protect={Updatesupportchild} />} />
      <Route path="/support/ticket/details/:uuid/:username" element={<Protected Protect={Supportticketdetails} />} />
      {/*subscription routing */}
      <Route path="/subcription" element={<Protectedoffice Protect={Subscriptionchild}/>} />
      <Route path="/subcription/add" element={<Protectedoffice Protect={Addsubscomponent}/>} />
      <Route path="/subcription/update/:packageId/:packageName" element={<Protectedoffice Protect={Updatesubscomponent} />} />
      <Route path="/subcription/addprice/:packageId/:packageName" element={<Protectedoffice Protect={Addpricepackagechild} />} />
      <Route path="/subcription/prices/:packageId/:packageName" element={<Protectedoffice Protect={Subsprices} />} />
      <Route path="/subcription/prices/update/:packageId/:packageName/:priceId/:priceName" element={<Protectedoffice Protect={Updatesubspricechild} />} />
      {/*Inapp packages routing */}
      <Route path="/Inapp/create/package" element={<Protectedoffice Protect={Inapp}/>} />
      {/*payment routing */}
      <Route path="/payment" element={<Protectedoffice Protect={Listpayment} />} />
      <Route path="/payment/add" element={<Protectedoffice Protect={Addpaymentchild} />} />
      <Route path="/payment/update/:paymentGatewayId/:paymentGatewayName/:statusnew" element={<Protectedoffice Protect={Updatepaymentchild} />} />
      {/*Download routing */}
      <Route path="/download/videos" element={<Protected Protect={Listdownloadvideo} />} />
      <Route path="/download/videos/:contentId/:contentName" element={<Protected Protect={Listdownloadvideo} />} />
      <Route path="/download/videos/:contentId/:seasonId/:episodeId/:episodeName" element={<Protected Protect={Listdownloadvideo} />} />
      <Route path="/download/video/update/:id" element={<Protected Protect={Adddownloadvideo} />} />
      <Route path="/download/video/update/:id/:download_id/:path" element={<Protected Protect={Adddownloadvideo} />} />
      {/*Users routing */}
      <Route path="/users" element={<Protected Protect={User}/>} />
      <Route path="/notification/promotional" element={<Protected Protect={Promotionaladds}/>} />
      <Route path="/release/management" element={<Protected Protect={Releasemanagement}/>} />
      <Route path="/scheduled/notification/update/:notifyId/:contentId" element={<Protected Protect={Updatesheduled}/>}/>
    </Routes>
  </Router>,
  document.getElementById("root")
);


 

reportWebVitals();
