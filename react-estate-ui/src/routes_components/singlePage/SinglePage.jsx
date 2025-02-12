import Slider from "../../components/slider/slider";
import "./SinglePage.scss";
import { singlePostData } from "../../lib/dummydata";
import { userData } from "../../lib/dummydata";
import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import Map from "../../components/map/map";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { useContext } from "react";
import apiRequest from "../../lib/apiRequest";


const SinglePage = () => {
  const post = useLoaderData();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // const [saved,setSaved] = useState(post?.isSaved);
  console.log(post);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser || !post?._id) return;

    const checkIfSaved = async () => {
      try {
        const response = await apiRequest.get("/api/users/saved");
        const savedPosts = response.data;

        if (savedPosts.some((savedPost) => savedPost.post._id === post._id)) {
          setSaved(true);
        } 
      } catch (err) {
        console.error("Error checking saved posts:", err);
      }
    };

    // if (currentUser) {
    checkIfSaved();
    // }
  }, [currentUser, post._id]);

  const handleSave = async () => {
    setSaved((prev) => !prev);

    if (!currentUser) {
      navigate("/login");
      return;
    }
    

    if (post?.user === (currentUser?._id || currentUser?.userInfo._id)) {
      alert("You cannot save your own post!");
      return;
    }

    console.log("Saving Post ID:", post?._id);

    if (!post?._id) {
      console.error("Post ID is undefined!");
      return;
    }

    try {
      await apiRequest.post("/api/users/save", { postId: post._id });
      console.log("Post saved successfully");
    } catch (err) {
      console.error("Error saving post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income policy Fees</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
