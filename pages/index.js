import { useEffect, useState } from "react";
import { Access } from "../services/context";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import small from "../assets/image/jalvalogonew.png";
//server side redenring
import Slider from "../components/Slider";
import withState from "../components/Auth/State";
// import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useUserAuth } from "../context/UserAuthContext";
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
function Home({ data }) {
  //client side data fetching
  const [contents, setcontents] = useState([]);
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    callback(data.contents,data.subCategoryList);
  }, []);

  const callback = async(data,subcategory) => {
    const arr = [];
    const uniq =subcategory;
    if(uniq){
      uniq.sort((a,b)=> a.rank - b.rank)
      for (var i = 0; i < uniq.length; i++) {
        //only checking first value of an subcategory array for filteration
        const result = data.filter((x) => x.subcategory.includes(uniq[i].title) && x.published );
        var key = uniq[i].title;
        if (result.length > 0) {
          arr.push({ name: key, value: result });
        }
      }
    }
   // data.map((x) => x.subcategory.map((x) => movies.push(x)));
    //data.content.map(x => x.subcategory.map(x=> movies.push(x) ))
   // const uniq = movies.filter(onlyUnique);
   
    setcontents(arr);
  };
  return (
    // home pagge start from here

    <div className="home">
      
      <Slider data={data.promotionalPoster} /> {/*slider components goes here   */}
      {/* filmcity originals section goes here  */}


{/*Dynamic Mapping based on category for filmcity originals */}
{ contents.map((y,index)=>{
        return (
          <section className="product" key={index}>
            <div className="product_category">
              <div className="product_category_heading">
                <h4><Image src={small}/> {y.name}</h4>
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

    
      <div className='detail_com'>
            <p>This website is owned by <strong>Films Garden Private Limited.</strong></p>
      </div>
    </div>
  );
}
export default withState(Home);

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await Access.get("/getContents?index=0&&limit=50");
    return {
      props: { data: res.data.data },
    };
}
