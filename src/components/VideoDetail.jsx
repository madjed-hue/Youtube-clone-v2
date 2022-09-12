import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { PreferedTheme } from "../App";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const { theme } = useContext(PreferedTheme);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data.items[0]);
      console.log(data.items[0]);
    });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle, description },
    statistics: { viewCount, likeCount, commentCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" className="video__details">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "0" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography
              color={theme === "light" ? "#000" : "#fff"}
              variant="h5"
              fontWeight="bold"
              p={2}
            >
              {title}
            </Typography>
            <Typography
              color={theme === "light" ? "#000" : "#fff"}
              variant="body1"
              fontWeight="bold"
              p={2}
            >
              {description.substring(0, 150) + "...read more"}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: theme === "light" ? "#000" : "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  // component={sm: "subtitle1", md: "h6" }
                  color={theme === "light" ? "#000" : "#fff"}
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{
                      fontSize: "12px",
                      color: theme === "light" ? "#000" : "gray",
                      ml: "5px",
                    }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, display: "flex", alignItems: "center" }}
                >
                  <RemoveRedEyeIcon sx={{ mr: "5px" }} />{" "}
                  {parseInt(viewCount).toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, display: "flex", alignItems: "center" }}
                >
                  <ThumbUpAltIcon sx={{ mr: "5px" }} />{" "}
                  {parseInt(likeCount).toLocaleString()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, display: "flex", alignItems: "center" }}
                >
                  <ChatIcon sx={{ mr: "5px" }} />{" "}
                  {parseInt(commentCount).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
