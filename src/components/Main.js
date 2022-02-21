import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticleAPI } from "../actions";
import PostModal from "./PostModal";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    props.getArticles();
  }, []);

  const handleClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  const handleLike = () => {
    if(likes===0)
    setLikes(likes+1);
  }

  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button
            onClick={(e) => handleClick(e)}
            disabled={props.loading ? true : false}
          >
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
      {props.articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your feed is empty</p>
      ) : (
        <Content>
          {props.loading && <img src="/images/spin-loader.svg" alt="" />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />
                    <div>
                      <span className="title">{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <img src="/images/ellipsis.png" alt="" />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImage>
                  <a>
                    {!article.sharedImage && article.video ? (
                      <ReactPlayer width="100%" url={article.video} />
                    ) : (
                      article.sharedImage && (
                        <img src={article.sharedImage} alt="" />
                      )
                    )}
                  </a>
                </SharedImage>
                <SocialCounts>
                  <li>
                    <button>
                      <img
                        src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                        alt=""
                      />
                      <img
                        src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                        alt=""
                      />
                      <span>{likes}</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments} comments</a>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button onClick={handleLike}>
                    <img src="/images/like-icon.svg" alt="" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/images/comment-icon.svg" alt="" />
                    <span>Comment</span>
                  </button>
                  <button>
                    <img src="/images/share-icon.svg" alt="" />
                    <span>Share</span>
                  </button>
                  <button>
                    <img src="/images/send-icon.svg" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </Content>
      )}
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0/20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      font-size: 14px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.6);
      min-height: 50px;
      border: none;
      background: transparent;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: #f5f5f5;
        font-size: 15px;
        text-align: left;
        cursor: pointer;
        &:hover{
          background-color: lightgrey;
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          cursor: pointer;
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 8px 0;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      flex-basis: 0;
      margin-left: 8px;

      span {
        text-align: left;
        &:first-child {
          font-size: 16px;
          font-weight: 700;
          padding-bottom: 5px;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  overflow: auto;
  align-items: center;
  justify-content: flex-start;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 8px;

    img {
      width: 24px;
      height: 24px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
    likeCount: state.articleState.likeCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
