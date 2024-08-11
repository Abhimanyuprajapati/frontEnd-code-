import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
import { Access } from "../../services/context";
import upperArrow from "../../assets/image/upperarrow.png";
import bottomArrow from "../../assets/image/bottomarrow.png";
import timer from "../../assets/image/timer.png";
import calendarImage from "../../assets/image/calendar.png";
import generic from "../../assets/image/generic.png";
import playbtn from "../../assets/image/play.png";
import Image from "next/image";
import logoBackground from "../../assets/loginPage/fluent_home-16-filled.png";
import Link from "next/link";
import withState from "../../components/Auth/State";
import { useUserAuth } from "../../context/UserAuthContext";
import Head from 'next/head';

export async function getServerSideProps(context) {
  const res = await Access.get("/getContents?index=0&&limit=50");
  return {
    props: { data: res.data.data },
  };
}

const Post = ({ data }) => {
  const router = useRouter();
  const { contentId } = router.query;
  const { isSubscribed } = useUserAuth();
  const [persons, setPersons] = useState({
    seasons: [],
    actors: [],
    trailerFileUrl: [],
    genre: [],
  });
  const [genre, setGenre] = useState([]);
  const [options, setOptions] = useState([]);
  const [season, setSeason] = useState([]);
  const [child, setChild] = useState({ episodes: [] });
  const [flag, setFlag] = useState(false);
  const [date, setDate] = useState("");
  const [seas, setSeas] = useState(false);
  const [awsResourceId, setAwsResourceId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [flag1, setFlag1] = useState(false);
  const [index1, setIndex1] = useState(0);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [flagMovie, setFlagMovie] = useState(false);
  const [episode, setEpisode] = useState(null);
  const [msg, setMsg] = useState("No seasons & Episodes");
  const [similar, setSimilar] = useState([]);
  const [flagShowMore, setFlagShowMore] = useState(true);

  useEffect(() => {
    if (data.contents.length > 0) {
      validate(data.contents);
    }
    if (window.innerWidth < 600) {
      setFlag1(true);
    }
    setUserId(localStorage.getItem("id"));
  }, [data.contents]);

  const checkSimilarContents = useCallback((x) => {
    const arr = data.contents.filter(content =>
      content.subcategory[0] === x[0] && content.title !== contentId
    );
    setSimilar(arr);
  }, [data.contents, contentId]);

  const seasonCheck = useCallback((seasonId, seasons) => {
    const selectedSeason = seasons.find(season => season._id === seasonId);
    setChild(selectedSeason);
    setMsg(selectedSeason.episodes.length === 0 ? "" : "");
  }, []);

  const handleSelectOption = useCallback((e) => {
    setSelectedOption(e);
    seasonCheck(e.value, season);
  }, [season, seasonCheck]);

  const validate = useCallback((res) => {
    const selectedContent = res.find(content =>
      content.title === contentId || content._id === contentId
    );

    if (selectedContent) {
      if (selectedContent.categoryName.toLowerCase() === "movies") {
        setFlagMovie(true);
      }

      checkSimilarContents(selectedContent.subcategory);
      setPersons(selectedContent);
      setGenre(selectedContent.genre);
      setAwsResourceId(selectedContent.awsStaticResourcePath);
      setSeason(selectedContent.seasons);
      setDate(new Date(selectedContent.releaseDate).toLocaleString());

      if (selectedContent.seasons.length > 0) {
        setSeas(true);
        setFlag(true);
        setOptions(selectedContent.seasons.map(season => ({
          value: season._id,
          label: season.seasonName
        })));
        setSelectedOption({
          value: selectedContent.seasons[0]._id,
          label: selectedContent.seasons[0].seasonName
        });
        seasonCheck(selectedContent.seasons[0]._id, selectedContent.seasons);
        setEpisode(selectedContent.seasons[0].episodes[0]);
      }
    }
  }, [checkSimilarContents, contentId, seasonCheck]);

  useEffect(() => {
    if (data.contents.length > 0) {
      validate(data.contents);
    }
  }, [data.contents, validate]);

  const handleTrailer = async (persons) => {
    setLoader(true);
    let subCheck = await isSubscribed();
    const trailerUrl = subCheck
      ? persons.paidTrailer?.[0] || persons.trailerFileUrl[0]
      : persons.freeTrailer?.[0] || persons.trailerFileUrl[0];

    router.push(
      `/player/data?title=${persons.title}&path=${trailerUrl}&type=trailer&contentId=${persons._id}`
    );
  };

  const handleEpisode = (episode) => {
    router.push(
      `/player/data?title=${episode.name}&contentId=${persons._id}&episodeId=${episode._id}&contentTitle=${contentId}&userId=${userId}&thumbnail=${episode.webPosterLandscapeNormal}&awsStaticResourcePath=${persons.awsStaticResourcePath}&type=episode`
    );
  };

  const toggleShowMore = () => setFlagShowMore(!flagShowMore);

  const seoMetaTags = useMemo(() => (
    <>
      <meta property="al:iphone:url" content="jalva://contents" />
      <meta property="al:iphone:app_store_id" content="6504566793" />
      <meta property="al:iphone:app_name" content="Jalva" />
      <meta property="al:ios:url" content="jalva://contents" />
      <meta property="al:ios:app_store_id" content="6504566793" />
      <meta property="al:ios:app_name" content="Jalva" />
      <meta property="al:android:url" content="jalva://contents" />
      <meta property="al:android:app_name" content="Jalva" />
      <meta property="al:android:package" content="com.jalva.android" />
      <meta property="al:web:url" content="https://www.jalva.app/contents/" />
    </>
  ), []);

  return (
    <>
      <Head>
        {seoMetaTags}
        <title>{persons.title || "Content Details"}</title>
        <meta name="description" content={persons.description || "Content details and episodes"} />
      </Head>
      {loader && <div className="loader"><div className="spin" /></div>}
      <section className="content-details">
        <div className="contentchild-2">
          <Image
            src={`${static_url}/${persons.awsStaticResourcePath}/${persons.portraitPosterIdNormal}`}
            alt="Poster"
            width="300"
            height="400"
            className="smallbackground"
          />
          <Image
            src={`${static_url}/${persons.awsStaticResourcePath}/${persons.landscapePosterIdNormal}`}
            alt="Poster"
            width="920"
            height="550"
            className="background"
          />
          <Image
            src={playbtn}
            alt="Play Button"
            width="120"
            height="120"
            className="bigplaybtn"
            onClick={() => handleTrailer(persons)}
          />
        </div>
      </section>
      <section className="contentsDetailTV">
        <div className="DetailTvImage">
          <Image src={logoBackground} alt="Logo Background" />
        </div>
        <div className="DetailTvImage4">
          <p className="tg">
            {persons.tags?.map((tag, index) => (
              <span className="tagchi" key={index}>{tag}</span>
            ))}
          </p>
          <br />
          <strong className="DetailTvTitle">{persons.title}</strong>
          <p>Seasons {persons.seasons.length}</p>
          <hr />
          <h4>Genres</h4>
          <p>
            {persons.genre.map((genre, index) => (
              <span key={index}>{genre}{index < persons.genre.length - 1 ? ", " : ""}</span>
            ))}
          </p>
          <h4>Description</h4>
          <p>{persons.description}</p>
          <h4>Director</h4>
          <p>{persons.director}</p>
          <h4>Production</h4>
          <p>{persons.production}</p>
          <h4>Actors</h4>
          <p>
            {persons.actors.map((actor, index) => (
              <span key={index}>{actor}{index < persons.actors.length - 1 ? ", " : ""}</span>
            ))}
          </p>
        </div>
        <div className="contentsDetailTVBackground">
          <Image
            src={`${static_url}/${persons.awsStaticResourcePath}/${persons.portraitPosterIdNormal}`}
            alt="Poster"
            width="220"
            height="320"
            className="directorBackround"
          />
        </div>
      </section>
      {flag && (
        <section className="SeasonsAndEpisodesInformation">
          <div className="SeasonsAndEpisodes1">
            <div className="SeasonsAndEpisodes2">
              <p className="seasonHeader">Seasons and Episodes</p>
              {persons.seasons.map((season, seasonIndex) => (
                <div className="episodeInformation" key={seasonIndex}>
                  <div className="episodeInformation1">
                    <span>
                      <span>&nbsp;{season.seasonName}</span>
                      <span className="episodeInformation02">
                        {season.episodes.length}&nbsp;Episodes
                      </span>
                    </span>
                    <span>
                      <button
                        className="episodeInformation03"
                        onClick={toggleShowMore}
                      >
                        <Image
                          src={flagShowMore ? upperArrow : bottomArrow}
                          width={30}
                          height={30}
                          alt="Arrow"
                        />
                      </button>
                    </span>
                  </div>
                  {flagShowMore && (
                    <div>
                      {season.episodes.map((episode, episodeIndex) => (
                        <React.Fragment key={episodeIndex}>
                          <hr className="hrClassColor" />
                          <div className="episodeDetail">
                            <span>{episodeIndex + 1}</span>
                            <div className="pkplayerSymboleMain">
                              <Image
                                src={playbtn}
                                alt="Play Button"
                                width="50"
                                height="50"
                                className="pkplayerSymbole1"
                                onClick={() => handleEpisode(episode)}
                              />
                              <Image
                                src={`${static_url}/${awsResourceId}/${episode.landscapePosterId}`}
                                width={250}
                                height={180}
                                alt="Episode Poster"
                                className="pkplayerSymbole"
                              />
                            </div>
                            <div className="episodeDetail2">
                              <div className="episodeDetail3">
                                <span>
                                  <p>{episode.name}</p>
                                </span>
                                <span className="episodeDetail4">
                                  <Image
                                    src={timer}
                                    width={15}
                                    alt="Timer"
                                  />
                                  &nbsp;{episode.duration / 60}&nbsp;min
                                </span>
                              </div>
                              <p className="episodeDetail5">{episode.description}</p>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="jalvaEpisode">
              <div className="jalvaEpisode1">
                <Image src={calendarImage} alt="Calendar" />
                <p>Released Year</p>
              </div>
              <p>{persons.releaseDate}</p>
              <div className="jalvaEpisode1">
                <Image src={generic} alt="Generic" />
                <p>Genres</p>
              </div>
              <div className="jalvaEpisode2">
                {persons.genre.map((genre, index) => (
                  <div className="jalvaEpisode3" key={index}>
                    <p>{genre}</p>
                  </div>
                ))}
              </div>
              <p className="jalvaEpisode4">Director</p>
              <p>{persons.director}</p>
              <p className="jalvaEpisode5">Music</p>
              <p>{persons.director}</p>
            </div>
          </div>
        </section>
      )}
      <section className="product">
        <div className="container">
          <div className="product_category">
            <div className="product_category_heading">
              <h4>What Genre do you want to watch?</h4>
            </div>
            <div className="product_item_list">
              {data.contents.map((content, index) => (
                content.published && (
                  <div key={index}>
                    <Link href={`/contents/${content.title}`} className="product_item">
                      <div className="product_item_image">
                        <Image
                          src={`${static_url}/${content.awsStaticResourcePath}/${content.portraitPosterIdNormal}`}
                          alt="Content Poster"
                          width="200"
                          height="300"
                        />
                        <div className="product_item_image_overlay">
                          <div className="play_icon"></div>
                        </div>
                      </div>
                      <p>{content.title}</p>
                    </Link>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default withState(Post);
