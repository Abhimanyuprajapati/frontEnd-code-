import { useEffect, useState } from "react";
import { Access } from "../services/context";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Download from '../components/Contents/Download';
import Question from "../components/Contents/Question";
import Topmovie from "../components/Contents/Topmovie";
//server side redenring
import Slider from "../components/Slider";
import withState from "../components/Auth/State";

const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
function Home({ data }) {
  //client side data fetching
  const [contents, setcontents] = useState([]);
  useEffect(() => {
    console.log(data)
    callback(data.contents);
  }, []);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const callback = (data) => {
    const arr = [];
    const movies = [];
    data.map((x) => x.subcategory.map((x) => movies.push(x)));
    //data.content.map(x => x.subcategory.map(x=> movies.push(x) ))
    const uniq = movies.filter(onlyUnique);
    for (var i = 0; i < uniq.length; i++) {
      //only checking first value of an subcategory array for filteration
      const result = data.filter((x) => x.subcategory[0] === uniq[i]);
      var key = uniq[i];
      if (result.length > 0) {
        arr.push({ name: key, value: result });
      }
    }
    console.log(arr)
    setcontents(arr);
  };
  return (
    // home pagge start from here

    <div className="home">
      
      <Slider data={data.contents} /> {/*slider components goes here   */}
      {/* filmcity originals section goes here  */}


{/*Dynamic Mapping based on category for filmcity originals */}
{ contents.map((y,index)=>{
        return (
          <section className="product" key={index}>
            <div className="product_category">
              <div className="product_category_heading">
                <h4>{y.name}</h4>
              </div>
              <div className="product_item_list">
                {y.value.map((x, index) => {
                  return (
                    <div key={index}>
                      <Link href={"/contents/" + `${x.title}`} className="product_item">
                        <div className="product_item_image">
                          <Image
                            src={
                              static_url +
                              "/" +
                              x.awsStaticResourcePath +
                              "/" +
                              x.portraitPosterIdNormal
                            }
                            alt="dd"
                            width="200"
                            height="300"
                          />
                          <div className="product_item_image_overlay">
                            <div className="play_icon"></div>
                          </div>
                        </div>
                        <p>{x.title}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
        </section>
        )
      })}

      <section className="product">
          <div className="product_category">
            <div className="product_category_heading">
              <h4>FILMCITY ORIGINALS</h4>
            </div>
            <div className="product_item_list">
              {data.contents.map((x, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={"/contents/" + `${x.title}`}
                      className="product_item"
                    >
                      <div className="product_item_image">
                        <Image
                          src={
                            static_url +
                            "/" +
                            x.awsStaticResourcePath +
                            "/" +
                            x.portraitPosterIdNormal
                          }
                          alt="dd"
                          width="200"
                          height="300"
                        />
                        <div className="product_item_image_overlay">
                          <div className="play_icon"></div>
                        </div>
                      </div>
                      <p>{x.title}</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
      </section>
    </div>
  );
}
export default withState(Home);

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await Access.get("/getContents?index=0&&limit=50");
  //console.log(res);
  return {
    props: { data: res.data.data },
  };
}
